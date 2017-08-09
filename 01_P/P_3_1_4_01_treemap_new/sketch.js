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

  // sort counters
  Treemap.prototype.init = function() {
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

    var restSum = this.sum;
    var restW = this.w;
    var restH = this.h;
    var restX = this.x;
    var restY = this.y;

    // fit in rows
    var actIndex = 0;
    while (actIndex < this.counters.length) {
      var isHorizontal = true; // horizontal row
      var a = restW;
      var b = restH;
      if (restW > restH) {
        isHorizontal = false; // horizontal row
        a = restH;
        b = restW;
      }

      var rowSum = 0;
      var rowCount = 0;
      var avRelPrev = Number.MAX_VALUE;
      for (var i = actIndex; i < this.counters.length; i++) {
        rowSum += this.counters[i];
        rowCount++;

        // a*bLen is the rect of the row 
        var percentage = rowSum / restSum;
        var bLen = b * percentage;
        var avRel = (a / rowCount) / bLen;

        //console.log(rowSum, rowCount, bLen);
        if (avRel < 1 || i == this.counters.length-1) {
          // Which is better, the actual or the previous fitting?
          if (avRelPrev < 1/avRel) {
            // previous fitting is better, so revert to that
            rowSum -= this.counters[i];
            rowCount--;
            bLen = b * rowSum / restSum;
            i--;
          }

          // store rects
          var aPos = restX;
          var bPos = restY;
          var aLen = restW;
          if (!isHorizontal) {
            aPos = restY;
            bPos = restX;
            aLen = restH;
          }

          for (var j = actIndex; j <= i; j++) {
            var aPart = aLen * this.counters[j] / rowSum;
            if (isHorizontal) {
              this.rects.push({x:aPos, y:bPos, w:aPart, h:bLen});
            } else {
              this.rects.push({x:bPos, y:aPos, w:bLen, h:aPart});
            }
            aPos += aPart;
          }

          // adjust new dimensions
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
      //console.log(actIndex);
    }
  };
  this.init();


}

function mousePressed() {
  counters = [];
  for (var i = 0; i < random(20, 5000); i++) {
    counters.push(random(1, 20));
  }
  treemap = new Treemap(counters, 0, 0, 800, 600);
}

