// M_2_3_02.pde
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
 * draws a modulated lissajous curve
 *
 * MOUSE
 * position x        : number of points
 *
 * KEYS
 * d                 : draw mode
 * 1/2               : frequency x -/+
 * 3/4               : frequency y -/+
 * arrow left/right  : phi -/+
 * 7/8               : modulation frequency x -/+
 * 9/0               : modulation frequency y -/+
 * s                 : save png
 */
'use strict';

var sketch = function( p ) {

  var pointCount = 500;
  var freqX = 1;
  var freqY = 4;
  var phi = 60;

  var modFreqX = 2;
  var modFreqY = 1;
  var modulationPhi = 0;

  var angle;
  var x;
  var y;
  var w;
  var maxDist;
  var oldX;
  var oldY;

  var drawMode = 2;

  p.setup = function() {
    p.createCanvas(600,600);
    maxDist = p.sqrt(p.sq(p.width / 2 - 50) + p.sq(p.height / 2 - 50));
  };

  p.draw = function() {
    p.background(255);

    p.translate(p.width / 2, p.height / 2);

    pointCount = p.mouseX * 2 + 200;

    if (drawMode === 1) {
      p.stroke(0);
      p.strokeWeight(1);

      p.beginShape();
      for (var i = 0; i <= pointCount; i++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
        y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
        x *= p.width / 2 - 50;
        y *= p.height / 2 - 50;
        p.vertex(x,y);
      }
      p.endShape();
    } else if (drawMode === 2) {
      p.strokeWeight(8);

      for (var i = 0; i <= pointCount; i++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
        y = p.sin(angle * freqY) * p.cos(angle * modFreqY);
        x *= p.width / 2 - 50;
        y *= p.height / 2 - 50;

        if (i > 0) {
          w = p.dist(x,y,0,0);
          p.stroke(i % 2 * 2, p.map(w, 0, maxDist, 255, 0));
          p.line(oldX,oldY,x,y);
        }

        oldX = x;
        oldY = y;
      }
    }
  };

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');

    if (p.key == 'd' || p.key == 'D') {
      if (drawMode === 1) {
        drawMode = 2;
      } else {
        drawMode = 1;
      }
    }

    if (p.key == '1') freqX--;
    if (p.key == '2') freqX++;
    freqX = p.max(freqX,1);

    if (p.key == '3') freqY--;
    if (p.key == '4') freqY++;
    freqY = p.max(freqY,1);

    if (p.keyCode === p.LEFT_ARROW) phi -= 15;
    if (p.keyCode === p.RIGHT_ARROW) phi += 15;

    if (p.key == '7') modFreqX--;
    if (p.key == '8') modFreqX++;
    modFreqX = p.max(modFreqX,1);

    if (p.key == '9') modFreqY--;
    if (p.key == '0') modFreqY++;
    modFreqY = p.max(modFreqY,1);

    console.log("freqX: " + freqX + ", freqY: " + freqY + ", phi: " + phi + ", modFreqX: " + modFreqX + ", modFreqY: " + modFreqY);
  };

};

var myp5 = new p5(sketch);
