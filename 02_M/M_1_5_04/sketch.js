// M_1_5_04.pde
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
 * noise values (noise 3d) are used to animate a bunch of agents.
 *
 * KEYS
 * m                   : toogle menu open/close
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
    p.createCanvas(1280, 800);
    p.colorMode(p.HSB, 360, 100, 100, 100);

    for(var i = 0; i < agentCount; i++) {
      agents[i] = new Agent();
    }
  }

  p.draw = function() {
    p.fill(0, 0, 100, overlayAlpha);
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
    this.randomizer = p.random(1);
    this.stepSize = 1 + this.randomizer * 4;
    this.zNoise = p.random(noiseStickingRange);
    this.angle;
    this.color = this.randomizer < 0.5 ? p.color(p.random(170, 190), 70, p.random(100), agentAlpha) : p.color(p.random(40, 60), 70, p.random(100), agentAlpha);
  }

  Agent.prototype.updateStart = function() {
    this.angle = p.noise(this.vector.x / noiseScale, this.vector.y / noiseScale, this.noiseZ) * noiseStrength;

    this.vector.x += p.cos(this.angle) * this.stepSize;
    this.vector.y += p.sin(this.angle) * this.stepSize;

    if (this.vector.x < -10) this.vector.x = this.vectorOld.x = p.width + 10;
    if (this.vector.x > p.width + 10) this.vector.x = this.vectorOld.x = -10;
    if (this.vector.y < - 10) this.vector.y = this.vectorOld.y = p.height + 10;
    if (this.vector.y > p.height + 10) this.vector.y = this.vectorOld.y = -10;
  }

  Agent.prototype.updateEnd = function() {
      this.vectorOld = this.vector.copy();

      this.noiseZ += zNoiseVelocity;
  }

  Agent.prototype.update1 = function() {
    this.updateStart();

    p.stroke(this.color);
    p.strokeWeight(strokeWidth);
    p.line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);

    var agentWidth = p.lerp(agentWidthMin, agentWidthMax, this.randomizer);
    p.push();
    p.translate(this.vectorOld.x, this.vectorOld.y);
    p.rotate(p.atan2(this.vector.y - this.vectorOld.y, this.vector.x - this.vectorOld.x));
    p.line(0, -agentWidth, 0, agentWidth);
    p.pop();

    this.updateEnd();
  }

  Agent.prototype.update2 = function() {
    this.updateStart();

    p.stroke(this.color);
    p.strokeWeight(2);
    var agentWidth = p.lerp(agentWidthMin, agentWidthMax, this.randomizer) * 2;
    p.ellipse(this.vectorOld.x, this.vectorOld.y, agentWidth, agentWidth);

    this.updateEnd();
  }

};

var myp5 = new p5(sketch);
