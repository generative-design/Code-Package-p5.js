// P_2_2_5_01
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
 * 1                    : show/hide circles
 * 2                    : show/hide lines
 * arrow up/down        : resize area of interest
 * f                    : freeze process. on/off
 * s                    : save png
 */
'use strict';

var circles = [];

var minRadius = 3;
var maxRadius = 50;

// for mouse and up/down-arrow interaction
var mouseRect = 15;

var freeze = false;

var showCircle = true;
var showLine = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  cursor(CROSS);
  ellipseMode(RADIUS);
  rectMode(RADIUS);
}

function draw() {
  background(255);

  // Choose a random or the current mouse position
  var newX = random(maxRadius, width - maxRadius);
  var newY = random(maxRadius, height - maxRadius);
  if (mouseIsPressed && mouseButton == LEFT) {
    newX = random(mouseX - mouseRect, mouseX + mouseRect);
    newY = random(mouseY - mouseRect, mouseY + mouseRect);
  }

  // Try to fit the largest possible circle at the current location without overlapping
  var intersection = false;
  for (var newR = maxRadius; newR >= minRadius; newR--) {
    for (var i = 0; i < circles.length; i++) {
      intersection = dist(newX, newY, circles[i].x, circles[i].y) < circles[i].r + newR;
      if (intersection) {
        break;
      }
    }
    if (!intersection) {
      circles.push(new Circle(newX, newY, newR));
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    if (showLine) {
      // Try to find an adjacent circle to the current one and draw a connecting line between the two
      var closestCircle;
      for (var j = 0; j < circles.length; j++) {
        if (dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y) <= circles[i].r + circles[j].r + 1) {
          closestCircle = circles[j];
          break;
        }
      }
      if (closestCircle) {
        stroke(100, 230, 100);
        strokeWeight(0.75);
        line(circles[i].x, circles[i].y, closestCircle.x, closestCircle.y);
      }
    }

    // Draw the circle itself.
    if (showCircle) circles[i].draw();
  }

  // Visualise the random range of the current mouse position
  if (mouseIsPressed && mouseButton == LEFT) {
    stroke(100, 230, 100);
    strokeWeight(2);
    rect(mouseX, mouseY, mouseRect, mouseRect);
  }
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  Circle.prototype.draw = function() {
    stroke(0);
    strokeWeight(1.5);
    ellipse(this.x, this.y, this.r);
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (keyCode == UP_ARROW) mouseRect += 4;
  if (keyCode == DOWN_ARROW) mouseRect -= 4;

  // toggle freeze drawing
  if (key == 'f' || key == 'F') {
    freeze = !freeze;
    if (freeze) {
      noLoop();
    } else {
      loop();
    }
  }

  // toggle style
  if (key == '1') showCircle = !showCircle;
  if (key == '2') showLine = !showLine;
}
