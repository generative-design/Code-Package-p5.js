// P_1_2_2_01.pde
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
 * extract and sort the color palette of an image
 * 	 
 * MOUSE
 * position x          : resolution
 * 
 * KEYS
 * 1-3                 : load different images
 * 4                   : no color sorting
 * 5                   : sort colors on hue
 * 6                   : sort colors on saturation
 * 7                   : sort colors on brightness
 * 8                   : sort colors on greyscale (luminance)
 * s                   : save png
 * c                   : save color palette
 */

'use strict';
var img;
var colors = [];

var sortMode = null;

function preload(){
  img = loadImage("data/pic1.jpg");
}

function setup() {
  createCanvas(600, 600);
  //noCursor();
  noStroke();
}

function draw() {
  var tileCount = floor(width / constrain(mouseX, 5, width));
  var rectSize = width / tileCount;

  img.loadPixels();
  colors = [];

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);
      var i = (py * img.width + px) * 4;
      var c = color(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
      colors.push(c);
    }
  }

  if (sortMode == "hue") sortHue();
  if (sortMode == "saturation") sortSaturation();
  if (sortMode == "brightness") sortBrightness();
  if (sortMode == "greyscale") sortGreyscale();

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var index = gridY * tileCount + gridX;
      fill(colors[index]);
      rect(gridX*rectSize, gridY*rectSize, rectSize, rectSize);
    }
  }
}



function sortHue(){
  colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aHue = chroma(red(a), green(a), blue(a)).get('hsv.h');
    var bHue = chroma(red(b), green(b), blue(b)).get('hsv.h');

    if (aHue < bHue) return 1;
    if (aHue > bHue) return -1;
    return 0;
  })
}

function sortSaturation() {
  colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aSat = chroma(red(a), green(a), blue(a)).get('hsv.s');
    var bSat = chroma(red(b), green(b), blue(b)).get('hsv.s');

    if (aSat < bSat) return 1;
    if (aSat > bSat) return -1;
    return 0;
  })
}

function sortBrightness() {
  colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aBright = chroma(red(a), green(a), blue(a)).get('hsv.v');
    var bBright = chroma(red(b), green(b), blue(b)).get('hsv.v');

    if (aBright < bBright) return 1;
    if (aBright > bBright) return -1;
    return 0;
  })
}

function sortGreyscale() {
  colors.sort(function (a, b) {
    var aGrey = (red(a) * 0.222 + green(a) * 0.707 + blue(a) * 0.071);
    var bGrey = (red(b) * 0.222 + green(b) * 0.707 + blue(b) * 0.071);

    if (aGrey < bGrey) return 1;
    if (aGrey > bGrey) return -1;
    return 0;
  })
}

function mousePressed() {
  console.log('-------------------------')
  for (var i = 0; i < colors.length; i++) {
    var g = red(colors[i]) * 0.222 + green(colors[i]) * 0.707 + blue(colors[i]) * 0.071;
    console.log(g, "|", red(colors[i]), green(colors[i]), blue(colors[i]));
  }
}

function keyReleased(){
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode( colors )], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') {
    img = loadImage("data/pic1.jpg");
  }
  if (key == '2') {
    img = loadImage("data/pic2.jpg");
  }
  if (key == '3') {
    img = loadImage("data/pic3.jpg");
  }

  if (key == '4') sortMode = null;
  if (key == '5') sortMode = "hue";
  if (key == '6') sortMode = "saturation";
  if (key == '7') sortMode = "brightness";
  if (key == '8') sortMode = "greyscale";
}