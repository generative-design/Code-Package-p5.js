// P_3_1_4_02
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
 * Counting the words of a text and display them in a treemap diagram.
 * All words with the same number of letters are stored in a nested treemap.
 *
 * KEYS
 * r                   : toggle random mode
 * h                   : only horizontal rows
 * v                   : only vertical rows
 * b                   : both kind of rows
 * 1-9                 : switch on and off words with this number of letters
 * 0                   : show all words
 * s                   : save png
 */
'use strict';

var joinedText;

var treemap;

var font;

var doSort = true;
var rowDirection = 'both';

function preload() {
  font = loadFont('data/miso-bold.ttf');
  joinedText = loadStrings('data/pride_and_prejudice.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(windowWidth, round(windowWidth*1.343));
  //createCanvas(windowWidth*2, round(windowWidth*1.343)*2);

  joinedText = joinedText.join(' ');
  // If you want to get rid of all number chars too, just uncomment the following line
  // joinedText = joinedText.replace(/\d+/g, '');
  var words = joinedText.match(/\w+/g);

  // create the main treemap
  treemap = new Treemap(1, 1, width - 3, height - 3, {
    sort: doSort,
    direction: rowDirection,
    padding: 2,
    ignore: []
  });

  var subTreemaps = [];

  // count words
  for (var i = 0; i < words.length; i++) {
    var w = words[i].toLowerCase();
    var index = w.length;
    // Add only words with less than 10 letters
    if (index < 10) {
      var t = subTreemaps[index];
      if (t == undefined) {
        t = treemap.addTreemap(index);
        subTreemaps[index] = t;
      }
      t.addData(w);
    }
  }

  treemap.init();
}

function draw() {
  background(255);

  textAlign(CENTER, BASELINE);

  // colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(1);

  for (var i = 0; i < treemap.items.length; i++) {
    var subTreemap = treemap.items[i];
    if (!subTreemap.ignored) {
      // var h = map(i, 0, treemap.items.length, 50, 150);

      for (var j = 0; j < subTreemap.items.length; j++) {
        var item = subTreemap.items[j];
        // var s = map(subTreemap.items[j].count, 0, subTreemap.maxCount, 10, 30);

        // fill(h, s, 100);
        // stroke(h, s + 20, 90);
        noFill();
        stroke(0);
        rect(item.x, item.y, item.w, item.h);

        var word = subTreemap.items[j].data;
        textFont(font, 100);
        var textW = textWidth(word);
        var fontSize = 100 * (item.w * 0.9) / textW;
        fontSize = min(fontSize, (item.h * 0.9));
        textFont(font, fontSize);

        fill(0);
        noStroke();
        text(word, item.x + item.w / 2, item.y + item.h * 0.8);
      }
    }
  }

  noLoop();
}



function keyTyped() {
  // export png
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == 'r' || key == 'R') {
    doSort = !doSort;
    treemap.options.sort = doSort;
    treemap.init();
    loop();
  }
  if (key == 'h' || key == 'H') {
    rowDirection = 'horizontal';
    treemap.options.direction = rowDirection;
    treemap.init();
    loop();
  }
  if (key == 'v' || key == 'V') {
    rowDirection = 'vertical';
    treemap.options.direction = rowDirection;
    treemap.init();
    loop();
  }
  if (key == 'b' || key == 'B') {
    rowDirection = 'both';
    treemap.options.direction = rowDirection;
    treemap.init();
    loop();
  }

  // number key 1 - 9
  if (keyCode >= 49 && keyCode <= 57) {
    var num = keyCode - 48
      // search for the pressed number in the ignore array
    var i = treemap.options.ignore.indexOf(num);
    if (i >= 0) {
      // found value, so remove it
      treemap.options.ignore.splice(i, 1);
    } else {
      // not found, so add to array
      treemap.options.ignore.push(num);
    }
    treemap.init();
    loop();
  }
  if (key == '0') {
    treemap.options.ignore = [];
    treemap.init();
    loop();
  }


}

function keyPressed() {
  //if (keyCode == RIGHT_ARROW);
}