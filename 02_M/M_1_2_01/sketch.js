// M_1_2_01.pde
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
 * order vs random!
 * how to interpolate beetween a free composition (random) and a circle shape (order)
 *
 * MOUSE
 * position x          : fade between random and circle shape
 *
 * KEYS
 * s                   : save png
 */


var sketch = function( p ) {

  var actRandomSeed = 0;
  var count = 150;

  p.setup = function() {
    p.createCanvas(800,800);
    p.cursor(p.CROSS);
    p.noStroke();
    p.fill(0,130,164);
  };

  p.draw = function() {
    p.background(255);

    var faderX = p.mouseX / p.width;

    p.randomSeed(actRandomSeed);
    var angle = p.radians(360/count);
    for (var i = 0; i < count; i++) {
      // positions
      var randomX = p.random(0,p.width);
      var randomY = p.random(0,p.height);
      var circleX = p.width/2+p.cos(angle*i)*300;
      var circleY = p.height/2+p.sin(angle*i)*300;

      var x = p.lerp(randomX,circleX,faderX);
      var y = p.lerp(randomY,circleY,faderX);

      p.ellipse(x,y,11,11);
    };
  };


  p.mousePressed = function() {
    actRandomSeed = p.random(100000);
  }

  p.keyReleased = function(){
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
  }

};

var myp5 = new p5(sketch);




