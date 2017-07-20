// P_3_1_3_02.pde
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
 * connecting subsequent letters with lines
 *
 * MOUSE
 * position x          : interpolate between normal text and sorted position
 *
 * KEYS
 * 1                   : toggle lines on/off
 * 2                   : toggle text on/off
 * 3                   : switch all letters off
 * 4                   : switch all letters on
 * a-z                 : switch letter on/off
 * CONTROL             : save png
 */
'use strict';

var joinedText;
var alphabet;
var drawLetters = [];

var posX;
var posY;

var drawLines = false;
var drawText = true;

function preload() {
  joinedText = loadStrings("data/faust_kurz.txt");
}

function setup() {
  createCanvas(620, windowHeight);

  textFont("monospace", 18);
  fill(87, 35, 129);

  joinedText = joinedText.join(" ");
  alphabet = getUniqCharacters();
  for (var i = 0; i < alphabet.length; i++) {
    drawLetters[i] = true;
  }
}

function draw() {
  background(255);

  posX = 20;
  posY = 40;
  var oldX = 0;
  var oldY = 0;

  // go through all characters in the text to draw them
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = alphabet.indexOf(upperCaseChar);
    if (index < 0) continue;

    var sortY = index * 20 + 40;
    var m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);
    var interY = lerp(posY, sortY, m);

    if (drawLetters[index]) {
      if (drawLines) {
        if (oldX != 0 && oldY != 0) {
          stroke(181, 157, 0, 100);
          line(oldX, oldY, posX, interY);
        }
        oldX = posX;
        oldY = interY;
      }

      if (drawText) {
        noStroke();
        text(joinedText.charAt(i), posX, interY);
      }
    } else {
      oldX = 0;
      oldY = 0;
    }

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == " ") {
      posY += 30;
      posX = 20;
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

function keyReleased() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawLines = !drawLines;
  if (key == '2') drawText = !drawText;
  if (key == '3') {
    for (var i = 0; i < alphabet.length; i++) {
      drawLetters[i] = false;
    }
  }
  if (key == '4') {
    drawText = true;
    for (var i = 0; i < alphabet.length; i++) {
      drawLetters[i] = true;
    }
  }

  var index = alphabet.indexOf(key.toUpperCase());
  if (index >= 0) {
    drawLetters[index] = !drawLetters[index];
  }
}
