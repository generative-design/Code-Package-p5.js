// Cover_Barcode
//
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
 * KEYS
 * s             : save png
 */

'use strict';

var colorPoints = [];
var ribbon;

// chose 8 for print quality (caution: very slow)
var mmToPx = 3;

// these are in mm:
var coverWidth = 400;
var coverHeight = 400;

var barcodeNumbers = [9, 9, 7, 8, 3, 8, 7, 4, 3, 9, 9, 0, 2, 9,];

function setup() {
  createCanvas(coverWidth * mmToPx, coverHeight * mmToPx);

  // create colorPoints
  for (var i = 0; i < barcodeNumbers.length; i++) {
    var n = barcodeNumbers[i];
    var r = imageColors[n].r;
    var g = imageColors[n].g;
    var b = imageColors[n].b;
    var a = imageColors[n].a * map(i, 0, barcodeNumbers.length - 1, 1, 0.05);
    var col = color(r, g, b, a);

    colorPoints.push(new ColorPoint(n, col, 1));
  }

  // Barcode
  ribbon = new Ribbon(colorPoints, 150, { n: barcodeInfo.length - 1, step: 0.15, damp: 0.02, minW: 10, maxW: 50, });

}

function draw() {
  // background(255);
  translate(150 * mmToPx, 50 * mmToPx);
  rotate(radians(180));
  scale(mmToPx);

  ribbon.draw();

  noLoop();
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
