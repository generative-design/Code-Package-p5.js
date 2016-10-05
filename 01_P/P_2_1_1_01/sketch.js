// P_2_1_1_01.pde
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
 * changing strokeweight and strokecaps on diagonals in a grid
 *
 * MOUSE
 * position x          : left diagonal strokeweight
 * position y          : right diagonal strokeweight
 * left click          : new random layout
 *
 * KEYS
 * 1                   : round strokecap
 * 2                   : square strokecap
 * 3                   : project strokecap
 * s                   : save png
 */
'use strict';

var tileCount = 20;
var actRandomSeed = 0;

var actStrokeCap;

function setup() {
  createCanvas(600, 600);
  noFill();
  actStrokeCap = ROUND;
}

function draw() {
  background(255);
  strokeCap(actStrokeCap);

  randomSeed(actRandomSeed);

  for (var gridY=0; gridY<tileCount; gridY++) {
    for (var gridX=0; gridX<tileCount; gridX++) {

      var posX = width/tileCount*gridX;
      var posY = height/tileCount*gridY;

      var toggle = int(random(0,2));

      if (toggle == 0) {
        strokeWeight(mouseX/20);
        line(posX, posY, posX+width/tileCount, posY+height/tileCount);
      }
      if (toggle == 1) {
        strokeWeight(mouseY/20);
        line(posX, posY+width/tileCount, posX+height/tileCount, posY);
      }
    }
  }
}


function mousePressed() {
  actRandomSeed = int(random(100000));
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') actStrokeCap = ROUND;
  if (key == '2') actStrokeCap = SQUARE;
  if (key == '3') actStrokeCap = PROJECT;
}
