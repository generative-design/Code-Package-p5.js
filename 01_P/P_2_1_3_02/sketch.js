// P_2_1_3_02.pde
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
 * draw a module made of lines in a grid
 *
 * MOUSE
 * position x          : number of tiles horizontally
 * position y          : number of tiles vertically
 *
 * KEYS
 * 1-3                 : draw mode
 * s                   : save png
 */
'use strict';

var count = 10;
var colorStep = 20;

var lineWeight = 0;
var strokeColor = 0;

var backgroundColor = 0;

var drawMode = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(backgroundColor);

  var tileCountX = mouseX / 30 + 1;
  var tileCountY = mouseY / 30 + 1;
  var tileWidth  = width / tileCountX;
  var tileHeight = height / tileCountY;

  for (var gridY = 0; gridY <= tileCountY; gridY++) {
    for (var gridX = 0; gridX <= tileCountX; gridX++) {
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;

      var x1 = tileWidth / 2;
      var y1 = tileHeight / 2;
      var x2 = 0;
      var y2 = 0;

      push();
      translate(posX, posY);

      for (var side = 0; side < 4; side++) {
        for (var i = 0; i < count; i++) {
          // move end point around the four sides of the tile
          switch (side) {
            case 0:
              x2 += tileWidth / count;
              y2 = 0;
              break;
            case 1:
              x2 = tileWidth;
              y2 += tileHeight / count;
              break;
            case 2:
              x2 -= tileWidth / count;
              y2 = tileHeight;
              break;
            case 3:
              x2 = 0;
              y2 -= tileHeight / count;
              break;
          }

          // adjust weight and color of the line
          if (i < count / 2) {
            lineWeight += 1;
            strokeColor += 60;
          } else {
            lineWeight -= 1;
            strokeColor -= 60;
          }

          // set colors depending on draw mode
          switch (drawMode) {
            case 1:
              backgroundColor = 360;
              stroke(0);
              break;
            case 2:
              backgroundColor = 360;
              stroke(0);
              strokeWeight(lineWeight);
              break;
            case 3:
              backgroundColor = 0;
              stroke(strokeColor);
              strokeWeight(mouseX / 100);
              break;
          }

          // draw the line
          line(x1, y1, x2, y2);
        }
      }
      pop();
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
  if (key == '3') drawMode = 3;
}
