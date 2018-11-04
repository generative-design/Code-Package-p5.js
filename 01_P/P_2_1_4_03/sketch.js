// P_2_1_4_03
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
 * Sliders arranged in a pattern
 *
 * DRAG                  : move the sliders around
 *
 * CONTRIBUTED BY
 * [Joey Lee](http://jk-lee.com)
 *
 * INSPIRED BY
 * [Dan Shiffman](http://shiffman.net/)
 */
'use strict';
var w = 600;
var h = 600;
var sliderCount;
var sliderWidth;
var sliderHeight = 17;
var padding = 10;

var sliderMin = 0;
var sliderMax = 100;

function setup() {
  createCanvas(800,800);
  // get the number of sliders based on w & h
  sliderWidth = w / 2;
  sliderCount = ceil(sliderWidth / sliderHeight);

  noLoop();
}

function draw() {
  background(48, 58, 118);

  // topleft - horizontal
  for (var i = 0; i <= sliderCount; i++){
    var sval = map(i, sliderCount,0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
      .position(padding, i * sliderHeight + padding)
      .style('width', sliderWidth + 'px');
  }

  // bottomright - horizontal
  for (var i = 0; i <= sliderCount; i++){
    var sval = map(i, sliderCount,0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
      .position(sliderWidth + padding * 3, sliderWidth + padding * 2 + i * sliderHeight)
      .style('width', sliderWidth + 'px');
  }

  // topright - vertical
  for (var i = 0; i <= sliderCount; i++){
    var sval = map(i, 0,sliderCount, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
      .position(sliderWidth / 2 + padding * 2 + i * sliderHeight, sliderWidth / 2 + padding)
      .style('width', sliderWidth + 'px').style('transform', 'rotate(' + 90 + 'deg)');
  }

  // bottomleft - vertical
  for (var i = 0; i <= sliderCount; i++){
    var sval = map(i, sliderCount,0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
      .position(sliderWidth / 2 - i * sliderHeight + padding * 2, sliderWidth + sliderWidth / 2 + padding * 3)
      .style('width', sliderWidth + 'px').style('transform', 'rotate(' + 90 + 'deg)');
  }

}

