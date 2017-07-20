// P_3_1_1_01.pde
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
 * typewriter. time reactive.
 *
 * MOUSE
 * position y           : adjust spacing (line height)
 *
 * KEYS
 * a-z                  : text input (keyboard)
 * backspace/delete     : delete last typed letter
 * ctrl                 : save png
 */
'use strict';

var textTyped = "Type slow and fast!";
var fontSizes = [textTyped.length];
var minFontSize = 15;
var maxFontSize = 800;
var newFontSize = 0;

var pMillis;
var maxTimeDelta = 5000.0;

var spacing = 2; // line height
var tracking = 0; // between letters
var font;


function setup() {
  createCanvas(800, 600);

  font = "Arial";

  noCursor();
  noStroke();

  // init fontSizes
  for (var i = 0; i < textTyped.length; i++) fontSizes[i] = minFontSize;

  pMillis = millis();
}


function draw() {
  background(255);
  textAlign(LEFT);
  fill(0);

  spacing = map(mouseY, 0, height, 0, 120);
  translate(0, 200 + spacing);

  var x = 0;
  var y = 0;
  var fontSize = 20;

  for (var i = 0; i < textTyped.length; i++) {
    // get fontsize for the actual letter from the array
    fontSize = fontSizes[i];
    textFont(font, fontSize);
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter) + tracking;

    if (x + letterWidth > width) {
      // start new line and add line height
      x = 0;
      y += spacing;
    }

    // draw letter
    text(letter, x, y);
    // update x-coordinate for next letter
    x += letterWidth;
  }

  // blinking cursor after text
  var timeDelta = millis() - pMillis;
  newFontSize = map(timeDelta, 0, maxTimeDelta, minFontSize, maxFontSize);
  newFontSize = min(newFontSize, maxFontSize);

  fill(200, 30, 40);
  if (int(frameCount / 10) % 2 === 0) fill(255);
  rect(x, y, newFontSize / 2, newFontSize / 20);
}


function keyReleased() {
  // export png
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
}


function keyPressed() {
  switch(keyCode) {
    case DELETE:
    case BACKSPACE:
      if (textTyped.length > 0) {
        textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
        fontSizes.pop();
      }
      break;
  }

  // reset timer
  pMillis = millis();
}

function keyTyped(){
  if(keyCode >= 32){
    textTyped += key;
    fontSizes.push(newFontSize);
  }
}
