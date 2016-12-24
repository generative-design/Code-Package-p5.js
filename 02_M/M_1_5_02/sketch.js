// M_1_5_02.pde
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
 * noise values (noise 2d) are used to animate a bunch of agents.
 *
 * KEYS
 * m                   : toogle menu open/close
 * 1-2                 : switch noise mode
 * space               : new noise seed
 * backspace           : clear screen
 * s                   : save png
 */
'use strict';

var sketch = function( p ) {

  var agents = [];
  var agentCount = 4000;
  var noiseScale = 300;
  var noiseStrength = 10;
  var overlayAlpha = 10;
  var agentAlpha = 90;
  var strokeWidth = 0.3;
  var drawMode = 1;

  p.setup = function() {
    p.createCanvas(1280, 800);

    for(var i = 0; i < agentCount; i++) {
      agents[i] = new Agent();
    }
  }

  p.draw = function() {
    p.fill(255, overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // Draw agents
    p.stroke(0, agentAlpha);
    for (var i = 0; i < agentCount; i++) {
      if (drawMode === 1) {
        agents[i].update1();
      } else {
        agents[i].update2();
      }
    }
  }

  p.keyReleased = function() {
    if (p.key === 's' || p.key === 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key === '1') drawMode = 1;
    if (p.key === '2') drawMode = 2;
    if (p.key === ' ') {
      var newNoiseSeed = p.floor(p.random(10000));
      console.log('newNoiseSeed', newNoiseSeed);
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode === p.DELETE || p.keyCode === p.BACKSPACE) p.background(255);
  }

  var Agent = function() {
    this.vector = p.createVector(p.random(p.width), p.random(p.height));
    this.vectorOld = this.vector.copy();
    this.stepSize = p.random(1, 5);
    this.isOutside = false;
    this.angle;
  }

  Agent.prototype.update = function() {
    this.vector.x += p.cos(this.angle) * this.stepSize;
    this.vector.y += p.sin(this.angle) * this.stepSize;

    this.isOutside = this.vector.x < 0 || this.vector.x > p.width || this.vector.y < 0 || this.vector.y > p.height;

    if (this.isOutside) {
      this.vector.set(p.random(p.width), p.random(p.height));
      this.vectorOld = this.vector.copy();
    }

    p.strokeWeight(strokeWidth * this.stepSize);
    p.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);

    this.vectorOld = this.vector.copy();

    this.isOutside = false;
  }

  Agent.prototype.update1 = function() {
    this.angle = p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;

    this.update();
  }

  Agent.prototype.update2 = function() {
    this.angle = p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
    this.angle = (this.angle - p.floor(this.angle)) * noiseStrength;

    this.update();
  }

};

var myp5 = new p5(sketch);
