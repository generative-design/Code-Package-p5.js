// M_1_3_01.pde
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
 * draws a chart based on noise values.
 *
 * MOUSE
 * position x          : specify noise input range
 * click               : new noise line
 *
 * KEYS
 * s                   : save png
 */


var sketch = function( p ) {

  p.setup = function() {
    p.createCanvas(1024,256);
    p.strokeWeight(1);
    p.strokeJoin(p.ROUND);
  };

  p.draw = function() {
    p.background(255);

    // line
    p.stroke(0,130,164);
    p.noFill();

    var noiseXRange = p.mouseX / 10;
    console.log('noiseXRange: 0 - ' + noiseXRange);

    p.beginShape();
    for (var x = 0; x < p.width; x += 10) {
      var noiseX = p.map(x, 0, p.width, 0, noiseXRange);
      var y = p.noise(noiseX) * p.height;
      p.vertex(x,y);
    };
    p.endShape();

    // dots
    p.noStroke();
    p.fill(0);

    for (var x = 0; x < p.width; x += 10) {
      var noiseX = p.map(x, 0, p.width, 0, noiseXRange);
      var y = p.noise(noiseX) * p.height;
      p.ellipse(x,y,3,3);
    }
  };

  p.mousePressed = function() {
    p.noiseSeed(p.random(100000));
  }

  p.keyReleased = function(){
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
  }

};

var myp5 = new p5(sketch);




