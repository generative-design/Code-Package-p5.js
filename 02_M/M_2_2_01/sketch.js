// M_2_2_01
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
 * draws a lissajous curve
 *
 * KEYS
 * a                 : toggle oscillation animation
 * 1/2               : frequency x -/+
 * 3/4               : frequency y -/+
 * arrow left/right  : phi -/+
 * s                 : save png
 */
'use strict';

var sketch = function(p) {

  var pointCount = 600;
  var freqX = 1;
  var freqY = 2;
  var phi = 90;

  var angle;
  var x;
  var y;
  var factorX;
  var factorY;

  var dodrawAnimation = true;

  var margin = 25;

  p.setup = function() {
    p.createCanvas(600,600);
  };

  p.draw = function() {
    p.background(255);
    p.stroke(0);
    p.strokeWeight(2);

    if (dodrawAnimation) {
      p.translate(p.width * 3 / 4, p.height * 3 / 4);
      factorX = p.width / 4 - margin;
      factorY = p.height / 4 - margin;
    } else {
      p.translate(p.width / 2, p.height / 2);
      factorX = p.width / 2 - margin;
      factorY = p.height / 2 - margin;
    }

    // draw oscillator curve
    p.beginShape();
    for (var i = 0; i <= pointCount; i++) {
      angle = p.map(i,0,pointCount,0,p.TAU);

      x = p.sin(angle * freqX + p.radians(phi));
      y = p.sin(angle * freqY);
      x *= factorX;
      y *= factorY;

      p.vertex(x,y);
    }
    p.endShape();

    if (dodrawAnimation) {
      drawAnimation();
    }

  };

  function drawAnimation() {
    p.push();
    p.noFill();
    p.stroke(0);

    // draw x oscillator
    p.beginShape();
    for (var i = 0; i <= pointCount; i++){
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      x = p.sin(angle * freqX + p.radians(phi));
      x *= p.width / 4 - margin;
      y = -p.height * 2 / 3 - margin + i / pointCount * (p.height / 2 - 2 * margin);
      p.vertex(x, y);
    }
    p.endShape();

    // draw y oscillator
    p.beginShape();
    for (var i = 0; i <= pointCount; i++){
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      y = p.sin(angle * freqY);
      y *= p.height / 4 - margin;
      x = -p.width * 2 / 3 - margin + i / pointCount * (p.width / 2 - 2 * margin);
      p.vertex(x, y);
    }
    p.endShape();

    angle = p.map(p.frameCount, 0, pointCount, 0, p.TAU);
    x = p.sin(angle * freqX + p.radians(phi));
    y = p.sin(angle * freqY);
    x *= p.width / 4 - margin;
    y *= p.height / 4 - margin;

    var oscYx = -p.width * 2 / 3 - margin + (angle / p.TAU) % 1 * (p.width / 2 - 2 * margin);
    var oscXy = -p.height * 2 / 3 - margin + (angle / p.TAU) % 1 * (p.height / 2 - 2 * margin);

    p.stroke(0,80);
    p.line(x, oscXy, x, y);
    p.line(oscXy, y, x, y);

    p.fill(0);
    p.stroke(255);
    p.strokeWeight(2);

    p.ellipse(x, oscXy, 8, 8);
    p.ellipse(oscYx, y, 8, 8);

    p.ellipse(x, y, 10, 10);

    p.pop();
  }

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');

    if (p.key == 'a' || p.key == 'A') dodrawAnimation = !dodrawAnimation;

    if (p.key == '1') freqX--;
    if (p.key == '2') freqX++;
    freqX = p.max(freqX,1);

    if (p.key == '3') freqY--;
    if (p.key == '4') freqY++;
    freqY = p.max(freqY,1);

    if (p.keyCode == p.LEFT_ARROW) phi -= 15;
    if (p.keyCode == p.RIGHT_ARROW) phi += 15;

    console.log('freqX: ' + freqX + ', freqY: ' + freqY + ', phi: ' + phi);
  };

};

var myp5 = new p5(sketch);
