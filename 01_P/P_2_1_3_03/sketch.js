// P_2_1_3_03
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
 * changing positions of stapled circles in a grid
 *
 * MOUSE
 * position x          : module detail
 * position y          : module parameter
 *
 * KEYS
 * 1-3                 : draw mode
 * arrow left/right    : number of tiles horizontally
 * arrow up/down       : number of tiles vertically
 * s                   : save png
 */
'use strict';

var count = 0;
var tileCountX = 6;
var tileCountY = 6;

var drawMode = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noFill();
}

function draw() {
  background(255);

  count = mouseX / 20 + 5;
  var para = min(height, mouseY) / height - 0.5;

  var tileWidth = width / tileCountX;
  var tileHeight = height / tileCountY;

  for (var gridY = 0; gridY <= tileCountY; gridY++) {
    for (var gridX = 0; gridX <= tileCountX; gridX++) {

      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileHeight / 2;

      push();
      translate(posX, posY);

      // switch between modules
      switch (drawMode) {
        case 1:
          translate(-tileWidth / 2, -tileHeight / 2);
          for (var i = 0; i < count; i++) {
            line(0, (para + 0.5) * tileHeight, tileWidth, i * tileHeight / count);
            line(0, i * tileHeight / count, tileWidth, tileHeight - (para + 0.5) * tileHeight);
          }
          break;
        case 2:
          for (var i = 0; i <= count; i++) {
            line(para * tileWidth, para * tileHeight, tileWidth / 2, (i / count - 0.5) * tileHeight);
            line(para * tileWidth, para * tileHeight, -tileWidth / 2, (i / count - 0.5) * tileHeight);
            line(para * tileWidth, para * tileHeight, (i / count - 0.5) * tileWidth, tileHeight / 2);
            line(para * tileWidth, para * tileHeight, (i / count - 0.5) * tileWidth, -tileHeight / 2);
          }
          break;
        case 3:
          for (var i = 0; i <= count; i++) {
            line(0, para * tileHeight, tileWidth / 2, (i / count - 0.5) * tileHeight);
            line(0, para * tileHeight, -tileWidth / 2, (i / count - 0.5) * tileHeight);
            line(0, para * tileHeight, (i / count - 0.5) * tileWidth, tileHeight / 2);
            line(0, para * tileHeight, (i / count - 0.5) * tileWidth, -tileHeight / 2);
          }
          break;
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
  if (keyCode == DOWN_ARROW) tileCountY = max(tileCountY - 1, 1);
  if (keyCode == UP_ARROW) tileCountY += 1;
  if (keyCode == LEFT_ARROW) tileCountX = max(tileCountX - 1, 1);
  if (keyCode == RIGHT_ARROW) tileCountX += 1;
}
