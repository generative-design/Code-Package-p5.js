/**
 * Animated type fade away on each character
 *
 * MOUSE
 * position x/y             : affect randomness
 *
 * KEYS
 * A-Z                      : type letters
 * 1-5                      : toggle through type styles
 * CONTROL                  : save png
 *
 */
"use strict";

var textTyped = "TYPE...!"
var font;
var paths;
var lineHeight;
var style = 1;
var fontSize = 120;
var padding = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  rectMode(CENTER);


  opentype.load('data/FreeSans.otf', function(err, f) {
    if (err) {
      print('Font could not be loaded: ' + err);
    } else {
      font = f;
      loop();
    }
  });
}


function draw() {
  // noLoop();
  if (!font) return;
  background(255, 255, 255, 20);
  // margin border
  translate(20,220);

  fill(0);

  if(textTyped.length > 0){
    var path;
    paths = [];
    // get each character
    textTyped.split('').forEach(function(d, i){

      var fontPath = font.getPath(d, 0, 0, fontSize);
      // convert it to a g.Path object
      path = new g.Path(fontPath.commands);
      // resample it with equidistant points
      path = g.resampleByLength(path, 6);
      paths.push(path);
    })

    paths.forEach(function(d, j){
      var xs = [];
      var ys = [];
      var xMin;
      var xMax;
      var yMin;
      var yMax;

      d.commands.forEach(function(coord){
        if(coord.x != undefined && coord.y != undefined){
          xs.push(coord.x);
          ys.push(coord.y);
        }
      })

      xMax = xs.reduce(function(a, b) {
          return Math.max(a, b);
      });
      xMin = xs.reduce(function(a, b) {
          return Math.min(a, b);
      });
      yMax = ys.reduce(function(a, b) {
          return Math.max(a, b);
      });
      yMin = ys.reduce(function(a, b) {
          return Math.min(a, b);
      });


      // push();
      translate((xMax - xMin)/2 + fontSize/2 + padding, 0);

      for(var i = 0; i < d.commands.length -1; i+=1){
        if(i%2 ==0){
          var angle = frameCount%360;
        } else{
          var angle = -frameCount%360;
        }

        fill(255);
        stroke(0);
        var rectSize = fontSize*0.05;
        var shiftX1 = mouseX/100 * random(-1, 1);
        var shiftY1 = mouseY/100 * random(-1, 1);
        var shiftX2 = mouseX/100 * random(-1, 1);
        var shiftY2 = mouseY/100 * random(-1, 1);
        var shiftX3 = mouseX/100 * random(-1, 1);
        var shiftY3 = mouseY/100 * random(-1, 1);
        var shiftX4 = mouseX/100 * random(-1, 1);
        var shiftY4 = mouseY/100 * random(-1, 1);

        if(style === 1){
          push()
          translate(d.commands[i].x, d.commands[i].y);
          rotate(radians(angle));
          point(0+shiftX1, 0+shiftY1);
          point(0+rectSize+shiftX2, 0+shiftY2);
          point(0+rectSize+shiftX3, 0+rectSize+shiftY3);
          point(0+shiftX4, 0+rectSize+shiftY4);
          pop();
        }
        if(style === 2){
          push()
          translate(d.commands[i].x, d.commands[i].y);
          rotate(radians(0));
          line(0+shiftX2, 0+shiftY2, 0+rectSize+shiftX3, 0+rectSize+shiftY3)
          pop();
        }
        if(style === 3){
          push()
          translate(d.commands[i].x, d.commands[i].y);
          rotate(radians(angle));
          beginShape();
          vertex(0+shiftX1, 0+shiftY1);
          vertex(0+rectSize+shiftX2, 0+shiftY2);
          vertex(0+rectSize+shiftX3, 0+rectSize+shiftY3);
          vertex(0+shiftX4, 0+rectSize+shiftY4);
          endShape(CLOSE);
          pop();
        }
        if(style === 4){
          push();
          translate(d.commands[i].x, d.commands[i].y);
          rotate(radians(angle));
          fill(0);
          noStroke();
          ellipse(0+shiftX2, 0+shiftY2, rectSize/2, rectSize/2);
          pop();

          strokeWeight(0.1);
          line((xMin+xMax)/2, (yMax+yMin)/2,d.commands[i].x, d.commands[i].y );
        }
        if(style === 5){
          push()
          translate(d.commands[i].x, d.commands[i].y);
          line(0, 0, 0+map(mouseX, 0, width, -100, 100), 0+map(mouseY, 0, height, -100, 100))
          pop();
        }
        pop();
      }
      pop();
    })

  }

}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE || keyCode === LEFT_ARROW) {
    textTyped = textTyped.substring(0,max(0,textTyped.length-1));
    background(255);
  } else if (keyCode === TAB || keyCode === ENTER || keyCode === RETURN || keyCode === ESCAPE) {
    // do nothing
    console.log("enter!")
  } else {
    if(key == "1"){
      style = 1;
    }
    else if(key == "2"){
      style = 2;
    }
    else if(key == "3"){
      style = 3;
    }
    else if(key == "4"){
      style = 4;
    }
    else if(key == "5"){
      style = 5;
    } else if((keyCode >= 65 && keyCode <= 90)){
      textTyped += key;
    } else{
      console.log("not usable");
    }
  }
  loop();
}
