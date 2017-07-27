// P_3_1_4_01.pde
//
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * counting the words of a text and display them in a treemap diagram.
 *
 *
 * KEYS
 * 1                   : toggle sort mode
 * 2                   : only horizontal rows
 * 3                   : only vertical rows
 * 4                   : both kind of rows rows
 * s                   : save png
 */
'use strict';

var font;
var joinedText;
var words;
var wordCounters = {};

var counters = [];
var treemap;

var maxFontSize = 1000;
var minFontSize = 1;

var doSort = true;
var rowDirection = "both";

function preload() {
  font = loadFont("data/miso-bold.ttf");
  joinedText = loadStrings("data/pride_and_prejudice.txt");
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(windowWidth, round(windowWidth*1.343));
  strokeWeight(1);
  fill(255);
  textAlign(CENTER, BASELINE);

  joinedText = joinedText.join(" ");
  // Is there a better way to get rid of all that's not [a-z A-z äöü ÄÖÜßéñ ...and so on] ?
  words = joinedText.split(/[.,;:?'!–()"\-\s]+/);

  // count words
  for (var i = 0; i < words.length; i++) {
    var w = words[i].toLowerCase();
    if (wordCounters[w] == undefined) {
      wordCounters[w] = 1;
    } else {
      wordCounters[w]++;
    }
  }
  
  treemap = new Treemap(wordCounters, 1, 1, width-3, height-3, {sort:doSort, direction:rowDirection});
}

function draw() {
  background(255);

  for (var i = 0; i < treemap.rects.length; i++) {
    var r = treemap.rects[i];
    
    fill(255);
    stroke(0);
    rect(r.x, r.y, r.w, r.h);

    var word = treemap.mapData[i].word;
    textFont(font, 100);
    var textW = textWidth(word);
    var fontSize = 100 * (r.w * 0.9) / textW;
    fontSize = min(fontSize, (r.h * 0.9));
    textFont(font, fontSize);

    fill(0);
    noStroke();
    text(word, r.x + r.w / 2, r.y + r.h * 0.8);
  }

  noLoop();
}


function Treemap(mapData, x, y, w, h, options) {
  // convert each key-value-pair to an array with [key, value]
  this.mapData = Object.keys(mapData).map(function (key) { return {word:key, count:mapData[key]}; });

  this.sum = 0;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.rects = [];
  this.options = options || {};

  Treemap.prototype.init = function(){
    if (this.options.sort == true || this.options.sort == undefined) {
      // sort mapData
      this.mapData.sort(function(a, b) {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        else return 0;
      });
    } else {
      // shuffle explicitly
      shuffleArray(this.mapData);
    }

    // calculate sum of all mapData
    this.sum = 0;
    for (var i = 0; i < this.mapData.length; i++) {
        this.sum += this.mapData[i].count;
    }

    // Starting point is a rectangle and an array of mapData to fit in.
    // So, as nothing has fit in the rect, restSum, restW, ... are the starting rect and the sum of all counters in mapData
    var restSum = this.sum;
    var restW = this.w;
    var restH = this.h;
    var restX = this.x;
    var restY = this.y;

    // Fit in rows. One row consits of one or more rects that should be as square as possible in average.
    // actIndex always points on the first counter, that has not fitted in.
    var actIndex = 0;
    while (actIndex < this.mapData.length) {
      // A row is always along the shorter edge (a).
      var hor = true; // horizontal row
      var a = restW;
      var b = restH;
      if (this.options.direction != "horizontal") {
        if (restW > restH || this.options.direction == "vertical") {
          hor = false; // vertical row
          a = restH;
          b = restW;
        }
      }

      // How many items to fit into the row? 
      var rowSum = 0;
      var rowCount = 0;
      for (var i = actIndex; i < this.mapData.length; i++) {
        rowSum += this.mapData[i].count;
        rowCount++;

        // a*bLen is the rect of the row 
        var percentage = rowSum / restSum;
        var bLen = b * percentage;

        // Let's assume it's a horizontal row. The rects are as square as possible, 
        // as soon as the average width (a / rowCount) gets smaller than the row height (bLen).
        // For a vertical row it work just like that.
        if (a / rowCount < bLen || i == this.mapData.length-1) {

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
            var aPart = aLen * this.mapData[j].count / rowSum;
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

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function keyReleased() {
}

function keyTyped() {
  // export png
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') {
    doSort = !doSort;
  }  
  if (key == '2') {
    rowDirection = "horizontal";
  }  
  if (key == '3') {
    rowDirection = "vertical";
  }  
  if (key == '4') {
    rowDirection = "both";
  }  

  // number key
  if (keyCode >= 48 && keyCode <= 57) {
    treemap = new Treemap(wordCounters, 1, 1, width-3, height-3, {sort:doSort, direction:rowDirection});
    loop();
  }

}

