/**
* Animated type using loadPixels() method to get font area
*
* MOUSE
* position x/y             : affect randomness
*
* KEYS
* A-Z                      : type letters
* 1-4                      : toggle through type styles
* CONTROL                  : save png
*
* CONTRIBUTED BY
* [Joey Lee](http://jk-lee.com)
*/
"use strict";

var textTyped;
var paths;
var style;
var fontSize;
var padding;
var style;
var xoff;
var yoff;
var pointDensity;

function setup() {
  createCanvas(800, 800);

  // assign globals
  textTyped = "TYPE & CODE"
  style = 1;
  fontSize = 100;
  padding = 10;
  style = 1;
  xoff = 0.0;
  yoff = 10000;
  pointDensity= 6;

  rectMode(CENTER);
}

function draw() {
  background(254);

  translate(0,20);
  if(textTyped.length > 0){
    fill(255, 255, 255);
    noStroke();
    textSize(fontSize)
    text(textTyped, 100, 100);
    loadPixels();

    for (var x = 0; x < width; x+=pointDensity) {
      for (var y = 0; y < height; y+=pointDensity ) {
        // Calculate the 1D location from a 2D grid
        var loc = (x + y*width)*8;
        // Get the R,G,B values from image
        var r,g,b;
         r = pixels[loc];
         g = pixels[loc+1];
         b = pixels[loc+2];

        if (r === 255 && g === 255 && b === 255){

          if(style ==1){
            strokeWeight(1);
            var num = random(1);
            if (num < 0.6) {
              stroke(44, 168, 232);
            } else if (num < 0.7) {
              stroke(253, 201, 36);
            } else {
              stroke(229, 25, 42);
            }
            push();
            translate(x, y);
            rotate(radians(frameCount%360));
            line(fontSize/2, fontSize/2, 0, 0);
            pop();
          }

          if(style ==2){
            stroke(0, 0, 0);
            strokeWeight(1);
            noStroke();
            push();
            translate(x, y);

            var num = random(1);
            var rectWidth;

            if (num < 0.6) {
              fill(44, 168, 232);
              // rectWidth = 4;
            } else if (num < 0.7) {
              fill(253, 201, 36);
              // rectWidth = 10;
            } else {
              fill(229, 25, 42);
              // rectWidth = 15;
            }

            xoff = xoff + .5;
            yoff = yoff + .5;
            var rectWidth = noise(xoff) * 20;
            var rectHeight = noise(yoff) * 10;
            ellipse(0, 0, rectWidth, rectHeight); // rect() is cool too
            pop();
          }

          if(style ==3){
            var num = random(1);

            if (num < 0.6) {
              fill(44, 168, 232)
            } else if (num < 0.7) {
              fill(253, 201, 36)
            } else {
              fill(229, 25, 42)
            }

            push();
            beginShape();
            for(var i =0; i < 12; i ++){
              curveVertex(x+random(i), y+ random(i));
            }
            endShape(CLOSE)
            pop();
          }

          if(style ==4){
            var num = random(1);

            if (num < 0.6) {
              stroke(44, 168, 232);
            } else if (num < 0.7) {
              stroke(253, 201, 36);
            } else {
              stroke(229, 25, 42);
            }

            strokeWeight(3);
            point(x-10, y-10);
            point(x, y);
            point(x+10, y+10);
            randomSeed(frameCount);
            for(var i = 0; i < 5; i++){
              if(i%2 ==0){
                point(x + round(random(0, 10)), y+ round(random(0, 10)))
              }else{
                point(x - round(random(0, 10)), y- round(random(0, 10)))
              }
            }
          }
        }
      }
    }
  }

}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE || keyCode === LEFT_ARROW) {
    textTyped = textTyped.substring(0,max(0,textTyped.length-1));
    background(255);
  } else if (keyCode === RIGHT_ARROW) {
    // do nothing
    textTyped += " ";
    console.log("space!")
  } else if (keyCode === TAB || keyCode === ENTER || keyCode === RETURN || keyCode === ESCAPE) {
    // do nothing
    console.log("enter!")
  } else {
      if(key == "1"){
        style =1;
      }
      if(key == "2"){
        style =2;
      }
      if(key == "3"){
        style =3;
      }
      if(key == "4"){
        style =4;
      }
     if((keyCode >= 65 && keyCode <= 90)){
      textTyped += key;
    }
  }
}
