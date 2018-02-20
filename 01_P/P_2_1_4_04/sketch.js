// P_2_1_4_04
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
 * Create animated radial sliders
 *
 * MOUSE
 * left click               : create SliderRose
 *
 * CONTRIBUTED BY
 * [Joey Lee](http://jk-lee.com)
 *
 * INSPIRED BY
 * [Dan Shiffman](http://shiffman.net/)
 */

'use strict';

var sliders;

function setup() {
  sliders = [];
  createCanvas(windowWidth, windowHeight);
  // init canvas with slider rose to the middle
  sliders.push(new SliderRose(width/2, height/2));
}

function draw() {
  background(101, 179, 109);
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
  // collect the sliders in an array
  var sliders = [];
  var sinAngle = 0;
  // create a counter to index the sliders
  var counter = 0;
  // set the slider width
  var roseRadius = random(20, 100);
  // define how many degrees to skip from 360
  var skip = 20;
  // create sliders around a circle
  for(var i =0; i < 360; i+=skip){
    var sliderAngle = radians(i);
    var x2 = cos(sliderAngle)*roseRadius;
    var y2 = sin(sliderAngle)*roseRadius;
    // create the slider, position, and rotate
    sliders[counter] = createSlider(0, 255, 50)
    sliders[counter].position(this.x1 + x2, this.y1 + y2);
    sliders[counter].style('width', roseRadius +'px')
    sliders[counter].style('transform', 'rotate('+i+'deg)');
    counter++;

  }

  // for each loop through the draw function
  // update the sliders according to a sin wave
  this.update = function(){
    var offset = 0;
    for(var i = 0; i < sliders.length; i++){
      // map the value along the sine wave to the slider values
      var x = map(sin(sinAngle + offset), -1, 1, 0, 255);
      sliders[i].value(x);
      offset += 0.050;
    }
    sinAngle += 0.1;
  }

}


