// M_2_5_01.pde
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
 * draw lissajous figures with all points connected
 *
 * KEYS
 * 1/2               : frequency x -/+
 * 3/4               : frequency y -/+
 * arrow left/right  : phi -/+
 * 7/8               : modulation frequency x -/+
 * 9/0               : modulation frequency y -/+
 * s                 : save png
 */
'use strict';

var sketch = function( p ) {

  var pointCount = 1000;
  var lissajousPoints = [];
  var freqX = 4;
  var freqY = 7;
  var phi = 15;

  var modFreqX = 3;
  var modFreqY = 2;

  var lineWeight = 0.1;
  var lineColor;
  var lineAlpha = 50;

  var connectionRadius = 100;
  var connectionRamp = 6;

  p.setup = function() {
    p.createCanvas(800,800);
    p.colorMode(p.RGB, 255, 255, 255, 100);
    p.noFill();

    lineColor = p.color(0, 50);

    calculateLissajousPoints();
    drawLissajous();
  };

  function calculateLissajousPoints() {
    for (var i = 0; i <= pointCount; i++) {
      var angle = p.map(i, 0, pointCount, 0, p.TAU);

      var x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
      var y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
      x *= p.width / 2 - 30;
      y *= p.height / 2 - 30;

      lissajousPoints[i] = p.createVector(x,y);
    }
  }

  function drawLissajous() {
    p.background(255);
    p.strokeWeight(lineWeight);
    p.push();
    p.translate(p.width / 2, p.height / 2);

    for (var i1 = 0; i1 < pointCount; i1++) {
      for (var i2 = 0; i2 < i1; i2++) {
        var d = lissajousPoints[i1].dist(lissajousPoints[i2]);
        var a = p.pow(1 / (d / connectionRadius + 1), 6);
        if (d <= connectionRadius) {
          p.stroke(lineColor, a * lineAlpha);
          p.line(
            lissajousPoints[i1].x,
            lissajousPoints[i1].y,
            lissajousPoints[i2].x,
            lissajousPoints[i2].y
          );
        }
      }
    }
    p.pop();
  }

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');

    if (p.key == '1') freqX--;
    if (p.key == '2') freqX++;
    freqX = p.max(freqX,1);

    if (p.key == '3') freqY--;
    if (p.key == '4') freqY++;
    freqY = p.max(freqY,1);

    if (p.keyCode == p.LEFT_ARROW) phi -= 15;
    if (p.keyCode == p.RIGHT_ARROW) phi += 15;

    if (p.key == '7') modFreqX--;
    if (p.key == '8') modFreqX++;
    modFreqX = p.max(modFreqX,1);

    if (p.key == '9') modFreqY--;
    if (p.key == '0') modFreqY++;
    modFreqY = p.max(modFreqY,1);

    calculateLissajousPoints();
    drawLissajous();

    console.log("freqX: " + freqX + ", freqY: " + freqY + ", phi: " + phi + ", modFreqX: " + modFreqX + ", modFreqY: " + modFreqY);
  };

};

var myp5 = new p5(sketch);
