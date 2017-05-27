/**
 * Use an image to check on/off a grid of checkboxes
 * Shout out to Dan Shiffman's checkbox mirror example
 * Image credits: Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.
 *
 * MOUSE
 * click               : click on the checkboxes
 *
 * KEYS
 * s                   : save png
 *
 * SLIDER
 * drag                : drag the slider to adjust the image threshold
 */
"use strict";

var selected = 1;
var img1;
var img2;
var img3;
var slider;

var cols = 40;
var rows = 40;

var boxes = [];

function preload(){
  img1 = loadImage('data/shapes.png');
  img2 = loadImage('data/draw.png');
  img3 = loadImage('data/toner.png');
}

function setup() {
  noCanvas();
  pixelDensity(1);


  slider = createSlider(0, 255, 0);

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    // var linebreak = createSpan('<br/>');
    // linebreak.parent('mirror');
  }

}

function draw() {
  // noLoop();

  image2boxes();
}


function image2boxes(){
  var img;

  if(selected == 1){
    img = img1;
  }else if(selected == 2){
    img = img2;
  }else{
    img = img3;
  }

  img.resize(cols, rows);


  img.loadPixels();
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.height; x++) {
      var index = (x + (y * img.height))*4;
      var r = img.pixels[index+0];
      var g = img.pixels[index+1];
      var b = img.pixels[index+2];

      var bright = (r+g+b)/3;

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
  if (key == '1') selected = 1;
  if (key == '2') selected = 2;
  if (key == '3') selected = 3;
}

