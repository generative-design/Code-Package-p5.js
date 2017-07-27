// P_3_1_4_01
/**
 * treemap test
 *
 */
'use strict';


var counters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var treemap;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(255);

  treemap = new Treemap(counters, 0, 0, 800, 600);
}


function draw() {
  background(255);

  for (var i = 0; i < treemap.rects.length; i++) {
    var r = treemap.rects[i];
    rect(r.x, r.y, r.w, r.h);
  }
}


function Treemap(counters, x, y, w, h) {
  this.counters = counters;
  this.sum = 0;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.rects = [];

  Treemap.prototype.init = function(){
    // sort counters
    this.counters.sort(function(a, b) {
      if (a < b) return 1;
      if (a > b) return -1;
      else return 0;
    });

    // calculate sum of all counters
    this.sum = 0;
    for (var i = 0; i < this.counters.length; i++) {
        this.sum += this.counters[i];
    }

    // Starting point is a rectangle and a number of counters to fit in.
    // So, as nothing has fit in the rect, restSum, restW, ... are the starting rect and the sum of all counters
    var restSum = this.sum;
    var restW = this.w;
    var restH = this.h;
    var restX = this.x;
    var restY = this.y;

    // Fit in rows. One row consits of one or more rects that should be as square as possible in average.
    // actIndex always points on the first counter, that has not fitted in.
    var actIndex = 0;
    while (actIndex < this.counters.length) {
      // A row is always along the shorter edge (a).
      var hor = true; // horizontal row
      var a = restW;
      var b = restH;
      if (restW > restH) {
        hor = false; // vertical row
        a = restH;
        b = restW;
      }

      // How many items to fit into the row? 
      var rowSum = 0;
      var rowCount = 0;
      for (var i = actIndex; i < this.counters.length; i++) {
        rowSum += this.counters[i];
        rowCount++;

        // a*bLen is the rect of the row 
        var percentage = rowSum / restSum;
        var bLen = b * percentage;

        // Let's assume it's a horizontal row. The rects are as square as possible, 
        // as soon as the average width (a / rowCount) gets smaller than the row height (bLen).
        // For a vertical row it work just like that.
        if (a / rowCount < bLen || i == this.counters.length-1) {

          // get the position and length of the row according to hor (horizontal or not).
          var aPos = restX;
          var bPos = restY;
          var aLen = restW;
          if (!hor) {
            aPos = restY;
            bPos = restX;
            aLen = restH;
          }

          // now we can transform the counters between actIndex and i to rects
          for (var j = actIndex; j <= i; j++) {
            // map aLen according to the value of the counter
            var aPart = aLen * this.counters[j] / rowSum;
            if (hor) {
              this.rects.push({x:aPos, y:bPos, w:aPart, h:bLen});
            } else {
              this.rects.push({x:bPos, y:aPos, w:bLen, h:aPart});
            }
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
  // init automatically
  this.init();


}

function mousePressed() {
  counters = [];
  for (var i = 0; i < random(20, 5000); i++) {
    counters.push(random(1, 20));
  }
  treemap = new Treemap(counters, 0, 0, 800, 600);
}

