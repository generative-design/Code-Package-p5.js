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

var font;

var textTyped = "TYPE & CODE"
var drawMode = 1;
var fontSize = 250;
var padding = 10;
var drawMode = 1;
var xoff = 0.0;
var yoff = 10000;
var pointDensity= 6;

var colors;

var paths;
var textG;

function preload() {
  font = loadFont("data/FiraSansCompressed-Bold.otf");
  //font = loadFont("data/FiraSansCompressed-Regular.otf");
  //font = loadFont("data/FiraSansCompressed-Light.otf");
}

function setup() {
  createCanvas(1600, 800);
  frameRate(25);
  rectMode(CENTER);

  colors = [color(51, 204, 51), color(44, 168, 232), color(229, 25, 42)];
  pixelDensity(1);

  // create an offscreen graphics object to draw the text into
  textG = createGraphics(width, height);
  updateText();
}

function updateText() {
  textG.pixelDensity(1);
  textG.background(255);
  textG.textFont(font);
  textG.textSize(fontSize)
  textG.text(textTyped, 100, fontSize + 50);
  textG.loadPixels();
}

function draw() {
  background(255);

  xoff++;
  yoff++;

  for (var x = 0; x < width; x += pointDensity) {
    for (var y = 0; y < height; y += pointDensity) {
      // Calculate the index for the pixels array from x and y
      var index = (x + y * textG.width) * 4;
      // Get the red value from image
      var r = textG.pixels[index];

      if (r < 128) {

        if(drawMode == 1){
          strokeWeight(1);
          var num = noise((x+xoff)/10, y/10);
          if (num < 0.6) {
            stroke(colors[0]);
          } else if (num < 0.7) {
            stroke(colors[1]);
          } else {
            stroke(colors[2]);
          }
          push();
          translate(x, y);
          rotate(radians(frameCount % 360));
          line(0, 0, fontSize / 4, 0);
          pop();
        }

        if(drawMode ==2){
          stroke(0, 0, 0);
          strokeWeight(1);
          noStroke();
          push();
          translate(x, y);

          var num = noise((x+xoff)/10, y/10);
         
          if (num < 0.6) {
            fill(colors[0]);
          } else if (num < 0.7) {
            fill(colors[1]);
          } else {
            fill(colors[2]);
          }

          var w = noise((x-xoff)/10, (y+yoff*0.1)/10) * 20;
          var h = noise((x-xoff)/10, (y+yoff*0.1)/10) * 10;
          ellipse(0, 0, w, h); // rect() is cool too
          pop();
        }

        if(drawMode ==3){
          stroke(0, 0, 0);
          strokeWeight(1);
          noStroke();

          var num = random(1);

          if (num < 0.6) {
            fill(colors[0])
          } else if (num < 0.7) {
            fill(colors[1])
          } else {
            fill(colors[2])
          }

          push();
          beginShape();
          for(var i =0; i < 3; i ++){
          var ox = noise((i*1000 + x-xoff)/30, (i*3000 + y+yoff)/30) * pointDensity*6;
          var oy = noise((i*2000 + x-xoff)/30, (i*4000 + y+yoff)/30) * pointDensity*6;
            vertex(x + ox, y + oy);
          }
          endShape(CLOSE)
          pop();
        }

        if(drawMode ==4){
          var num = random(1);

          if (num < 0.6) {
            stroke(colors[0]);
          } else if (num < 0.7) {
            stroke(colors[1]);
          } else {
            stroke(colors[2]);
          }

          strokeWeight(3);
          point(x-10, y-10);
          point(x, y);
          point(x+10, y+10);
          randomSeed(frameCount);
          for(var i = 0; i < 5; i++){
            if(i%2 ==0){
              point(x + round(random(0, 10)), y + round(random(0, 10)))
            }else{
              point(x - round(random(0, 10)), y - round(random(0, 10)))
            }
          }
        }

      }
    }
  }


}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    textTyped = textTyped.substring(0,max(0,textTyped.length-1));
    updateText();
  } 
  if (keyCode === ENTER || keyCode === RETURN) {
    // do nothing
    //console.log("enter!")
  }
  if (keyCode === LEFT_ARROW) {
    drawMode--;
    if (drawMode < 1) drawMode = 4;
  }
  if (keyCode === RIGHT_ARROW) {
    drawMode++;
    if (drawMode > 4) drawMode = 1;
  }
  if (keyCode === DOWN_ARROW) {
    pointDensity--;
    if (pointDensity < 4) pointDensity = 4;
  }
  if (keyCode === UP_ARROW) {
    pointDensity++;
  }

}

function keyTyped() {
  if (keyCode >= 32){
    textTyped += key;
    updateText();
  }
}

