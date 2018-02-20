// P_2_1_4_02
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
 * Use a video to check on/off a grid of checkboxes
 * Shout out to Dan Shiffman's checkbox mirror example
 *
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

var video;
var slider;
var cols = 40;
var rows = 40;
var boxes;
var boxHolder;

function preload(){
  video = createVideo('data/ball.mov');
}

function setup() {
  noCanvas();
  pixelDensity(1);

  boxHolder = createDiv('');
  boxHolder.id('mirror');

  boxes = [];

  video.size(cols, rows);
  // slider threshold at 200
  slider = createSlider(0, 255, 200);

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
  // play the video in a loop
  video.loop();
}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      // get the video pixel location
      var index = (x + (y * video.height)) * 4;
      var r = video.pixels[index];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var bright = (r + g + b) / 3;

      var threshold = slider.value();

      var checkIndex = x + y * cols;

      if (bright > threshold - 1) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
}
