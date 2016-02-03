// P_2_2_1_01.pde
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
 * BACKSPACE           : delete display
 * s                   : save png
 */
'use strict';

var directions = [
  "NORTH",
  "NORTHEAST",
  "EAST",
  "SOUTHEAST",
  "SOUTH",
  "SOUTHWEST",
  "WEST",
  "NORTHWEST"
];
var direction;

var stepSize = 1;
var diameter = 1;

var posX;
var posY;

function setup(){
  createCanvas(800,800);
  background(255);
  noStroke();
  fill(0,40);
  posX = width / 2;
  posY = height / 2;
}

function draw() {
  for (var i = 0; i <= mouseX; i++) {
    direction = int(random(directions.length));

    if (directions[direction] === "NORTH") {
      posY -= stepSize;
    } else if (directions[direction] === "NORTHEAST") {
      posX += stepSize;
      posY -= stepSize;
    } else if (directions[direction] === "EAST") {
      posX += stepSize;
    } else if (directions[direction] === "SOUTHEAST") {
      posX += stepSize;
      posY += stepSize;
    } else if (directions[direction] === "SOUTH") {
      posY += stepSize;
    } else if (directions[direction] === "SOUTHWEST") {
      posX -= stepSize;
      posY += stepSize;
    } else if (directions[direction] === "WEST") {
      posX -= stepSize;
    } else if (directions[direction] === "NORTHWEST") {
      posX -= stepSize;
      posY -= stepSize;
    }

    if (posX > width) posX = 0;
    if (posX < 0) posX = width;
    if (posY < 0) posY = height;
    if (posY > height) posY = 0;

    ellipse(posX + stepSize / 2,posY + stepSize / 2,diameter,diameter);
  }
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode === DELETE || keyCode === BACKSPACE) background(255);
}