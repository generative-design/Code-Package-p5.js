// P_2_1_5_01
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
 * Simple moire effect demonstration by moving, rotating
 * and scaling a shape of densely packed lines over
 * a background also consisting of densely packed lines.
 *
 * MOUSE
 * mouseX              : overlay rotation or position x
 * mouseY              : overlay scaling
 *
 * KEYS
 * 1-2                 : switch draw mode
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var drawMode = 1;

function setup() {
  createCanvas(800, 800);
  noFill();
}

function draw() {
  background(255);

  translate(width / 2, height / 2);

  // first shape (fixed)
  strokeWeight(3);
  overlay();

  // second shape (dynamically translated/rotated and scaled)
  var x = map(mouseX, 0, width, -50, 50);
  var a = map(mouseX, 0, width, -0.5, 0.5);
  var s = map(mouseY, 0, height, 0.7, 1);

  if (drawMode == 2) translate(x, 0);
  if (drawMode == 1) rotate(a);
  scale(s);

  strokeWeight(2);
  overlay();
}

function overlay() {
  var w = width - 100;
  var h = height - 100;

  if (drawMode == 1) {
    for (var i = -w / 2; i < w / 2; i += 5) {
      line(i, -h / 2, i, h / 2);
    }
  }
  if (drawMode == 2) {
    for (var i = 0; i < w; i += 10) {
      ellipse(0, 0, i);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  // change draw mode
  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
}
