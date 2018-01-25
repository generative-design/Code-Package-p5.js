// M_1_5_04
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
 * noise values (noise 3d) are used to animate a bunch of agents.
 *
 * KEYS
 * 1                   : draw style line
 * 2                   : draw style ellipse
 * backspace           : clear screen
 * s                   : save png
 */
'use strict';

var sketch = function( p ) {

  var agents = [];
  var agentCount = 2000;
  var noiseScale = 100;
  var noiseStrength = 10;
  var noiseStickingRange = 0.4;
  var zNoiseVelocity = 0.01;
  var overlayAlpha = 8;
  var agentAlpha = 90;
  var strokeWidth = 2;
  var agentWidthMin = 1.5;
  var agentWidthMax = 15;
  var drawMode = 1;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);

    for(var i = 0; i < agentCount; i++) {
      agents[i] = new Agent(noiseStickingRange, agentAlpha, noiseScale, noiseStrength, strokeWidth, agentWidthMin, agentWidthMax, zNoiseVelocity);
    }
  }

  p.draw = function() {
    p.fill(0, 0, 100, overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // Draw agents
    p.stroke(0, agentAlpha);
    for (var i = 0; i < agentCount; i++) {
      if (drawMode == 1) {
        agents[i].update1();
      } else {
        agents[i].update2();
      }
    }
  }

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == '1') drawMode = 1;
    if (p.key == '2') drawMode = 2;
    if (p.key == ' ') {
      var newNoiseSeed = p.floor(p.random(10000));
      console.log('newNoiseSeed', newNoiseSeed);
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode == p.DELETE || p.keyCode == p.BACKSPACE) p.background(255);
  }

};

var myp5 = new p5(sketch);
