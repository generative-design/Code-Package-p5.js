// P_3_1_2_02
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
* typewriter. uses input (text) as blueprint for a visual composition.
*
* MOUSE
* click + drag        : move canvas
*
* KEYS
* a-z                 : text input (keyboard)
* ,.!?                : curves
* space               : random straight / small curve
* :+-xz               : icons
* o                   : station with the last 7 typed letters as name
* a u                 : stop
* del, backspace      : remove last letter
* arrow up            : zoom canvas +
* arrow down          : zoom canvas -
* alt                 : new random layout
* ctrl                : save png
*/
'use strict';

var textTyped = 'Was hier folgt ist Tet! So asnt, und mag. Ich mag Tet sehr.';
var font;

var shapeSpace;
var shapeSpace2;
var shapePeriod;
var shapeComma;
var shapeQuestionmark;
var shapeExclamationmark;
var shapeReturn;
var icon1;
var icon2;
var icon3;
var icon4;
var icon5;

var centerX;
var centerY;
var offsetX;
var offsetY;
var zoom;

var actRandomSeed;

var palette = [
  [253, 195, 0],
  [0, 0, 0],
  [0, 158, 224],
  [99, 33, 129],
  [121, 156, 19],
  [226, 0, 26],
  [224, 134, 178]
];

var actColorIndex = 0;

function preload() {
  font = loadFont('data/miso-bold.ttf');
  shapeSpace = loadImage('data/space.svg');
  shapeSpace2 = loadImage('data/space2.svg');
  shapePeriod = loadImage('data/period.svg');
  shapeComma = loadImage('data/comma.svg');
  shapeExclamationmark = loadImage('data/exclamationmark.svg');
  shapeQuestionmark = loadImage('data/questionmark.svg');
  shapeReturn = loadImage('data/return.svg');

  icon1 = loadImage('data/icon1.svg');
  icon2 = loadImage('data/icon2.svg');
  icon3 = loadImage('data/icon3.svg');
  icon4 = loadImage('data/icon4.svg');
  icon5 = loadImage('data/icon5.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  centerX = width / 2;
  centerY = height / 2;
  offsetX = 0;
  offsetY = 0;
  zoom = 0.75;

  actRandomSeed = 6;

  cursor(HAND);
  textFont(font, 25);
  textAlign(LEFT, BASELINE);
  noStroke();
  fill(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  if (mouseIsPressed && mouseButton == LEFT) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  // allways produce the same sequence of random numbers
  randomSeed(actRandomSeed);

  translate(centerX, centerY);
  scale(zoom);

  push();

  actColorIndex = 0;
  fill(palette[actColorIndex][0], palette[actColorIndex][1], palette[actColorIndex][2]);
  rect(0, -25, 10, 35);

  for (var i = 0; i < textTyped.length; i++) {
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter);

    // ------ letter rule table ------
    switch (letter) {
    case ' ': // space
      var dir = floor(random(5));
      if (dir == 0) {
        image(shapeSpace, 0, -15);
        translate(2, 0);
        rotate(QUARTER_PI);
      }
      if (dir == 1) {
        image(shapeSpace2, 0, -15);
        translate(13, -5);
        rotate(-QUARTER_PI);
      }
      break;

    case ',':
      image(shapeComma, 0, -15);
      translate(33, 15);
      rotate(QUARTER_PI);
      break;

    case '.':
      image(shapePeriod, 0, -56);
      translate(56, -56);
      rotate(-HALF_PI);
      break;

    case '!':
      image(shapeExclamationmark, 0, -30);
      translate(43, -18);
      rotate(-QUARTER_PI);
      break;

    case '?':
      image(shapeQuestionmark, 0, -30);
      translate(43, -18);
      rotate(-QUARTER_PI);
      break;

    case '\n':
      // start a new line at a random position near the center
      rect(0, -25, 10, 35);
      pop();
      push();
      translate(random(-300, 300), random(-300, 300));
      rotate(floor(random(8)) * QUARTER_PI);
      actColorIndex = (actColorIndex + 1) % palette.length;
      fill(palette[actColorIndex][0], palette[actColorIndex][1], palette[actColorIndex][2]);
      rect(0, -25, 10, 35);
      break;

    case 'o': // Station big
      rect(0, -15, letterWidth + 1, 15);
      push();
      fill(0);
      var station = textTyped.substring(i - 10, i - 1);
      station = station.toLowerCase();
      station = station.replace(/\s+/g, '');
      station = station.substring(0, 1).toUpperCase() + station.substring(1, station.length - 1);
      text(station, -10, 40);
      ellipse(-5, -7, 33, 33);
      fill(255);
      ellipse(-5, -7, 25, 25);
      pop();
      translate(letterWidth, 0);
      break;

    case 'a': // Station small left
      rect(0, 0 - 15, letterWidth + 1, 25);
      rect(0, 0 - 15, letterWidth + 1, 15);
      translate(letterWidth, 0);
      break;

    case 'u': // Station small right
      rect(0, 0 - 25, letterWidth + 1, 25);
      rect(0, 0 - 15, letterWidth + 1, 15);
      translate(letterWidth, 0);
      break;

    case ':': // icon
      image(icon1, 0, -60, 30, 30);
      break;

    case '+': // icon
      image(icon2, 0, -60, 35, 30);
      break;

    case '-': // icon
      image(icon3, 0, -60, 30, 30);
      break;

    case 'x': // icon
      image(icon4, 0, -60, 30, 30);
      break;

    case 'z': // icon
      image(icon5, 0, -60, 30, 30);
      break;

    default: // all others
      rect(0, -15, letterWidth + 1, 15);
      translate(letterWidth, 0);
    }
  }

  // blink cursor after text
  fill(200, 30, 40);
  if (frameCount / 6 % 2 == 0) rect(0, 0, 15, 2);

  pop();
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == ALT) actRandomSeed++;
}

function keyPressed() {
  switch (keyCode) {
  case DELETE:
  case BACKSPACE:
    textTyped = textTyped.substring(0, textTyped.length - 1);
    print(textTyped);
    break;
  case ENTER:
  case RETURN:
    textTyped += '\n';
    break;
  case UP_ARROW:
    zoom += 0.05;
    break;
  case DOWN_ARROW:
    zoom -= 0.05;
    break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    print(textTyped);
  }
}
