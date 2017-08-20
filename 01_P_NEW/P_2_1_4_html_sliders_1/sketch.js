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
"use strict";
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
  sliderWidth = w/2;
  sliderCount = ceil(sliderWidth/sliderHeight)

  noLoop();
}

function draw() {
  background(255);

  // topleft - horizontal
  for(var i = 0; i <= sliderCount; i++){
    var sval = map( i, sliderCount,0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
      .position(padding, i*sliderHeight + padding)
      .style("width", sliderWidth+"px");
  }

  // bottomright - horizontal
  for(var i = 0; i <= sliderCount; i++){
    var sval = map( i, sliderCount,0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
      .position(sliderWidth + padding*3, sliderWidth + padding*2 + i*sliderHeight)
      .style("width", sliderWidth+"px");
  }

  // topright - vertical
  for(var i = 0; i <= sliderCount; i++){
    var sval = map( i, 0,sliderCount, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
      .position(sliderWidth/2 + padding*2 + i*sliderHeight, sliderWidth/2 + padding)
      .style("width", sliderWidth+"px").style('transform', 'rotate('+90+'deg)');
  }

  // bottomleft - vertical
  for(var i = 0; i <= sliderCount; i++){
    var sval = map( i, sliderCount,0, sliderMin, sliderMax);
    createSlider(sliderMin, sliderMax, sval)
      .position(sliderWidth/2 - i*sliderHeight + padding*2, sliderWidth + sliderWidth/2 + padding*3)
      .style("width", sliderWidth+"px").style('transform', 'rotate('+90+'deg)');
  }

}

