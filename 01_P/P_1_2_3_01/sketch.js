// P_1_2_3_01.pde
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
 * generates specific color palettes
 *
 * MOUSE
 * position x/y        : row and coloum count
 *
 * KEYS
 * 0-9                 : creates specific color palettes
 * s                   : save png
 * c                   : save color palette
 */
'use strict';

var tileCountX = 50;
var tileCountY = 10;

// arrays for color components values
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  // init with random values
  for (var i = 0; i < tileCountX; i++) {
    hueValues[i] = int(random(0, 360));
    saturationValues[i] = int(random(0, 100));
    brightnessValues[i] = int(random(0, 100));
  }
}

function draw() {
  // white back
  background(0, 0, 100);

  // limit mouse coordinates to canvas
  var mX = constrain(mouseX, 0, width);
  var mY = constrain(mouseY, 0, height);

  // tile counter
  var counter = 0;

  // map mouse to grid resolution
  var currentTileCountX = int(map(mX, 0, width, 1, tileCountX));
  var currentTileCountY = int(map(mY, 0, height, 1, tileCountY));
  var tileWidth = width / currentTileCountX;
  var tileHeight = height / currentTileCountY;

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;
      var index = counter % currentTileCountX;

      // get component color values
      fill(hueValues[index], saturationValues[index], brightnessValues[index]);
      rect(posX, posY, tileWidth, tileHeight);
      counter++;
    }
  }
}

function keyPressed() {
  if (key == 's' || key =='S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    // -- save an ase file (adobe swatch export) --
    var colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }

  if (key == '1') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = int(random(0, 360));
      saturationValues[i] = int(random(0, 100));
      brightnessValues[i] = int(random(0, 100));
    }
  }

  if (key == '2') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = int(random(0, 360));
      saturationValues[i] = int(random(0, 100));
      brightnessValues[i] = 100;
    }
  }

  if (key == '3') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = int(random(0, 360));
      saturationValues[i] = 100;
      brightnessValues[i] = int(random(0, 100));
    }
  }

  if (key == '4') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 0;
      saturationValues[i] = 0;
      brightnessValues[i] = int(random(0, 100));
    }
  }

  if (key == '5') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 195;
      saturationValues[i] = 100;
      brightnessValues[i] = int(random(0, 100));
    }
  }

  if (key == '6') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = 195;
      saturationValues[i] = int(random(0, 100));
      brightnessValues[i] = 100;
    }
  }

  if (key == '7') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = int(random(0, 180));
      saturationValues[i] = int(random(80, 100));
      brightnessValues[i] = int(random(50, 90));
    }
  }

  if (key == '8') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = int(random(180, 360));
      saturationValues[i] = int(random(80, 100));
      brightnessValues[i] = int(random(50, 90));
    }
  }

  if (key == '9') {
    for (var i = 0; i < tileCountX; i++) {
      if (i % 2 === 0) {
        hueValues[i] = int(random(0, 360));
        saturationValues[i] = 100;
        brightnessValues[i] = int(random(0, 100));
      } else {
        hueValues[i] = 195;
        saturationValues[i] = int(random(0, 100));
        brightnessValues[i] = 100;
      }
    }
  }

  if (key == '0') {
    for (var i = 0; i < tileCountX; i++) {
      if (i % 2 === 0) {
        hueValues[i] = 140;
        saturationValues[i] = int(random(30, 100));
        brightnessValues[i] = int(random(40, 100));
      } else {
        hueValues[i] = 210;
        saturationValues[i] = int(random(40, 100));
        brightnessValues[i] = int(random(50, 100));
      }
    }
  }

}
