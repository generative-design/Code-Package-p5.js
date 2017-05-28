/**
 * Animated type fade away text
 *
 * KEYS
 * s                   : save png
 */
"use strict";

var textTyped = "Type ...!"
var font;
var fontSize = 120;
var style = 1;

var path;
var ranges = [];
var breaks;

var counter = 0;

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
  if (!font) return;
  background(255, 255, 255, 20);
  // margin border
  translate(20,220);

  fill(0);
  // noStroke();

  if (textTyped.length > 0) {
    // get a path from OpenType.js
    var fontPath = font.getPath(textTyped, 0, 0, fontSize);
    // convert it to a g.Path object
    path = new g.Path(fontPath.commands);
    // resample it with equidistant points
    path = g.resampleByLength(path, 1);

    var pathsCount = path.commands.length;
    breaks = pathsCount / textTyped.length;

    ranges = [];
    for(var i = 0; i < pathsCount-1; i+=breaks){
      ranges.push({start:floor(i)});
    }

    ranges.forEach(function(d){
      if(counter < breaks){
        var cmd = path.commands[counter+d.start];
        var ocmd = path.commands[ceil(breaks) - counter + d.start];
        if(style == 1){
          ellipse(cmd.x, cmd.y, fontSize*0.10, fontSize*0.10);
        }
        if(style == 2){
         rect(cmd.x, cmd.y, fontSize*0.10, fontSize*0.10);
        }
        if(style == 3){
          line(cmd.x, cmd.y, ocmd.x , ocmd.y);
        }

        counter++;
      } else{
        counter=0;
      }

    })
  }
}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE || keyCode === LEFT_ARROW) {
    textTyped = textTyped.substring(0,max(0,textTyped.length-1));
  } else if (keyCode === TAB || keyCode === ENTER || keyCode === RETURN || keyCode === ESCAPE) {
    // do nothing
  } else {
    if(key == "1"){
      style = 1;
    }
    if(key == "2"){
      style = 2;
    }
    if(key == "3"){
      style = 3;
    }

    textTyped += key;
  }
  loop();
}
