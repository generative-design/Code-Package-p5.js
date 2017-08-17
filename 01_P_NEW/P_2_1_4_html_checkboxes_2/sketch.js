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

"use strict";

var video;
var slider;
var cols = 40;
var rows = 40;
var boxes;

function preload(){
  video = createVideo('data/ball.mov');
}

function setup() {
  noCanvas();
  pixelDensity(1);

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
