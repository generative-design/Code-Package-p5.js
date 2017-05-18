// P_3_1_2_02.pde
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
* typewriter. uses input (text) as blueprint for a visual composition.
*
* MOUSE
* click + drag        : move canvas
*
* KEYS
* a-z                 : text input (keyboard)
* space               : random straight / small curve
* ,.!?                : curves
* :+-xz               : icons
* o                   : station with the last 7 typed letters as name
* a u                 : stop
* del, backspace      : remove last letter
* arrow up            : zoom canvas +
* arrow down          : zoom canvas -
* ctrl                : save png
*/
'use strict';

var font;
var textTyped =  "Was hier folgt ist Tet! So asnt, und mag. Ich mag Tet sehr.";

var shapeSpace;
var shapeSpace2;
var shapePeriod;
var shapeComma;
var shapeExclamationmark;

var shapeQuestionmark;
var shapeReturn;
var icon1;
var icon2;
var icon3;
var icon4;
var icon5;

var centerX = 0;
var centerY = 0;
var offsetX = 0;
var offsetY = 0;
var zoom = 0.75;

//new RGBColour(0, 130, 164);
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
  font = loadFont("data/miso-bold.ttf");
  shapeSpace = loadImage("data/space.svg");
  shapeSpace2 = loadImage("data/space2.svg");
  shapePeriod = loadImage("data/period.svg");
  shapeComma = loadImage("data/comma.svg");
  shapeExclamationmark = loadImage("data/exclamationmark.svg");
  shapeQuestionmark = loadImage("data/questionmark.svg");
  shapeReturn = loadImage("data/return.svg");

  icon1 = loadImage("data/icon1.svg");
  icon2 = loadImage("data/icon2.svg");
  icon3 = loadImage("data/icon3.svg");
  icon4 = loadImage("data/icon4.svg");
  icon5 = loadImage("data/icon5.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont(font, 25);
  cursor(HAND);
  noStroke();
  fill(0);

  centerX = width / 2;
  centerY = height / 2;
}

function windowResized() {
  // resize canvas when window is resized
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  translate(centerX, centerY);
  scale(zoom);

  push();

  randomSeed(0);

  actColorIndex = 0;
  fill(palette[actColorIndex][0], palette[actColorIndex][1], palette[actColorIndex][2]);
  rect(0, -25, 10, 35);

  for (var i = 0; i < textTyped.length; i++) {
    var fontSize = 25;
    textFont(font, fontSize);
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter);

    // ------ letter rule table ------
    switch (letter) {
      case " ": //space
        //60% notrun, 20% left, 20% right
        var dir = floor(random(5));
        if (dir === 0) {
          image(shapeSpace, 0, -15);
          translate(1.9, 0);
          rotate(QUARTER_PI);
        }
        if (dir === 1) {
          image(shapeSpace2, 0, -17);
          translate(13, -5);
          rotate(-QUARTER_PI);
        }
        break;
      case ",":
        image(shapeComma, 0, 0);
        translate(34, 15);
        rotate(QUARTER_PI);
        break;
      case ".":
        image(shapePeriod, 0, -58);
        translate(56, -54);
        rotate(-HALF_PI);
        break;
      case "!":
        image(shapeExclamationmark, 0, 0);
        translate(42, -18);
        rotate(-QUARTER_PI);
        break;
      case "?":
        image(shapeQuestionmark, 0, 0);
        translate(42, -18);
        rotate(-QUARTER_PI);
        break;
      case "\n":
        // start a new line at a random position near the center
        rect(0, -25, 10, 35);
        pop();
        push();
        translate(random(-300, 300), random(-300, 300));
        rotate(floor(random(8))*QUARTER_PI);
        actColorIndex = actColorIndex + 1;
        fill(palette[actColorIndex][0], palette[actColorIndex][1], palette[actColorIndex][2]);
        rect(0, -25, 10, 35);
        break;
      case "o": // Station big
        rect(0, -15, letterWidth+1, 15);
        push();
        fill(0);
        var station = textTyped.substring(i - 10, i - 1);
        station = station.toLowerCase();
        station = station.replace(/\s+/, '');
        station = station.substring(0, 1).toUpperCase() + station.substring(1, station.length - 1);
        text(station, -10, 40);
        ellipse(-5, -7, 33, 33);
        fill(255);
        ellipse(-5, -7, 25, 25);
        pop();
        translate(letterWidth, 0);
        break;
      case "a": // Station small left
        rect(0, 0 - 15, letterWidth + 1, 25);
        rect(0, 0 - 15, letterWidth + 1, 15);
        translate(letterWidth, 0);
        break;
      case "u":  // Station small right
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
        image(icon4 ,0 ,-60, 30, 30);
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
  if (frameCount / 6 % 2 === 0) rect(0, 0, 15, 2);

  pop();
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed() {
  switch (keyCode) {
    case DELETE:
    case BACKSPACE:
      textTyped = textTyped.substring(0,max(0,textTyped.length-1));
      print(textTyped);
      break;
    case TAB:
    case ESCAPE:
      break;
    case ENTER:
    case RETURN:
      textTyped += "\n";
      break;
    case UP_ARROW:
      zoom += 0.05;
      break;
    case DOWN_ARROW:
      zoom -= 0.05;
      break;
    default:
    textTyped = textTyped+ keyCode;
  }
}

function keyTyped(){
  if (keyCode >= 32) {
    textTyped += key;
  }
}
