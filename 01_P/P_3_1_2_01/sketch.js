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
"use strict";

var textTyped = "";
var font;

var shapeSpace, shapeSpace2, shapePeriod, shapeComma;
var shapeQuestionmark, shapeExclamationmark, shapeReturn;

var centerX, centerY, offsetX, offsetY;
var zoom;

var actRandomSeed;


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

  textTyped += "Ich bin der Musikant mit Taschenrechner in der Hand!\n\n";
  textTyped += "Ich addiere\n";
  textTyped += "Und subtrahiere, \n\n";
  textTyped += "Kontrolliere\nUnd komponiere\nUnd wenn ich diese Taste drück,\nSpielt er ein kleines Musikstück?\n\n";

  textTyped += "Ich bin der Musikant mit Taschenrechner in der Hand!\n\n";
  textTyped += "Ich addiere\n";
  textTyped += "Und subtrahiere, \n\n";
  textTyped += "Kontrolliere\nUnd komponiere\nUnd wenn ich diese Taste drück,\nSpielt er ein kleines Musikstück?\n\n";

  centerX = width/2;
  centerY = height/2;
  offsetX = 0;
  offsetY = 0;
  zoom = 0.75;
  actRandomSeed = 6;

  cursor(HAND);
  textFont(font, 25);
  textAlign(LEFT, BASELINE);
  imageMode(CORNER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  noStroke();

  if (mouseIsPressed == true) {
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
    switch(letter) {
      case ' ': // space
        // 50% left, 50% right
        var dir = floor(random(0, 2));
        if(dir == 0){
          image(shapeSpace, 1, -15);
          translate(4, 1);
          rotate(PI/4);
        }
        if(dir == 1){
          image(shapeSpace2, 1, -15);
          translate(14, -5);
          rotate(-PI/4);
        }
        break;

      case ',':
        image(shapeComma, 1, -15);
        translate(35, 15);
        rotate(PI/4);
        break;

      case '.':
        image(shapePeriod, 1, -55);
        translate(56, -56);
        rotate(-PI/2);
        break;

      case '!':
        image(shapeExclamationmark, 1, -27);
        translate(42.5, -17.5);
        rotate(-PI/4);
        break;

      case '?':
        image(shapeQuestionmark, 1, -27);
        translate(42.5, -17.5);
        rotate(-PI/4);
        break;

      case '\n': // return
        image(shapeReturn, 1, -15);
        translate(1, 10);
        rotate(PI);
        break;

      default: // all others
        fill(0);
        text(letter, 0, 0);
        translate(letterWidth, 0);
    }
  }

  // blink cursor after text
  fill(0);
  if (frameCount/6 % 2 == 0) rect(0, 0, 15, 2);
}


function mousePressed(){
  offsetX = mouseX-centerX;
  offsetY = mouseY-centerY;
}


function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == ALT) actRandomSeed++;
  print(actRandomSeed);
}

function keyPressed() {
  switch(keyCode) {
    case DELETE:
    case BACKSPACE:
      if (textTyped.length > 0) {
        println(textTyped);
        textTyped = textTyped.substring(0,max(0,textTyped.length-1));
        fontSizes = shorten(fontSizes);
        return false; // prevent any default behavior
      }
      break;
    case TAB:
    case ESCAPE:
      break;
    case ENTER:
    case RETURN:
      // enable linebreaks
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

function keyTyped(){
  if(keyCode >= 32){
    textTyped += key;
  }
}
