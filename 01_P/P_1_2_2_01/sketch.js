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
 * p                   : save pdf
 * c                   : save color palette
 */
'use strict';

var img;
var colors = [];

function preload(){
  img = loadImage("data/pic1.jpg");
}

function setup() {
  createCanvas(600, 600);
  noCursor();
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  img.loadPixels();
  // image(img,0,0);
  // clear();
  var tileCount = width / max(mouseX, 5);
  var rectSize = int(width / float(tileCount));
  // console.log("width:" + width);
  // console.log("tileCount: " + tileCount + "rectSize: " + rectSize);
  // rectSize = 7;
  // get colors from image
  var i = 0;
  // colors = [];
  // for (var gridY=0; gridY<int(tileCount/5); gridY++) {
  //   for (var gridX=0; gridX<int(tileCount/5); gridX++) {
  //     var px = int(gridX * rectSize);
  //     var py = int(gridY * rectSize);
  //     // console.log(px);
  //     // console.log(py);
  //     // colors.push(1);
  //     colors[i] = img.get(px, py);
  //     //console.log(colors[i]);
  //     i++;
  //   }
  // }
  // console.log(i);
  // console.log(colors.length);
    
 // // sort colors
 // if (sortMode != null) colors = GenerativeDesign.sortColors(this, colors, sortMode);

  for(var gridY = 0; gridY < width; gridY+=rectSize){
    i=width*4*gridY;
    for(var gridX = 0; gridX < width; gridX+=rectSize){
      fill('rgba('+img.pixels[i]+', '+img.pixels[i+1]+', '+img.pixels[i+2]+', '+img.pixels[i+3]+')');
      rect(gridX, gridY, rectSize, rectSize);
      i+=rectSize*4;
    }
  }

  // draw grid
  // i = 0;
  // for (var gridY=0; gridY<tileCount; gridY++) {
  //   for (var gridX=0; gridX<tileCount; gridX++) {
  //     fill(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
  //     rect(gridX*rectSize, gridY*rectSize, rectSize, rectSize);
  //     i+=4;
  //   }
  // }
}

function keyReleased(){
//  if (key=='c' || key=='C') GenerativeDesign.saveASE(this, colors, timestamp()+".ase");
//  if (key=='s' || key=='S') saveFrame(timestamp()+"_##.png");
//  if (key=='p' || key=='P') savePDF = true;

  if (key == '1') img = loadImage("data/pic1.jpg");
  if (key == '2') img = loadImage("data/pic2.jpg"); 
  if (key == '3') img = loadImage("data/pic3.jpg"); 

//  if (key == '4') sortMode = null;
//  if (key == '5') sortMode = GenerativeDesign.HUE;
//  if (key == '6') sortMode = GenerativeDesign.SATURATION;
//  if (key == '7') sortMode = GenerativeDesign.BRIGHTNESS;
//  if (key == '8') sortMode = GenerativeDesign.GRAYSCALE;
}