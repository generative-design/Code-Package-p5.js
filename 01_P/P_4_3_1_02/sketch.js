// P_4_3_1_02.pde
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
 * pixel mapping. each pixel is translated into a new element (svg file).
 * take care to sort the svg file according to their greyscale value.
 * see also "_4_3_1_02_analyse_svg_grayscale.pde"
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var shapes = [];
var img;


function preload() {
  img = loadImage("data/pic.png");

  shapes.push(loadImage("data/056.svg"));
  shapes.push(loadImage("data/076.svg"));
  shapes.push(loadImage("data/082.svg"));
  shapes.push(loadImage("data/096.svg"));
  shapes.push(loadImage("data/117.svg"));
  shapes.push(loadImage("data/148.svg"));
  shapes.push(loadImage("data/152.svg"));
  shapes.push(loadImage("data/157.svg"));
  shapes.push(loadImage("data/164.svg"));
  shapes.push(loadImage("data/166.svg"));
  shapes.push(loadImage("data/186.svg"));
  shapes.push(loadImage("data/198.svg"));
  shapes.push(loadImage("data/224.svg"));
}

function setup(){
  createCanvas(600, 900);
  image(img, 0, 0);
  console.log(img.width+" x "+img.height);
  console.log(shapes.length);
};

function draw(){
  background(255);

  for (var gridX = 0; gridX < img.width; gridX++){
    for(var gridY = 0; gridY < img.height; gridY++){
      // grid position + title size
      var titleWidth = 603 / img.width;
      var titleHeight = 873 / img.height;
      var posX = titleWidth*gridX;
      var posY = titleHeight*gridY;

      // get current color
      img.loadPixels();
      var c = img.get(min(gridX,img.width-1), gridY);
      // greyscale conversion
      var greyscale = Math.round(red(c)*0.222 + green(c)*0.707 + blue(c)*0.071);
      var gradientToIndex = Math.round(map(greyscale, 0,255, 0,shapes.length-1));
      image(shapes[gradientToIndex], posX,posY, titleWidth,titleHeight);
    }
  }
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
