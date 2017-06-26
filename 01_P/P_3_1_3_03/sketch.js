// P_3_1_3_03.pde
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
 * analysing and sorting the letters of a text
 * drawing the letters frequency with lines and ellipses
 *
 * MOUSE
 * position x          : random angle
 * position y          : line length, size of ellipses, tracking
 *
 * KEYS
 * 1                   : toggle alpha mode
 * 2                   : toggle drawing of lines
 * 3                   : toggle drawing of ellipses
 * 4                   : toggle drawing of text
 * s                   : save png
 */
'use strict';

var joinedText;
var charSet;
var counters = [];

var posX;
var posY;
var tracking = 29;

var actRandomSeed = 0;

var drawAlpha = true;
var drawLines = true;
var drawEllipses = true;
var drawText = false;

function preload() {
  joinedText = loadStrings("data/faust_short.txt");
}

function setup() {
  createCanvas(1400, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  textFont("monospace", 20);
  noStroke();

  joinedText = joinedText.join(joinedText, " ");
  charSet = getUniqCharacters();
  for (var i = 0; i < charSet.length; i++) {
    counters[i] = 0;
  }

  countCharacters();
}

function draw() {
  background(360);

  posX = 80;
  posY = 300;
  randomSeed(actRandomSeed);

  // go through all characters in the text to draw them
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = charSet.indexOf(upperCaseChar);
    if (index < 0) continue;

    // calculate parameters
    var charAlpha = 100;
    if (drawAlpha) charAlpha = counters[index];

    var my = map(mouseY, 50, height - 50, 0, 1);
    my = constrain(my, 0, 1);
    var charSize = counters[index] * my * 3;

    var mx = map(mouseX, 50, width - 50, 0, 1);
    mx = constrain(mx, 0, 1);
    var lineLength = charSize;
    var lineAngle = random(-PI,PI) * mx - HALF_PI;
    var newPosX = lineLength * cos(lineAngle);
    var newPosY = lineLength * sin(lineAngle);

    // draw elements
    push();
    translate(posX, posY);
    stroke(273, 73, 51, charAlpha);
    if (drawLines) line(0, 0, newPosX, newPosY);
    noStroke();
    fill(52, 100, 71, charAlpha);
    if (drawEllipses) ellipse(0, 0, charSize / 10, charSize / 10);
    if (drawText) {
      fill(0, charAlpha);
      text(joinedText.charAt(i), newPosX, newPosY);
    }
    pop();

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == ' ') {
      posY += int(tracking * my + 30);
      posX = 80;
    }
  }
}

function getUniqCharacters() {
  var charsArray = joinedText.toUpperCase().split('');
  var uniqCharsArray = charsArray.filter(function(char, index) {
    return charsArray.indexOf(char) === index;
  }).sort();
  return uniqCharsArray.join('');
}

function countCharacters() {
  for (var i = 0; i < joinedText.length; i++) {
    // get one character from the text and turn it to uppercase
    var index = charSet.indexOf(joinedText.charAt(i).toUpperCase());
    // increacre the respective counter
    if (index >= 0) counters[index]++;
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawAlpha = !drawAlpha;
  if (key == '2') drawLines = !drawLines;
  if (key == '3') drawEllipses = !drawEllipses;
  if (key == '4') drawText = !drawText;
}
