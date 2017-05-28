/**
 * Use a video to check on/off a grid of checkmyboxes
 * Shout out to Dan Shiffman's checkbox mirror example
 *
 *
 * SLIDER
 * drag                : drag the slider to adjust the image threshold
 */
"use strict";

var video;

var slider;

var cols = 30;
var rows = 30;

const myboxes = [];

function preload(){
  video = createVideo('data/ball.mov');
}

function setup() {
  noCanvas();
  pixelDensity(1);

  video.size(cols, rows);
  slider = createSlider(0, 255, 200);

  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      myboxes.push(box);
    }
    var linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }

  video.loop();
}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + (y * video.height))*4;
      // var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r+g+b)/3;

      var threshold = slider.value();

      var checkIndex = x + y * cols;

      if(myboxes[checkIndex] == undefined){
        break;
      }

      if(myboxes){
        if (bright > threshold) {
          myboxes[checkIndex].checked(false);
        } else {
          myboxes[checkIndex].checked(true);
        }
      }

    }
  }
}
