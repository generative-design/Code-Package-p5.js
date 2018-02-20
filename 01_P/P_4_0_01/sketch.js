// P_4_0_01
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
 * draw a grid of streched copies of an image
 *
 * MOUSE
 * position x           : tile count horizontally
 * position y           : tile count vertically
 *
 * KEYS
 * s                    : save png
 */
'use strict';

var img;

function preload() {
  img = loadImage('data/image.jpg');
}

function setup() {
  createCanvas(650, 450);
}

function draw() {
  var tileCountX = mouseX / 3 + 1;
  var tileCountY = mouseY / 3 + 1;
  var stepX = width / tileCountX;
  var stepY = height / tileCountY;
  for (var gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      image(img, gridX, gridY, stepX, stepY);
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
