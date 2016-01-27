// P_2_1_3_01.pde
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
 * changing circle amount, size and position in a grid
 *
 * MOUSE
 * position x          : circle amount and size
 * position y          : circle position
 * left click          : random position
 *
 * KEYS
 * s                   : save png
 */


var tileCountX = 10;
var tileCountY = 10;
var tileWidth  = 0;
var tileHeight = 0;

var count = 0;
var colorStep = 15;
var circleCount = 0;
var endSize = 0;
var endOffset = 0;

var actRandomSeed = 0;


function setup(){
  createCanvas(800,800);
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  noFill();
  stroke(0,128);
}

function draw() {
  background(255);

  translate(tileWidth / 2,tileHeight / 2);

  circleCount = mouseX / 30 + 1;
  endSize = map(mouseX,0,width,tileWidth / 2,0);
  endOffset = map(mouseY,0,height,0,(tileWidth - endSize) / 2);

  for (var girdY = 0; girdY <= tileCountY; girdY++) {
    for (var girdX = 0; girdX <= tileCountX; girdX++) {
      push();
      translate(tileWidth * girdX,tileHeight * girdY);
      scale(1,tileHeight / tileWidth);

      var toggle = int(random(0,4));
      if (toggle === 0) rotate(-HALF_PI);
      if (toggle === 1) rotate(0);
      if (toggle === 2) rotate(HALF_PI);
      if (toggle === 3) rotate(PI);

      // draw module
      for (var i = 0; i < circleCount; i++) {
        var diameter = map(i,0,circleCount - 1,tileWidth,endSize);
        var offset = map(i,0,circleCount - 1,0,endOffset);
        ellipse(offset,0,diameter,diameter);
      }
      pop();
    }
  }
}

function mousePressed() {
  actRandomSeed = int(random(100000));
}

function keyReleased(){
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}