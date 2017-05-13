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

var circles = [];

var minRadius = 3;
var maxRadius = 50;

// for mouse and up/down-arrow interaction
var mouseRect = 15;

function setup() {
  createCanvas(800,800);
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
  if (mouseIsPressed) {
    newX = random(mouseX - mouseRect, mouseX + mouseRect);
    newY = random(mouseY - mouseRect, mouseY + mouseRect);
  }

  // Try to fit the largest possible circle at the current location without overlapping
  for (var newR = maxRadius; newR >= minRadius; newR--) {
    var intersection = circles.some(function(circle) {
      return dist(newX, newY, circle.x, circle.y) < circle.r + newR;
    });
    if (!intersection) {
      circles.push(new Circle(newX, newY, newR));
      break;
    }
  }

  // Draw all circles
  circles.forEach(function(circle) {
    // Try to find an adjacent circle to the current one and draw a connecting line between the two
    var closestCircle = circles.filter(function(otherCircle) {
      return dist(circle.x, circle.y, otherCircle.x, otherCircle.y) <= circle.r + otherCircle.r + 1;
    })[0];
    if (closestCircle) {
      stroke(255, 200, 0);
      strokeWeight(0.75);
      line(circle.x, circle.y, closestCircle.x, closestCircle.y);
    }

    // Draw the circle itself.
    stroke(0);
    strokeWeight(1.5);
    circle.draw();
  });

  // Visualise the random range of the current mouse position
  if (mouseIsPressed) {
    stroke(255,200,0)
    strokeWeight(2);
    rect(mouseX, mouseY, mouseRect, mouseRect);;
  }
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  Circle.prototype.draw = function() {
    ellipse(this.x, this.y, this.r);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) mouseRect += 4;
  if (keyCode === DOWN_ARROW) mouseRect -= 4;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
