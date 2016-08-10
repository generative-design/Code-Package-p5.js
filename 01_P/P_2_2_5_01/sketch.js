// P_2_2_5_01.pde
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
 * pack as many cirlces as possible together
 *
 * MOUSE
 * press + position x/y : move area of interest
 *
 * KEYS
 * arrow up/down        : resize area of interest
 * s                    : save png
 */
'use strict';

var maxCount = 5000; // max number of circles
var currentCount = 1;
var x = [];
var y = [];
var r = [];
var closestIndex = [];

var minRadius = 3;
var maxRadius = 50;

// for mouse and up/down-arrow interaction
var mouseRect = 30;

function setup() {
  createCanvas(800,800);
  noFill();
  cursor(CROSS);

  // first circle
  x[0] = 200;
  y[0] = 100;
  r[0] = 50;
  closestIndex[0] = 0;
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    // create a random position according to mouse position
    newX = random(mouseX - mouseRect / 2,mouseX + mouseRect / 2);
    newY = random(mouseY - mouseRect / 2,mouseY + mouseRect / 2);
    newR = 1;
  } else {
    // create random position
    var newX = random(maxRadius,width - maxRadius);
    var newY = random(maxRadius,height - maxRadius);
    var newR = minRadius;
  }

  var intersection = false;

  // find out if new circle intersects with one of the others
  for (var i = 0; i < currentCount; i++) {
    if (dist(newX,newY,x[i],y[i]) < newR + r[i]) {
      intersection = true;
      break;
    }
  }

  // if no intersection, add a new circle
  if (!intersection) {
    // get closest neighbour and closest possible radius
    var newRadius = width;
    for (var i = 0; i < currentCount; i++) {
      var d = dist(newX,newY, x[i],y[i]);
      if (newRadius > d - r[i]) {
        newRadius = d - r[i];
        closestIndex[currentCount] = i;
      }
    }

    if (newRadius > maxRadius) newRadius = maxRadius;

    x[currentCount] = newX;
    y[currentCount] = newY;
    r[currentCount] = newRadius;
    currentCount++;
  }

  // draw circles
  for (var i = 0; i < currentCount; i++) {
    stroke(0);
    strokeWeight(1.5);
    ellipse(x[i],y[i],r[i] * 2,r[i] * 2);
    stroke(226,185,0);
    strokeWeight(0.75);
    line(x[i],y[i], x[closestIndex[i]],y[closestIndex[i]]);
  }

  // visualise the random range of the new positions
  if (mouseIsPressed) {
    stroke(255,200,0);
    strokeWeight(2);
    rect(mouseX - mouseRect / 2,mouseY - mouseRect / 2,mouseRect,mouseRect);
  }

  if (currentCount >= maxCount) noLoop();

}

function keyPressed() {
  if (keyCode === UP_ARROW) mouseRect += 4;
  if (keyCode === DOWN_ARROW) mouseRect -= 4;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}