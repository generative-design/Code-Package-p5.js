// M_1_3_03
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
 * creates a texture based on noise values
 *
 * MOUSE
 * position x/y        : specify noise input range
 *
 * KEYS
 * 1-2                 : set noise mode
 * arrow up            : noise falloff +
 * arrow down          : noise falloff -
 * arrow left          : noise octaves -
 * arrow right         : noise octaves +
 * s                   : save png
 */
'use strict';

var sketch = function( p ) {

  var octaves = 4;
  var falloff = 0.5;

  var noiseMode = 1;

  p.setup = function() {
    p.createCanvas(512,512);
    p.cursor(p.CROSS);
  }

  p.draw = function() {
    p.background(0);

    p.noiseDetail(octaves,falloff);

    var noiseXRange = p.mouseX / 10;
    var noiseYRange = p.mouseY / 10;

    for (var x = 0; x < p.width; x++) {
      for (var y = 0; y < p.height; y++) {
        var noiseX = p.map(x, 0, p.width, 0, noiseXRange);
        var noiseY = p.map(y, 0, p.height, 0, noiseYRange);

        var noiseValue = 0;
        if (noiseMode == 1) {
          noiseValue = p.noise(noiseX, noiseY) * 255;
        } else if (noiseMode == 2) {
          var n = p.noise(noiseX, noiseY) * 24;
          noiseValue = (n - p.floor(n)) * 255;
        }

        p.set(x, y, noiseValue);
      }
    }
    p.updatePixels();

    console.log("octaves: " + octaves + " falloff: " + falloff + " noiseXRange: 0-" + noiseXRange + " noiseYRange: 0-" + noiseYRange);
  }

  p.keyReleased = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == ' ') p.noiseSeed(p.random(100000));
    if (p.key == '1') noiseMode = 1;
    if (p.key == '2') noiseMode = 2;
  }

  p.keyPressed = function() {
    if (p.keyCode == p.UP_ARROW)   falloff += 0.05;
    if (p.keyCode == p.DOWN_ARROW) falloff -= 0.05;
    if (falloff > 1) falloff = 1;
    if (falloff < 0) falloff = 0;

    if (p.keyCode == p.LEFT_ARROW) octaves--;
    if (p.keyCode == p.RIGHT_ARROW) octaves++;
    if (octaves < 0) octaves = 0;
  }

};

var myp5 = new p5(sketch);
