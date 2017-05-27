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

var video;

var slider;

var cols = 40;
var rows = 40;

var boxes = [];

function preload(){
  video = createVideo('data/rect2.mov');
}

function setup() {
  noCanvas();
  pixelDensity(1);
  // video = createCapture(VIDEO);
  video.size(cols, rows);
  slider = createSlider(0, 255, 77);

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

  console.log(video.width, video.height);

  video.loop();

}

function draw() {

  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = ( x + y * video.width);
      // var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

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
