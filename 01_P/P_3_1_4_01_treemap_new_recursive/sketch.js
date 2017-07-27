// P_3_1_4_01
/**
 * treemap recursive
 *
 */
'use strict';


var counters = [1, 2, 3, 4, [2,3,4,1,1], 6, [4,1,1], [2,3,4,1,1,2,2], 9, 10, 11, 12];
var treemap;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255);
  colorMode(HSB);

  treemap = new Treemap(counters, 0, 0, 800, 600);
  //treemap.init();
}


function draw() {
  background(255);

  treemap.draw();
}



function Treemap(counters, x, y, w, h, parent) {
  this.counters = counters;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.maps = [];
  this.sum = 0;
  
  this.parent = parent;
  if (this.parent) {
    this.level = parent.level + 1;
  } else {
    this.level = 0;
  }
  this.index = 0;

  // calculate sum of all counters recursively and produce all treemaps
  if (counters instanceof Array) {
    for (var i = 0; i < this.counters.length; i++) {
      // a treemap for every counter
      var m = new Treemap(counters[i], 0, 0, 0, 0, this);
      m.parent = this;
      m.level = this.level + 1;
      this.maps.push(m);
      this.sum += m.sum;
    }
  } else {
    this.sum += this.counters;
  }

  Treemap.prototype.init = function(){
    // Stop immediately, if it's not an array
    if (this.maps.length == 0) return;

    // sort counters
    this.maps.sort(function(a, b) {
      if (a.sum < b.sum) return 1;
      if (a.sum > b.sum) return -1;
      else return 0;
    });
    //console.log("after sort: ", this.maps);

    // give every child an index. could be handy for drawing
    for (var i = 0; i < this.maps.length; i++) {
      this.maps[i].index = i;
    }

    // Starting point is a rectangle and a number of counters to fit in.
    // So, as nothing has fit in the rect, restSum, restW, ... are the starting rect and the sum of all counters
    var restSum = this.sum;
    var restX = this.x+2;
    var restY = this.y+2;
    var restW = this.w-4;
    var restH = this.h-4;

    // Fit in rows. One row consits of one or more rects that should be as square as possible in average.
    // actIndex always points on the first counter, that has not fitted in.
    var actIndex = 0;
    while (actIndex < this.maps.length) {
      // A row is always along the shorter edge (a).
      var hor = true; // horizontal row
      var a = restW;
      var b = restH;
      if (restW > restH) {
        hor = false; // horizontal row
        a = restH;
        b = restW;
      }

      // How many items to fit into the row? 
      var rowSum = 0;
      var rowCount = 0;
      for (var i = actIndex; i < this.maps.length; i++) {
        rowSum += this.maps[i].sum;
        rowCount++;

        // a * bLen is the rect of the row 
        var percentage = rowSum / restSum;
        var bLen = b * percentage;

        // Let's assume it's a horizontal row. The rects are as square as possible, 
        // as soon as the average width (a / rowCount) gets smaller than the row height (bLen).
        if (a / rowCount < bLen || i == this.maps.length-1) {

          // get the position and length of the row according to hor (horizontal or not).
          var aPos = restX;
          var bPos = restY;
          var aLen = restW;
          if (!hor) {
            aPos = restY;
            bPos = restX;
            aLen = restH;
          }

          // now we can transform the counters between index actIndex and i to rects (in fact to treemaps)
          for (var j = actIndex; j <= i; j++) {
            // map aLen according to the value of the counter
            var aPart = aLen * this.maps[j].sum / rowSum;
            if (hor) {
              this.maps[j].x = aPos;
              this.maps[j].y = bPos;
              this.maps[j].w = aPart;
              this.maps[j].h = bLen;
            } else {
              this.maps[j].x = bPos;
              this.maps[j].y = aPos;
              this.maps[j].w = bLen;
              this.maps[j].h = aPart;
            }
            //console.log(this.maps[j]);
            
            // now that the position, width and height is set, it's possible to calculate the nested treemap.
            this.maps[j].init();
            aPos += aPart;
          }

          // adjust dimensions for the next row
          if (hor) {
            restY += bLen;
            restH -= bLen;
          } else {
            restX += bLen;
            restW -= bLen;
          }
          restSum -= rowSum;

          break;
        }

      }

      actIndex = i + 1;
    }
  };
  // if it's the root treemap, init automatically
  if (this.level == 0) this.init();

  Treemap.prototype.draw = function() {
    fill(0, 0, 100);
    /*if (this.level > 0) {
      var h = map(this.parent.index, 0, 20, 0, 360) % 360;
      var s = map(this.level, 0, 3, 100, 50);
      fill(h, 80, s);
    }*/

    rect(this.x, this.y, this.w, this.h);
    for (var i = 0; i < this.maps.length; i++) {
      this.maps[i].draw();
    }
  };
}

function mousePressed() {
  counters = createRandomCounters(0);
  treemap = new Treemap(counters, 0, 0, 800, 600);
}

function createRandomCounters(level) {
  var a = [];
  for (var i = 0; i < random(3, 50); i++) {
    if (random() < 0.2 && level < 4) {
      a.push(createRandomCounters(level+1));
    } else {
      a.push(random(1, 20));
    }
  }
  return a;
}

