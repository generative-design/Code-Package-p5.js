// M_1_5_01
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
 * how to transform noise values into directions (angles) and brightness levels
 *
 * MOUSE
 * position x/y        : specify noise input range
 *
 * KEYS
 * d                   : toogle display brightness circles on/off
 * arrow up            : noise falloff +
 * arrow down          : noise falloff -
 * arrow left          : noise octaves -
 * arrow right         : noise octaves +
 * space               : new noise seed
 * s                   : save png
 */
'use strict';

var sketch = function(p) {

  var octaves = 4;
  var falloff = 0.5;

  var tileSize = 40;
  var gridResolutionX;
  var gridResolutionY;
  var debugMode = true;
  var arrow;

  p.preload = function() {
    // preload svg
    arrow = p.loadImage('data/arrow.svg');
  };

  p.setup = function() {
    p.createCanvas(800,800);
    p.cursor(p.CROSS);
    gridResolutionX = p.round(p.width / tileSize);
    gridResolutionY = p.round(p.height / tileSize);
    p.strokeCap(p.SQUARE);
  };

  p.draw = function() {
    p.background(255);

    p.noiseDetail(octaves,falloff);

    var noiseXRange = p.mouseX / 100;
    var noiseYRange = p.mouseY / 100;

    for (var gY = 0; gY <= gridResolutionY; gY++) {
      for (var gX = 0; gX <= gridResolutionX; gX++) {
        var posX = tileSize * gX;
        var posY = tileSize * gY;

        // get noise value
        var noiseX = p.map(gX, 0, gridResolutionX, 0, noiseXRange);
        var noiseY = p.map(gY, 0, gridResolutionY, 0, noiseYRange);
        var noiseValue = p.noise(noiseX, noiseY);
        var angle = noiseValue * p.TAU;

        p.push();
        p.translate(posX, posY);

        // debug heatmap
        if (debugMode) {
          p.noStroke();
          p.fill(noiseValue * 255);
          p.ellipse(0, 0, tileSize * 0.25, tileSize * 0.25);
        }

        // arc
        p.noFill();
        p.strokeWeight(1);
        p.stroke(0,130,164,100);
        p.arc(0, 0, tileSize * 0.75, tileSize * 0.75, 0, angle);

        // arrow
        p.stroke(0);
        p.strokeWeight(0.75);
        p.rotate(angle);
        p.image(arrow, 0, 0, tileSize * 0.75, tileSize * 0.75);
        p.scale(1,-1); // mirror the other half of arrow shape
        p.image(arrow, 0, 0, tileSize * 0.75, tileSize * 0.75);

        p.pop();
      }
    }

    console.log('octaves: ' + octaves + ' falloff: ' + falloff + ' noiseXRange: 0-' + noiseXRange + ' noiseYRange: 0-' + noiseYRange);
  };

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == 'd' || p.key == 'D') debugMode = !debugMode;
    if (p.key == ' ') p.noiseSeed(p.random(100000));
  };

  p.keyPressed = function() {
    if (p.keyCode == p.UP_ARROW) falloff += 0.05;
    if (p.keyCode == p.DOWN_ARROW) falloff -= 0.05;
    if (falloff > 1) falloff = 1;
    if (falloff < 0) falloff = 0;

    if (p.keyCode == p.LEFT_ARROW) octaves--;
    if (p.keyCode == p.RIGHT_ARROW) octaves++;
    if (octaves < 0) octaves = 0;
  };

};

var myp5 = new p5(sketch);
