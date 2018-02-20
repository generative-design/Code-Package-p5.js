// P_2_1_5_02
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
 * Place stacked circles of randomised heights at the mouse position
 * to create a moire effect drawing
 *
 * MOUSE
 * mouse              : place circle
 *
 * KEYS
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var shapes = [];
var minRadius = 5;
var maxRadius = 250;
var density = 5;

function setup() {
  createCanvas(800, 800);
  noFill();

  shapes.push(new Shape(width / 2, height / 2, width));
}

function draw() {
  background(255);

  shapes.forEach(function(shape) {
    shape.draw();
  });
}

function Shape(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  Shape.prototype.draw = function() {
    for (var i = 0; i < this.r; i += density) {
      ellipse(this.x, this.y, i);
    }
  };
}

function mouseReleased() {
  shapes.push(new Shape(mouseX, mouseY, random(minRadius, maxRadius)));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
