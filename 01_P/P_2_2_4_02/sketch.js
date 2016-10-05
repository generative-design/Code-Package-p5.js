// P_2_2_4_02.pde
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
 * limited diffusion aggregation
 *
 * KEYS
 * 1             : toggle draw original position of circles
 * s             : save png
 */
'use strict';

var maxCount = 5000; //max count of the cirlces
var currentCount = 1;
var newx = [maxCount];
var newy = [maxCount];
var x = [maxCount];
var y = [maxCount];
var r = [maxCount]; // radius

var drawGhosts = false;

function setup() {
  createCanvas(800, 800);

  // first circle
  x[0] = width/2;
  y[0] = height/2;
  r[0] = 360;
}


function draw() {
  background(255);

  strokeWeight(0.5);
  //noFill();

  // create a random set of parameters
  var newR = random(1, 7);
  var newX = random(0+newR, width-newR);
  var newY = random(0+newR, height-newR);

  var closestDist = 100000000;
  var closestIndex = 0;
  // which circle is the closest?
  for(var i=0; i < currentCount; i++) {
    var newDist = dist(newX,newY, x[i],y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  // aline it to the closest circle outline
  var angle = atan2(newY-y[closestIndex], newX-x[closestIndex]);

  newx[currentCount] = newX;
  newy[currentCount] = newY;
  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex]+newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex]+newR);
  r[currentCount] = newR;
  currentCount++;

  // draw circles at random position and lines
  if (drawGhosts) {
    for (var i=1 ; i < currentCount; i++) {
      fill(230);
      ellipse(newx[i],newy[i], r[i]*2,r[i]*2);
      line(newx[i],newy[i], x[i],y[i]);
    }
  }

  for (var i=0 ; i < currentCount; i++) {
    if (i == 0) noFill();
    else fill(50);
    ellipse(x[i],y[i], r[i]*2,r[i]*2);
  }

  if (currentCount >= maxCount) noLoop();

}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawGhosts = !drawGhosts;
}