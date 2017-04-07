/**
 * Animated type fade away text
 *
 * MOUSE
 *
 * KEYS
 * s                   : save png
 */
"use strict";

var textTyped = "hello world!"
var font;
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

      if (textTyped.length > 0) {
        // get a path from OpenType.js
        var fontPath = font.getPath(textTyped, 0, 0, 200);
        // convert it to a g.Path object
        path = new g.Path(fontPath.commands);
        // resample it with equidistant points
        path = g.resampleByLength(path, 1);

        var pathsCount = path.commands.length;
        breaks = pathsCount / textTyped.length;

        for(var i = 0; i < pathsCount-1; i+=breaks){
          ranges.push({start:floor(i)});
        }

      }

      loop();
    }
  });



}


function draw() {
  if (!font) return;
  background(255, 255, 255, 50);
  // margin border
  translate(20,220);

  fill(0);
  noStroke();
  ranges.forEach(function(d){
    if(counter < breaks){
      var cmd = path.commands[counter+d.start];
      rect(cmd.x, cmd.y,20, 20);
      counter++;
    } else{
      counter=0;
    }
  })


}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

}
