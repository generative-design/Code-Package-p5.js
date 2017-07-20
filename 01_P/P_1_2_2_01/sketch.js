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
 * 8                   : sort colors on grayscale (luminance)
 * s                   : save png
 * c                   : save color palette
 */

'use strict';

var img;
var imgLoaded = false;
var imgCopied = false;
var colors = [];

function preload(){
  img = loadImage("data/pic1.jpg", function(){ imgLoaded = true });
}

function setup() {
  createCanvas(600, 600);
  noCursor();
  noStroke();
}

function draw() {
  var tileCount = width / max(mouseX, 5);
  var rectSize = width / tileCount;

  if(!imgCopied && imgLoaded){
    loadPixelsAndCopyToColorsArray();
  }

  if(!imgCopied){
    for (var gridY = 0; gridY < tileCount; gridY++) {
      for (var gridX = 0; gridX < tileCount; gridX++) {
        var pos = gridY * 120 * int(120 / tileCount) + gridX * int(120 / tileCount);
        fill(red(colors[pos]), green(colors[pos]), blue(colors[pos]), alpha(colors[pos]));
        rect(gridX*rectSize, gridY*rectSize, rectSize, rectSize);
      }
    }
  }
}

function loadPixelsAndCopyToColorsArray(){
    imgCopied = true;
    img.loadPixels();
    colors = [];
    for(var j = 0; j < img.pixels.length; j += 20){
        if(j % 600 * 4 == 0) j += 600 * 4;
        var pixel;
        colors.push(pixel = color(img.pixels[j], img.pixels[j + 1], img.pixels[j + 2], img.pixels[j + 3]));
    }
    imgLoaded = false;
    imgCopied = false;
}

function sortHue(){
  colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aHSV = chroma(red(a), green(a), blue(a));
    var bHSV = chroma(red(b), green(b), blue(b));

    return aHSV.get('hsv.h') < bHSV.get('hsv.h');
  })
}

function sortSaturation(){
  colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aHSV = chroma(red(a), green(a), blue(a));
    var bHSV = chroma(red(b), green(b), blue(b));

    return aHSV.get('hsv.s') < bHSV.get('hsv.s');
  })
}

function sortBrightness(){
  colors.sort(function (a, b) {
    //convert a and b from RGB to HSV
    var aHSV = chroma(red(a), green(a), blue(a));
    var bHSV = chroma(red(b), green(b), blue(b));

    return aHSV.get('hsv.v') < bHSV.get('hsv.v');
  })
}

function sortGreyscale(){
  colors.sort(function (a, b) {
    var aGreyscale = round(red(a) * 0.222 + green(a) * 0.707 + blue(a) * 0.071);
    var bGreyscale = round(red(b) * 0.222 + green(b) * 0.707 + blue(b) * 0.071);

    return aGreyscale < bGreyscale;
  })
}

function keyReleased(){
  if (key == 'c' || key == 'C') writeFile([gd.ase.encode( colors )], gd.timestamp(), 'ase');
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') img = loadImage("data/pic1.jpg", function(){ imgLoaded = true  });
  if (key == '2') img = loadImage("data/pic2.jpg", function(){ imgLoaded = true  });
  if (key == '3') img = loadImage("data/pic3.jpg", function(){ imgLoaded = true  }); 

  if (key == '4') loadPixelsAndCopyToColorsArray();
  if (key == '5') sortHue();
  if (key == '6') sortSaturation();
  if (key == '7') sortBrightness();
  if (key == '8') sortGreyscale();
}