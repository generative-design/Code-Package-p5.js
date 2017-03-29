// P_5_1_4_01_sliders
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
 * short description
 *
 * MOUSE
 * left click               : create SliderRose
 *
 *
 * KEYS
 * s                   : save png
 */

'use strict';

var sliders = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // init canvas with slider rose to the middle
  sliders.push(new SliderRose(width/2, height/2));
}

function draw() {
  // create slider animations
  sliders.forEach(function(d){
    d.update();
  });

}

// add a new slider rose when mouse pressed
function mousePressed(){
  sliders.push(new SliderRose(mouseX, mouseY));
}

// define a SliderRose object
function SliderRose(_x, _y){
  this.x1 = _x;
  this.y1 = _y;
  var sliders = [];
  this.sliderBackgrounds = [];
  var sinAngle = 0;

  var counter = 0;
  var skip = 20;
  var roseRadius = random(20, 100);

  for(var i =0; i < 360; i+=skip){
    var sliderAngle = radians(i);
    var x2 = cos(sliderAngle)*roseRadius;
    var y2 = sin(sliderAngle)*roseRadius;

    sliders[counter] = createSlider(0, 255, 50)
    sliders[counter].position(this.x1 + x2, this.y1 + y2);
    sliders[counter].style('width', roseRadius +'px')
    sliders[counter].style('transform', 'rotate('+i+'deg)');
    counter++;

  }

  this.update = function(){
    var offset = 0;

    for(var i = 0; i < sliders.length; i++){
      var x = map(sin(sinAngle + offset), -1, 1, 0, 255);
      sliders[i].value(x);
      offset += 0.050;
    }

    sinAngle += 0.1;

  }

}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
