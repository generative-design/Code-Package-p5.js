// P_2_2_1_02.pde
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
 * draw the path of a stupid agent
 *
 * MOUSE
 * position x          : drawing speed
 *
 * KEYS
 * 1-3                 : draw mode of the agent
 * BACKSPACE           : clear display
 * s                   : save png
 */
'use strict';

var NORTH = 0;
var NORTHEAST = 1;
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST = 7;

var direction;

var stepSize = 1;
var diameter = 1;

var posX;
var posY;

var drawMode = 1;
var counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  clear();
  noStroke();
  posX = width / 2;
  posY = height / 2;
}

function draw() {
  for (var i = 0; i <= mouseX; i++) {
    counter++;

    // random number for the direction of the next step
    if (drawMode === 2) {
      direction = int(random(3));
    } else {
      direction = int(random(7));
    }

    if (direction === NORTH) {
      posY -= stepSize;
    } else if (direction === NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
    } else if (direction === EAST) {
      posX += stepSize;
    } else if (direction === SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    } else if (direction === SOUTH) {
      posY += stepSize;
    } else if (direction === SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    } else if (direction === WEST) {
      posX -= stepSize;
    } else if (direction === NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if (posX > width) posX = 0;
    if (posX < 0) posX = width;
    if (posY < 0) posY = height;
    if (posY > height) posY = 0;

    if (drawMode === 3) {
      if (counter >= 100) {
        counter = 0;
        fill(192, 100, 64, 80);
        ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter + 7, diameter + 7);
      }
    }

    fill(0, 40);
    ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter, diameter);
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode === DELETE || keyCode === BACKSPACE) clear();

  if (key == '1') {
    drawMode = 1;
    stepSize = 1;
    diameter = 1;
  }
  if (key == '2') {
    drawMode = 2;
    stepSize = 1;
    diameter = 1;
  }
  if (key == '3') {
    drawMode = 3;
    stepSize = 10;
    diameter = 5;
  }
}
