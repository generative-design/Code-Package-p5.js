// P_2_1_2_03.pde
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
var moduleColor;
var moduleAlpha = 180;
var actRandomSeed = 0;
var max_distance = 500;

function setup(){
  createCanvas(600, 600);
  noFill();
  strokeWeight(3);
  moduleColor = color(0, 0, 0, moduleAlpha);
}

function draw() {
  background(255);

  randomSeed(actRandomSeed);

  stroke(moduleColor);

  for (var gridY=0; gridY<width; gridY+=25) {
    for (var gridX=0; gridX<height; gridX+=25) {
      var diameter = dist(mouseX, mouseY, gridX, gridY);
      diameter = diameter/max_distance * 40;
      push();
      translate(gridX, gridY, diameter*5);
      rect(0, 0, diameter, diameter);    // also nice: ellipse(...)
      pop();
    }
  }
}

function mousePressed() {
  actRandomSeed = int(random(100000));
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
