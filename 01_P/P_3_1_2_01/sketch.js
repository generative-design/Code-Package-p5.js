// P_3_1_2_01.pde
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
 * drag                : move canvas
 *
 * KEYS
 * a-z                 : text input (keyboard)
 * ,.!? and return     : curves
 * space               : small curve with random direction
 * del, backspace      : remove last letter
 * arrow up            : zoom canvas +
 * arrow down          : zoom canvas -
 * alt                 : new random layout
 * ctrl                : save png
 */
'use strict';

var font;
var textTyped = (
  "Ich bin der Musikant mit Taschenrechner in der Hand!\n\n" +
  "Ich addiere\n" +
  "Und subtrahiere, \n\n" +
  "Kontrolliere\nUnd komponiere\nUnd wenn ich diese Taste drück,\nSpielt er ein kleines Musikstück?\n\n" +
  "Ich bin der Musikant mit Taschenrechner in der Hand!\n\n" +
  "Ich addiere\n" +
  "Und subtrahiere, \n\n" +
  "Kontrolliere\nUnd komponiere\nUnd wenn ich diese Taste drück,\nSpielt er ein kleines Musikstück?\n\n"
);

var shapeSpace;
var shapeSpace2;
var shapePeriod;
var shapeComma;
var shapeQuestionmark;
var shapeExclamationmark;
var shapeReturn;

var centerX = 0;
var centerY = 0;
var offsetX = 0;
var offsetY = 0;
var zoom = 0.75;

var actRandomSeed = 6;

function preload() {
  font = loadFont("data/miso-bold.ttf");
  shapeSpace = loadImage("data/space.svg");
  shapeSpace2 = loadImage("data/space2.svg");
  shapePeriod = loadImage("data/period.svg");
  shapeComma = loadImage("data/comma.svg");
  shapeExclamationmark = loadImage("data/exclamationmark.svg");
  shapeQuestionmark = loadImage("data/questionmark.svg");
  shapeReturn = loadImage("data/return.svg");
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

  // allways produce the same sequence of random numbers
  randomSeed(actRandomSeed);

  translate(centerX, centerY);
  scale(zoom);

  for (var i = 0; i < textTyped.length; i++) {
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter);

    // ------ letter rule table ------
    switch (letter) {
      case " ": // space
        // 50% left, 50% right
        if (floor(random(2)) == 0) {
          image(shapeSpace, 0, -16);
          translate(1.9, 0);
          rotate(QUARTER_PI);
        } else {
          image(shapeSpace2, 0, -17);
          translate(13, -5);
          rotate(-QUARTER_PI);
        }
      break;
      case ",": // comma
        image(shapeComma, 0, -16);
        translate(34, 15);
        rotate(QUARTER_PI);
      break;
      case ".": // period
        image(shapePeriod, 0, -58);
        translate(56, -54);
        rotate(-HALF_PI);
      break;
      case "!": // !
        image(shapeExclamationmark, 0, -29);
        translate(42, -17.4);
        rotate(-QUARTER_PI);
      break;
      case "?": // ?
        image(shapeQuestionmark, 0, -29);
        translate(42, -18);
        rotate(-QUARTER_PI);
      break;
      case "\n": // return
        image(shapeReturn, 0, -16);
        translate(0, 10);
        rotate(PI);
      break;
      default: // all others
        text(letter, 0, 0);
        translate(letterWidth, 0);
      break;
    }
  }

  // blink cursor after text
  if (frameCount / 6 % 2 == 0) rect(0, 0, 15, 2);
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode === ALT) {
    actRandomSeed++;
    console.log(actRandomSeed);
  }
}

function keyPressed() {
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    if (textTyped.length > 0) {
      println(textTyped);
      textTyped = textTyped.substring(0,max(0,textTyped.length-1));
      fontSizes = shorten(fontSizes);
      return false; // prevent any default behavior
    }
  }
  // insert linebreak
  if (keyCode === ENTER || keyCode === RETURN) textTyped += "\n";

  if (keyCode === UP_ARROW) zoom += 0.05;
  if (keyCode === DOWN_ARROW) zoom -= 0.05;
}

function keyTyped(){
  if(keyCode >= 32){
    textTyped += key;
    fontSizes = append(fontSizes, newFontSize);
  }
}
