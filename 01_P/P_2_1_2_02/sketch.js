// P_2_1_2_02
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
 * changing module color and positions in a grid
 *
 * MOUSE
 * position x          : offset x
 * position y          : offset y
 * left click          : random position
 *
 * KEYS
 * 1-3                 : different sets of colors
 * 0                   : default
 * arrow up/down       : background module size
 * arrow left/right    : foreground module size
 * s                   : save png
 */
'use strict';

var tileCount = 20;
var actRandomSeed = 0;

var moduleColorBackground;
var moduleColorForeground;

var moduleAlphaBackground = 100;
var moduleAlphaForeground = 100;

var moduleRadiusBackground = 30;
var moduleRadiusForeground = 15;

var backgroundColor;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
  moduleColorForeground = color(0, 0, 100, moduleAlphaForeground);

  backgroundColor = color(0, 0, 100);
}

function draw() {
  translate(width / tileCount / 2, height / tileCount / 2);

  background(backgroundColor);

  randomSeed(actRandomSeed);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;

      var shiftX =  random(-1, 1) * mouseX / 20;
      var shiftY =  random(-1, 1) * mouseY / 20;

      fill(moduleColorBackground);
      ellipse(posX + shiftX, posY + shiftY, moduleRadiusBackground, moduleRadiusBackground);
    }
  }

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;

      fill(moduleColorForeground);
      ellipse(posX, posY, moduleRadiusForeground, moduleRadiusForeground);
    }
  }

}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {

  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') {
    if (colorsEqual(moduleColorBackground, color(0, 0, 0, moduleAlphaBackground))) {
      moduleColorBackground = color(273, 73, 51, moduleAlphaBackground);
    } else {
      moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
    }
  }
  if (key == '2') {
    if (colorsEqual(moduleColorForeground, color(360, 100, 100, moduleAlphaForeground))) {
      moduleColorForeground = color(323, 100, 77, moduleAlphaForeground);
    } else {
      moduleColorForeground = color(360, 100, 100, moduleAlphaForeground);
    }
  }

  if (key == '3') {
    if (moduleAlphaBackground == 100) {
      moduleAlphaBackground = 50;
      moduleAlphaForeground = 50;
    } else {
      moduleAlphaBackground = 100;
      moduleAlphaForeground = 100;
    }

    moduleColorBackground = color(
      hue(moduleColorBackground),
      saturation(moduleColorBackground),
      brightness(moduleColorBackground),
      moduleAlphaBackground
    );
    moduleColorForeground = color(
      hue(moduleColorForeground),
      saturation(moduleColorForeground),
      brightness(moduleColorForeground),
      moduleAlphaForeground
    );
  }

  if (key == '0') {
    moduleRadiusBackground = 30;
    moduleRadiusForeground = 15;
    moduleAlphaBackground = 100;
    moduleAlphaForeground = 100;
    moduleColorBackground = color(0, 0, 0, moduleAlphaBackground);
    moduleColorForeground = color(0, 0, 100, moduleAlphaForeground);
  }

  if (keyCode == UP_ARROW) moduleRadiusBackground += 2;
  if (keyCode == DOWN_ARROW) moduleRadiusBackground = max(moduleRadiusBackground - 2, 10);
  if (keyCode == LEFT_ARROW) moduleRadiusForeground = max(moduleRadiusForeground - 2, 5);
  if (keyCode == RIGHT_ARROW) moduleRadiusForeground += 2;
}

function colorsEqual(col1, col2) {
  return col1.toString() == col2.toString();
}
