// P_3_1_4_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
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
 * KEYS
 * r                   : toggle random mode
 * h                   : only horizontal rows
 * v                   : only vertical rows
 * b                   : both kind of rows
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

  treemap = new gd.Treemap(1, 1, width - 3, height - 3, {sort:doSort, direction:rowDirection});

  // count words
  for (var i = 0; i < words.length; i++) {
    var w = words[i].toLowerCase();
    treemap.addData(w);
  }

  treemap.calculate();
}

function draw() {
  background(255);
  textAlign(CENTER, BASELINE);

  for (var i = 0; i < treemap.items.length; i++) {
    var item = treemap.items[i];

    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(item.x, item.y, item.w, item.h);

    var word = item.data;
    textFont(font, 100);
    var textW = textWidth(word);
    var fontSize = 100 * (item.w * 0.9) / textW;
    fontSize = min(fontSize, (item.h * 0.9));
    textFont(font, fontSize);

    fill(0);
    noStroke();
    text(word, item.x + item.w / 2, item.y + item.h * 0.8);
  }

  noLoop();
}

function keyTyped() {
  // export png
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == 'r' || key == 'R') {
    doSort = !doSort;
    treemap.options.sort = doSort;
    treemap.calculate();
    loop();
  }
  if (key == 'h' || key == 'H') {
    rowDirection = 'horizontal';
    treemap.options.direction = rowDirection;
    treemap.calculate();
    loop();
  }
  if (key == 'v' || key == 'V') {
    rowDirection = 'vertical';
    treemap.options.direction = rowDirection;
    treemap.calculate();
    loop();
  }
  if (key == 'b' || key == 'B') {
    rowDirection = 'both';
    treemap.options.direction = rowDirection;
    treemap.calculate();
    loop();
  }
}


