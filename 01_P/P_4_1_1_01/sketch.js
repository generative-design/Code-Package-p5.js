// P_4_1_1_01
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
 * cutting and multiplying an area of the image
 *
 * MOUSE
 * position x/y         : area position
 * left click           : multiply the area
 *
 * KEYS
 * 1-3                  : area size
 * r                    : toggle random area
 * s                    : save png
 */
'use strict';

var img;

var tileCountX = 4;
var tileCountY = 4;
var tileCount = tileCountX * tileCountY;
var imgTiles = [];
var tileWidth;
var tileHeight;
var cropX;
var cropY;

var selectMode = true;
var randomMode = false;

function preload() {
  img = loadImage('data/image.jpg');
}

function setup() {
  createCanvas(800, 600);

  image(img);
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;

  noCursor();
  noFill();
  stroke(255);
}

function draw() {
  if (selectMode) {
    // in selection mode, a white selection rectangle is drawn over the image
    cropX = constrain(mouseX, 0, width - tileWidth);
    cropY = constrain(mouseY, 0, height - tileHeight);
    image(img, 0, 0);
    rect(cropX, cropY, tileWidth, tileHeight);
  } else {
    // reassemble image
    var imgIndex = 0;
    for (var gridY = 0; gridY < tileCountY; gridY++) {
      for (var gridX = 0; gridX < tileCountX; gridX++) {
        image(imgTiles[imgIndex], gridX * tileWidth, gridY * tileHeight);
        imgIndex++;
      }
    }
  }
}

function cropTiles() {
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;
  imgTiles = [];

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      if (randomMode) {
        cropX = int(random(mouseX - tileWidth / 2, mouseX + tileWidth / 2));
        cropY = int(random(mouseY - tileHeight / 2, mouseY + tileHeight / 2));
      }
      cropX = constrain(cropX, 0, width - tileWidth);
      cropY = constrain(cropY, 0, height - tileHeight);
      imgTiles.push(img.get(cropX, cropY, tileWidth, tileHeight));
    }
  }
}

function mouseMoved() {
  selectMode = true;
}

function mouseReleased() {
  selectMode = false;
  cropTiles();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == 'r' || key == 'R') {
    randomMode = !randomMode;
    cropTiles();
  }

  if (key == '1') {
    tileCountX = 4;
    tileCountY = 4;
    cropTiles();
  }
  if (key == '2') {
    tileCountX = 10;
    tileCountY = 10;
    cropTiles();
  }
  if (key == '3') {
    tileCountX = 20;
    tileCountY = 20;
    cropTiles();
  }
}
