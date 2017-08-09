// P_2_3_5_01_TABLET
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
 * draw tool. shows how to draw with dynamic elements.
 * works only with an external tablet device!
 *
 * MOUSE
 * drag                : draw
 *
 * TABLET
 * pressure            : saturation (in draw mode 3 only)
 * azimuth             : rotation of each element
 * altitude            : length of each element
 *
 * KEYS
 * 1-3                 : draw mode
 * 6-0                 : colors
 * del, backspace      : clear screen
 * s                   : save png
 */
'use strict';

var tablet;

var drawMode = 1;
var back;

var fromColor;
var toColor;

function setup() {
  // use full screen size
  createCanvas(displayWidth, displayHeight);

  back = color(255);
  fromColor = color(181, 157, 0);
  toColor = color(181, 157, 0);

  background(back);
  frameRate(30);

  tablet = new gd.WacomTablet();
  //console.log(tablet.values());
}

function draw() {
  var tabletValues = tablet.values();

  // gamma values optimized for wacom intuos 3
  var pressure = gamma(tabletValues.pressure, 2.5);
  var angle = tabletValues.azimuth;
  var penLength = cos(tabletValues.altitude);

  if (pressure > 0 && penLength > 0) {
    push();
    translate(mouseX, mouseY);
    rotate(angle);

    var elementLength = penLength * 250;
    var h1 = random(10) * (1.2 + penLength);
    var h2 = (-10 + random(10)) * (1.2 + penLength);

    switch (drawMode) {
      case 1:
        stroke(255);
        strokeWeight(0.5);
        fill(0);
        break;
      case 2:
        stroke(255);
        strokeWeight(0.5);
        //noStroke();
        var white = color(255, 20);
        var interColor = lerpColor(fromColor, toColor, random(0, 1));
        fill(lerpColor(white, interColor, pressure));
        break;
      case 3:
        var julia = int(map(pressure, 0, 1, 0, 255));
        fill(0, julia);
        stroke(255);
        strokeWeight(0.5);
        elementLength = penLength * 50;
        h1 = random(5) + elementLength/2;
        h2 = (random(5) + elementLength/2) * -1;
        break;
    }

    pointsX = [];
    pointsY = [];

    pointsX[0] = 0;
    pointsY[0] = 0;
    pointsX[1] = elementLength * 0.77;
    pointsY[1] = h1;
    pointsX[2] = elementLength;
    pointsY[2] = 0;
    pointsX[3] = elementLength * 0.77;
    pointsY[3] = h2;
    pointsX[4] = 0;
    pointsY[4] = -5;

    beginShape();
    // start controlpoint
    curveVertex(pointsX[3], pointsY[3]);
    // only these points are drawn
    for (var i = 0; i < pointsX.length; i++) {
      curveVertex(pointsX[i], pointsY[i]);
    }
    // end controlpoint
    curveVertex(pointsX[1], pointsY[1]);
    endShape(CLOSE);
    pop();
  }
}

// gamma ramp, non linaer mapping ...
function gamma(theValue, theGamma) {
  return pow(theValue, theGamma);
}
