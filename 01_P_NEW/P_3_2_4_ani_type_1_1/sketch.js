/**
 * Animated type fade away text
 *
 * KEYS
 * CONTROL                   : save png
 * A-Z
 * 1                         : animated circles
 * 2                         : animated squares
 * 3                         : animated lines
 * left arrow                : remove the letter
 *
 * CONTRIBUTED BY
 * [Joey Lee](http://jk-lee.com)
 */
"use strict";

var textTyped;
var textTypedCounter;
var font;
var fontSize;
var style;
var path;
var ranges;
var breaks;
var counter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  // assign globals
  textTyped = [];
  textTyped.push("Type...!");
  textTypedCounter = 0;
  fontSize = 120;
  style = 1;
  ranges = [];
  counter = 0;

  rectMode(CENTER);

  opentype.load('../../data/FreeSans.otf', function(err, f) {
    if (err) {
      print('Font could not be loaded: ' + err);
    } else {
      font = f;
      loop();
    }
  });
}


// create an array of strings
// each string is the line
// if enter is pressed, create a new string,
// and move to a new line by editing the svg "m" values

function draw() {
  // noLoop();
  if (!font) return;
  background(255, 255, 255, 20);
  // margin border
  translate(20,220);

  fill(0);

  textTyped.forEach(function(txt, lineNum){
    if (txt.length > 0) {
      // get a path from OpenType.js
      var fontPath = font.getPath(txt, 0, 0, fontSize);
      // convert it to a g.Path object
      path = new g.Path(fontPath.commands);
      // resample it with equidistant points
      path = g.resampleByLength(path, 1);


      var pathsCount = path.commands.length;
      breaks = pathsCount / txt.length;

      ranges = [];
      for(var i = 0; i < pathsCount-1; i+=breaks){
        ranges.push({start:floor(i)});
      }

      ranges.forEach(function(d){
        if(counter < breaks){
          var cmd = path.commands[counter+d.start];
          var ocmd = path.commands[ceil(breaks) - counter + d.start];
          if(style == 1){
            ellipse(cmd.x, cmd.y + (lineNum*fontSize), fontSize*0.10, fontSize*0.10);
          }
          if(style == 2){
           rect(cmd.x, cmd.y + (lineNum*fontSize), fontSize*0.10, fontSize*0.10);
          }
          if(style == 3){
            line(cmd.x, cmd.y+ (lineNum*fontSize), ocmd.x , ocmd.y+ (lineNum*fontSize));
          }

          counter++;
        } else{
          counter=0;
        }

      })
    }
  })

}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE || keyCode === LEFT_ARROW) {
    textTyped = textTyped.substring(0,max(0,textTyped.length-1));

    // remove the last letter and destroy each string in the array
    // until you kill all the strings
  } else if (keyCode === TAB || keyCode === ENTER || keyCode === RETURN || keyCode === ESCAPE) {
    // do nothing
    console.log("enter!")
    textTyped.push("");
    textTypedCounter++;
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

    textTyped[textTypedCounter] += key;
  }
  loop();
}
