// P_2_1_3_05.pde
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
 * changing positions of stapled circles in a grid
 *
 * MOUSE
 * position x          : horizontal position shift
 * position y          : vertical position shift
 * left click          : random position shift
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var tileCountX = 10;
var tileCountY = 10;
var tileWidth;
var tileHeight;
var colorStep = 6;
var endSize = 0;
var stepSize = 30;
var actRandomSeed = 0;

function setup(){
  createCanvas(600,600);
  noStroke();
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
}

function draw() {
  background(255);

  randomSeed(actRandomSeed);

  stepSize = mouseX / 10;
  endSize  = mouseY / 10;

  for (var gridY = 0; gridY <= tileCountY; gridY++) {
    for (var gridX = 0; gridX <= tileCountX; gridX++) {

      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      // modules
      var heading = int(random(4));
      for (var i = 0; i < stepSize; i++) {
        var diameter = map(i,0,stepSize,tileWidth,endSize);
        fill(255 - i * colorStep);
        switch (heading) {
          case 0: ellipse(posX + i,posY,diameter,diameter); break;
          case 1: ellipse(posX,posY + i,diameter,diameter); break;
          case 2: ellipse(posX - i,posY,diameter,diameter); break;
          case 3: ellipse(posX,posY - i,diameter,diameter); break;
        }
      }

    }
  }
}

function mousePressed() {
  actRandomSeed = int(random(100000));
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}