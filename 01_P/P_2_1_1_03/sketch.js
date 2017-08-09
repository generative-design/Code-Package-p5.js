// P_2_1_1_03.pde
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
 * changing number, color and strokeweight on diagonals in a grid
 *
 * MOUSE
 * position x          : diagonal strokeweight
 * position y          : number diagonals
 * left click          : new random layout
 *
 * KEYS
 * s                   : save png
 * 1                   : color left diagonal
 * 2                   : color right diagonal
 * 3                   : switch transparency left diagonal on/off
 * 4                   : switch transparency right diagonal on/off
 * 0                   : default
 */
'use strict';

var colorLeft;
var colorRight;

var tileCount = 1;
var transparentLeft = false;
var transparentRight = false;
var alphaLeft = 0;
var alphaRight = 100;

var actRandomSeed = 0;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);

  colorRight = color(0, 0, 0, alphaRight);
  colorLeft = color(323, 100, 77, alphaLeft);
}

function draw() {
  clear();
  strokeWeight(mouseX / 15);

  randomSeed(actRandomSeed);

  tileCount = mouseY / 15;

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;

      alphaLeft = transparentLeft ? gridY * 10 : 100;

      colorLeft = color(hue(colorLeft), saturation(colorLeft), brightness(colorLeft), alphaLeft);

      alphaRight = transparentRight ? 100 - gridY * 10 : 100;

      colorRight = color(hue(colorRight), saturation(colorRight), brightness(colorRight), alphaRight);

      var toggle = int(random(0, 2));

      if (toggle === 0) {
        stroke(colorLeft);
        line(posX, posY, posX + (width / tileCount) / 2, posY + height / tileCount);
        line(posX + (width / tileCount) / 2, posY, posX + (width / tileCount), posY + height / tileCount);
      }
      if (toggle == 1) {
        stroke(colorRight);
        line(posX, posY + width / tileCount, posX + (height / tileCount) / 2, posY);
        line(posX + (height / tileCount) / 2, posY + width / tileCount, posX + (height / tileCount), posY);
      }
    }
  }

}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') {
    if (colorsEqual(colorLeft, color(273, 73, 51, alphaLeft))) {
      colorLeft = color(323, 100, 77, alphaLeft);
    } else {
      colorLeft = color(273, 73, 51, alphaLeft);
    }
  }
  if (key == '2') {
    if (colorsEqual(colorRight, color(0, 0, 0, alphaRight))) {
      colorRight = color(192, 100, 64, alphaRight);
    } else {
      colorRight = color(0, 0, 0, alphaRight);
    }
  }
  if (key == '3') {
    transparentLeft = !transparentLeft;
  }
  if (key == '4') {
    transparentRight = !transparentRight;
  }

  if (key == '0') {
    transparentLeft = false;
    transparentRight = false;
    colorLeft = color(323, 100, 77, alphaLeft);
    colorRight = color(0, 0, 0, alphaRight);
  }
}

function colorsEqual(col1, col2) {
  return col1.toString() === col2.toString();
}
