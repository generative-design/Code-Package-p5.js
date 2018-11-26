// M_2_3_01
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
 * draws an amplitude modulated oscillator
 *
 * KEYS
 * i                 : toggle draw info signal
 * c                 : toggle draw carrier signal
 * 1/2               : info signal frequency -/+
 * arrow left/right  : info signal phi -/+
 * 7/8               : carrier signal frequency -/+ (modulation frequency)
 * s                 : save png
 */
'use strict';

var sketch = function(p) {

  var pointCount = 600;
  var freq = 2;
  var phi = 0;
  var modFreq = 12;

  var drawFrequency = true;
  var drawModulation = true;
  var drawCombination = true;

  var angle;
  var y;

  p.setup = function() {
    p.createCanvas(p.windowWidth,800);
    p.noFill();
    pointCount = p.width;
  };

  p.draw = function() {
    p.background(255);
    p.strokeWeight(1);

    p.translate(0, p.height / 2);

    // draw oscillator with freq and phi
    if (drawFrequency) {
      p.beginShape();
      for (var i = 0; i <= pointCount; i++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        y = p.sin(angle * freq + p.radians(phi));
        y *= p.height / 4;
        p.vertex(i,y);
      }
      p.endShape();
    }

    // draw oscillator with modFreq
    if (drawModulation) {
      p.stroke(0,130,164,128);
      p.beginShape();
      for (var i = 0; i <= pointCount; i++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        y = p.cos(angle * modFreq);
        y *= p.height / 4;
        p.vertex(i,y);
      }
      p.endShape();
    }

    // draw both combined
    p.stroke(0);
    p.strokeWeight(2);
    p.beginShape();
    for (var i = 0; i <= pointCount; i++) {
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      var info = p.sin(angle * freq + p.radians(phi));
      var carrier = p.cos(angle * modFreq);
      y = info * carrier;
      y *= p.height / 4;
      p.vertex(i,y);
    }
    p.endShape();
  };

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');

    if (p.key == 'i' || p.key == 'I') drawFrequency = !drawFrequency;
    if (p.key == 'c' || p.key == 'C') drawModulation = !drawModulation;

    if (p.key == '1') freq--;
    if (p.key == '2') freq++;
    freq = p.max(freq,1);

    if (p.keyCode == p.LEFT_ARROW) phi -= 15;
    if (p.keyCode == p.RIGHT_ARROW) phi += 15;

    if (p.key == '7') modFreq--;
    if (p.key == '8') modFreq++;
    modFreq = p.max(modFreq,1);

    console.log('freq: ' + freq + ', phi: ' + phi + ', modFreq: ' + modFreq);
  };

};

var myp5 = new p5(sketch);
