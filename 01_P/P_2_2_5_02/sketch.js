// P_2_2_5_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
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
 * 3                    : show/hide svg modules
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

// svg vector import
var module1;
var module2;

// style selector, hotkeys 1, 2, 3
var showCircle = false;
var showLine = false;
var showSVG = true;

function preload() {
  module1 = loadImage('data/01.svg');
  module2 = loadImage('data/02.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  cursor(CROSS);
  ellipseMode(RADIUS);
  rectMode(RADIUS);
  imageMode(CENTER);
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
    if (showLine) {
      // Try to find an adjacent circle to the current one and draw a connecting line between the two
      var closestCircle = circles.find(function(otherCircle) {
        return dist(circle.x, circle.y, otherCircle.x, otherCircle.y) <= circle.r + otherCircle.r + 1;
      });
      if (closestCircle) {
        stroke(100, 230, 100);
        strokeWeight(0.75);
        line(circle.x, circle.y, closestCircle.x, closestCircle.y);
      }
    }

    // Draw the circle itself.
    circle.draw();
  });

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
  this.rotation = random(TAU);

  Circle.prototype.draw = function() {
    if (showSVG) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      if (this.r == maxRadius) {
        image(module1, 0, 0, this.r * 2, this.r * 2);
      } else {
        image(module2, 0, 0, this.r * 2, this.r * 2);
      }
      pop();
    }
    if (showCircle) {
      stroke(0);
      strokeWeight(1.5);
      ellipse(this.x, this.y, this.r);
    }
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
  if (key == '3') showSVG = !showSVG;
}
