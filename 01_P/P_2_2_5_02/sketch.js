// P_2_2_5_02.pde
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
 * 1                    : show/hide svg modules
 * 2                    : show/hide lines
 * 3                    : show/hide circles
 * arrow up/down        : resize area of interest
 * f                    : freeze process. on/off
 * s                    : save png
 */
'use strict';

var freeze = false;

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

// svg vector import
var module1;
var module2;

// style selector, hotkeys 1,2,3
var showSVG = true;
var showLine = false;
var showCircle = false;

function preload() {
  module1 = loadImage("data/01.svg");
  module2 = loadImage("data/02.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  cursor(CROSS);
  imageMode(CENTER);

  // first circle
  x[0] = 200;
  y[0] = 100;
  r[0] = 50;
  closestIndex[0] = 0;
}

function draw() {
  background(255);

  for (var j = 0; j < 40; j++) {
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

    // freeze process by pressing F
    if (freeze) intersection = true;

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
  }

  // draw items
  for (var i = 0; i < currentCount; i++) {
    push();
    translate(x[i],y[i]);
    rotate(random(TAU)); // generate random angle

    if (showSVG) {
      // draw SVGs
      if (r[i] == maxRadius) {
        image(module1, 0, 0, r[i] * 2, r[i] * 2);
      } else {
        image(module2, 0, 0, r[i] * 2, r[i] * 2);
      }
    }

    if (showCircle) {
      // draw circles
      stroke(0);
      strokeWeight(1.5);
      ellipse(0, 0, r[i] * 2, r[i] * 2);
    }
    pop();

    if (showLine) {
      // draw connection lines to nearest neighbours
      stroke(150);
      strokeWeight(1);
      line(x[i], y[i], x[closestIndex[i]], y[closestIndex[i]]);
    }
  }

  // visualise the random range of the new positions
  if (mouseIsPressed) {
    stroke(255,200,0);
    strokeWeight(2);
    rect(mouseX - mouseRect / 2, mouseY - mouseRect / 2, mouseRect,mouseRect);
  }

  if (currentCount >= maxCount) noLoop();

}

function keyPressed() {
  if (keyCode === UP_ARROW) mouseRect += 4;
  if (keyCode === DOWN_ARROW) mouseRect -= 4;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  // toggle freeze process
  if (key == 'f' || key == 'F') freeze = !freeze;

  // toggle style
  if (key == '1') showSVG = !showSVG;
  if (key == '2') showLine = !showLine;
  if (key == '3') showCircle = !showCircle;
}
