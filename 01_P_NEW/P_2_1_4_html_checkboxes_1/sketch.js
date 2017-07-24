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

"use strict";

var img;
var img1;
var img2;
var img3;
var slider;
var cols;
var rows;
var boxes;

function preload(){
  img1 = loadImage('data/shapes.png');
  img2 = loadImage('data/draw.png');
  img3 = loadImage('data/toner.png');
}

function setup() {
  noCanvas();
  pixelDensity(1);

  // assign globals
  cols = 40;
  rows = 40;
  boxes = [];

  img = img1;
  img.resize(cols, rows);
  img.loadPixels();

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style('display', 'inline');
      box.parent('container');
      boxes.push(box);
    }
    var linebreak = createSpan('<br/>');
    linebreak.parent('container');
  }

  slider = createSlider(0, 255, 0);
}

function draw() {
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.height; x++) {
      var c = color(img.get(x, y));
      var bright = (red(c) + green(c) + blue(c)) / 3;

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

