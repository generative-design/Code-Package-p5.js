/**
 * Creates a new Treemap.
 *
 * @param  {Number} x         x position
 * @param  {Number} y         y position
 * @param  {Number} w         width
 * @param  {Number} h         height
 * @param  {Object} [option]  drawing and sorting options {sort:true or false, direction:"horizontal", "vertical" or "both"}
 * @return {Treemap}          the created Treemap 
 */

/**
 * Would be nice to have...
 * TODO: Alternative constructor
 * @param  {Array} data       data to store. A plain or nested array of numbers or objects. 
                              If the elements are numbers they are the counters. If objects, countkey names the key to use as a counter
 * @param  {String} countkey  Which key should be used as the count
 * @return {Treemap}          the created Treemap 
 */

/**
 * Alternative constructor (mainly for internal use)
 * @param  {Treemap} parent   the parent Treemap
 * @param  {Any} data         one data element to store. could be anything. 
 * @param  {Number} count     initial count
 * @return {Treemap}          the created Treemap that represents one item
 */

/**
 * Alternative constructor (mainly for internal use)
 * @param  {Treemap} parent   the parent Treemap
 * @return {Treemap}          the created Treemap 
 */

function Treemap() {
  var parent;
  var data;
  var count = 0;

  var x;
  var y;
  var w;
  var h;
  var options;


  if (arguments.length >= 4) {
    x = arguments[0];
    y = arguments[1];
    w = arguments[2];
    h = arguments[3];
    options = arguments[4];
  } else {
    parent = arguments[0];
    data = arguments[1];
    count = arguments[2] || 0;
  }

  this.items = [];
  this.data = data;
  this.count = count;
  this.minCount = 0;  // not used internally, but could be nice for drawing
  this.maxCount = 0;  // not used internally, but could be nice for drawing

  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 0;
  this.h = h || 0;
  this.padding = 0;

  this.parent = parent;
  if (this.parent) {
    this.level = parent.level + 1;
  } else {
    this.level = 0;
  }
  this.index = 0;

  this.root = this;
  if (this.parent) this.root = parent.root;

  this.options = options || this.root.options;
  this.ignored = false;

  // Adds one data element to the items array. 
  // If there is already an item which has this as data, just increase the counter of that item.
  // If not, create a new Treemap with that data and init the counter with 1
  Treemap.prototype.addData = function(data) {
    var i = this.items.findIndex(function(el) {
      return el.data == data
    });
    if (i >= 0) {
      this.items[i].count++;
    } else {
      this.items.push(new Treemap(this, data, 1));
    }
  }

  // Adds an empty treemap to this treemap. If data is given, this could be used 
  // to show and hide a complete sub-treemap from the diagram. There is no check,
  // if there is already another treemap with that data.
  Treemap.prototype.addTreemap = function(data, count) {
    var t = new Treemap(this, data, count);
    this.items.push(t);
    return t;
  }

  // The size of the rectangle depends on the counter. So it's important to sum
  // up all the counters recursively
  Treemap.prototype.sumUpCounters = function() {
    // Adjust parameter this.ignore: if ignore option is defined and this.data is listed in that ignored=true
    if (this.options.ignore instanceof Array) {
      if (this.options.ignore.indexOf(this.data) >= 0) {
        this.ignored = true;
      } else {
        this.ignored = false;
      }
    }

    // return count or 0 depending on this.ignored
    if (this.items.length == 0) {
      if (this.ignored) return 0;

    } else {
      this.minCount = Number.MAX_VALUE;
      this.maxCount = 0;
      this.count = 0;

      if (this.ignored) return 0;

      for (var i = 0; i < this.items.length; i++) {
        var sum = this.items[i].sumUpCounters();
        this.count += sum;
        this.minCount = min(this.minCount, sum);
        this.maxCount = max(this.maxCount, sum);
      }
    }
    return this.count;
  }

  // 
  Treemap.prototype.init = function() {
    // if it's the root node, sum up all counters recursively
    if (this == this.root) this.sumUpCounters();
    
    // Stop immediately, if it's an empty array
    if (this.items.length == 0) return;

    // If to ignore this element, adjust parameters and stop
    if (this.ignored) {
      this.x = -100000; // just a value far outside the screen, so it won't show up if it's drawn accidentally
      this.y = 0;
      this.w = 0;
      this.h = 0;
      return;
    }

    // sort or shuffle according to the given option
    if (this.options.sort == true || this.options.sort == undefined) {
      // sort items
      this.items.sort(function(a, b) {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        else return 0;
      });
    } else {
      // shuffle explicitly
      shuffleArray(this.items);
    }

    // give every child an index. could be handy for drawing
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].index = i;
    }

    // Starting point is a rectangle and a number of counters to fit in.
    // So, as nothing has fit in the rect, restSum, restW, ... are the starting rect and the sum of all counters
    var restSum = this.count;
    var restX = this.x + this.padding;
    var restY = this.y + this.padding;
    var restW = this.w - this.padding * 2;
    var restH = this.h - this.padding * 2;

    // Fit in rows. One row consits of one or more rects that should be as square as possible in average.
    // actIndex always points on the first counter, that has not fitted in.
    var actIndex = 0;
    while (actIndex < this.items.length) {
      // A row is always along the shorter edge (a).
      var isHorizontal = true; // horizontal row
      var a = restW;
      var b = restH;
      if (this.options.direction != 'horizontal') {
        if (restW > restH || this.options.direction == 'vertical') {
          isHorizontal = false; // vertical row
          a = restH;
          b = restW;
        }
      }

      // How many items to fit into the row?
      var rowSum = 0;
      var rowCount = 0;
      var avRelPrev = Number.MAX_VALUE;
      for (var i = actIndex; i < this.items.length; i++) {
        rowSum += this.items[i].count;
        rowCount++;

        // a * bLen is the rect of the row
        var percentage = rowSum / restSum;
        var bLen = b * percentage;
        var avRel = (a / rowCount) / bLen;

        // Let's assume it's a horizontal row. The rects are as square as possible,
        // as soon as the average width (a / rowCount) gets smaller than the row height (bLen).
        if (avRel < 1 || i == this.items.length - 1) {
          // Which is better, the actual or the previous fitting?
          if (avRelPrev < 1 / avRel) {
            // previous fitting is better, so revert to that
            rowSum -= this.items[i].count;
            rowCount--;
            bLen = b * rowSum / restSum;
            i--;
          }

          // get the position and length of the row according to isHorizontal (horizontal or not).
          var aPos = restX;
          var bPos = restY;
          var aLen = restW;
          if (!isHorizontal) {
            aPos = restY;
            bPos = restX;
            aLen = restH;
          }

          // now we can transform the counters between index actIndex and i to rects (in fact to treemaps)
          for (var j = actIndex; j <= i; j++) {
            // map aLen according to the value of the counter
            var aPart = aLen * this.items[j].count / rowSum;
            if (isHorizontal) {
              this.items[j].x = aPos;
              this.items[j].y = bPos;
              this.items[j].w = aPart;
              this.items[j].h = bLen;
            } else {
              this.items[j].x = bPos;
              this.items[j].y = aPos;
              this.items[j].w = bLen;
              this.items[j].h = aPart;
            }

            // now that the position, width and height is set, it's possible to calculate the nested treemap.
            this.items[j].init();
            aPos += aPart;
          }

          // adjust dimensions for the next row
          if (isHorizontal) {
            restY += bLen;
            restH -= bLen;
          } else {
            restX += bLen;
            restW -= bLen;
          }
          restSum -= rowSum;

          break;
        }

        avRelPrev = avRel;
      }

      actIndex = i + 1;
    }
  };

  // A simple recursive drawing routine
  Treemap.prototype.draw = function() {
    if (!this.ignored) {
      rect(this.x, this.y, this.w, this.h);
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].draw();
      }
    }
  };

}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = floor(random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}