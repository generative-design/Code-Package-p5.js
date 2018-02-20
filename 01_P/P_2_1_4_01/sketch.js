// P_2_1_4_01
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
* Use an image to check on/off a grid of checkboxes
* Shout out to Dan Shiffman's checkbox mirror example
* Image credits: Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.
*
* KEYS
* 1                   : load image shapes
* 2                   : load image letters
* 3                   : load image map
*
* SLIDER
* drag                : drag the slider to adjust the image threshold
*
* CONTRIBUTED BY
* [Joey Lee](http://jk-lee.com)
*
* INSPIRED BY
* [Dan Shiffman](http://shiffman.net/)
*/

'use strict';

var img;
var img1;
var img2;
var img3;
var slider;
var cols = 40;
var rows = 40;
var boxes;
var boxHolder;

// preload the images to be used for the checkboxes
function preload(){
  img1 = loadImage('data/shapes.png');
  img2 = loadImage('data/draw.png');
  img3 = loadImage('data/toner.png');
}

function setup() {
  // the html dom elements are not rendered on canvas
  noCanvas();
  // set pixel density to 1
  pixelDensity(1);
  boxHolder = createDiv('');
  boxHolder.id('mirror');

  boxes = [];

  // set the current img
  img = img1;
  img.resize(cols, rows);
  img.loadPixels();

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    var linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }

  // add a slider to adjust the pixel threshold
  slider = createSlider(0, 255, 0);
}

function draw() {
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.height; x++) {
      var c = color(img.get(x, y));
      var bright = (red(c) + green(c) + blue(c)) / 3;

      // get the threshold from the slider
      var threshold = slider.value();

      var checkIndex = x + y * cols;

      if (bright > threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
}

function keyPressed() {
  if (key == '1') img = img1;
  if (key == '2') img = img2;
  if (key == '3') img = img3;

  img.resize(cols, rows);
  img.loadPixels();
}
