// P_2_2_4_02
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
 * limited diffusion aggregation
 *
 * KEYS
 * 1             : toggle draw original position of circles
 * s             : save png
 */
'use strict';

var shapes = [];
var maxCount = 5000; // max count of the cirlces
var x = [];
var y = [];
var r = [];
var x2 = [];
var y2 = [];

var drawGhosts = false;

function setup() {
  createCanvas(800, 800);

  // first circle
  shapes.push(new Shape(width / 2, height / 2, 360));
}

function draw() {
  clear();

  strokeWeight(0.5);
  noFill();

  // create a random set of parameters
  var newR = random(1, 7);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  // which shape is the closest?
  var closestShape;
  shapes.forEach(function(shape) {
    var newDist = dist(newX, newY, shape.x, shape.y);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestShape = shape;
    }
  });

  // align it to the closest circle outline
  var angle = atan2(newY - closestShape.y, newX - closestShape.x);

  shapes.push(new Shape(
    closestShape.x + cos(angle) * (closestShape.r + newR),
    closestShape.y + sin(angle) * (closestShape.r + newR),
    newR,
    newX,
    newY
  ));

  // draw circles at random position and lines
  shapes.forEach(function(shape, index) {
    if (drawGhosts) {
      fill(230);
      ellipse(shape.newX, shape.newY, shape.r * 2);
      line(shape.newX, shape.newY, shape.x, shape.y);
    }
    if (index == 0) {
      noFill();
    } else {
      fill(50);
    }
    ellipse(shape.x, shape.y, shape.r * 2);
  });

  if (shapes.length >= maxCount) noLoop();
}

function Shape(x, y, r, newX, newY) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.newX = newX;
  this.newY = newY;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawGhosts = !drawGhosts;
}
