/**
 * Use sliders to generate a grid of adjustable shapes
 *
 * MOUSE
 *
 * DRAG                : drag the handles to adjust the size of the slider
 *
 * KEYS
 * s                   : save png
 */
"use strict";

const mySliders = [];
var sliderWidth = 50;
var sliderHeight = 20;
var xoff = 0;

function setup() {
  createCanvas(800,800);
  rectMode(CENTER);

  var counter = 0;
  for (var x = 0; x < width - sliderWidth; x +=sliderWidth){
    for (var y = sliderHeight; y < height - sliderHeight; y +=sliderHeight){
      xoff = xoff + 100;
      var n = noise(xoff) * sliderHeight;

      mySliders[counter] = new MySlider(x, y, sliderWidth, sliderHeight, int(n)) ;
      mySliders[counter].create();
      counter++;
    }
  }
}

function draw() {
  background(255);

  // loop through each slider and update if changes are made
  mySliders.forEach(function(d){
    d.update();
  })
}


function MySlider(_x, _y, _sWidth, _sHeightUpper, _val){

  var thisSlider,
    x = _x,
    y = _y,
    sWidth = _sWidth,
    padding = 8,
    sHeight = 19,
    sHeightLower= 1,
    sHeightUpper= _sHeightUpper,
    val = _val;

  this.create = function(){
    thisSlider = createSlider(sHeightLower, sHeightUpper, val)
    thisSlider.style("width", sWidth +"px")
    thisSlider.position(x,y);
  }

  this.update = function(){
    fill(0,0,0);
    noStroke();

    // adjust the "slider track"
    push();
    translate(x+sWidth/2 +padding, y + sHeight/2);
    // rect(0, 0, sWidth, thisSlider.value());
    ellipse(0, 0, sWidth, thisSlider.value());
    pop();

    // adjust the slider handle
    fill(255);
    push();
    // use an ellipse for the handle
    // var handleX = map(thisSlider.value(), sHeightLower, sHeightUpper, x + padding,  x+sWidth - thisSlider.value()/2 + padding)
    // ellipse(0,0, thisSlider.value() ,thisSlider.value() )

    // use a rectangle for the handle
    var handleWidth = 4;
    var handleX = map(thisSlider.value(), sHeightLower, sHeightUpper, x + padding,  x+sWidth - handleWidth/2 + padding)
    translate(handleX, y + sHeight/2);
    rect(0, 0, handleWidth, thisSlider.value())
    pop();

  }
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
