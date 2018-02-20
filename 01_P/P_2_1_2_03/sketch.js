// P_2_1_2_03
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
 * changing size of circles in a rad grid depending the mouseposition
 *
 * MOUSE
 * position x/y        : module size and offset z
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var tileCount = 20;
var actRandomSeed = 0;

var moduleColor;
var moduleAlpha = 180;
var maxDistance = 500;

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(3);
  moduleColor = color(0, 0, 0, moduleAlpha);
}

function draw() {
  clear();

  randomSeed(actRandomSeed);

  stroke(moduleColor);

  for (var gridY = 0; gridY < width; gridY += 25) {
    for (var gridX = 0; gridX < height; gridX += 25) {
      var diameter = dist(mouseX, mouseY, gridX, gridY);
      diameter = diameter / maxDistance * 40;
      push();
      translate(gridX, gridY, diameter * 5);
      rect(0, 0, diameter, diameter);    // also nice: ellipse(...)
      pop();
    }
  }
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
