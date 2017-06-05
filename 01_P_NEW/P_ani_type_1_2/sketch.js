/**
 * Animated type fade away on each character
 *
 * KEYS
 * A-Z
 * CONTROL                  : save png
 */
"use strict";

var textTyped = "Type...!"
var font;
var paths;
var style = 1;
var fontSize = 120;

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

  if(textTyped.length > 0){
    var path
    paths = [];
    // get each character
    textTyped.split('').forEach(function(d, i){

      var fontPath = font.getPath(d, 0, 0, fontSize);
      // convert it to a g.Path object
      path = new g.Path(fontPath.commands);
      // resample it with equidistant points
      path = g.resampleByLength(path, 10);
      paths.push(path);
    })

    paths.forEach(function(d, j){
      push();
      translate(fontSize*0.75 * j, 0);

      for(var i = 0; i < d.commands.length -1; i++){
        push()
        translate(d.commands[i].x, d.commands[i].y);

        if(i%2 ==0){
          var angle = frameCount%360;
        } else{
          var angle = -frameCount%360;
        }

        rotate(radians(angle));
        fill(255);
        stroke(0);
        var rectSize = fontSize*0.1;
        var shiftX1 = mouseX/100 * random(-1, 1);
        var shiftY1 = mouseY/100 * random(-1, 1);
        var shiftX2 = mouseX/100 * random(-1, 1);
        var shiftY2 = mouseY/100 * random(-1, 1);
        var shiftX3 = mouseX/100 * random(-1, 1);
        var shiftY3 = mouseY/100 * random(-1, 1);
        var shiftX4 = mouseX/100 * random(-1, 1);
        var shiftY4 = mouseY/100 * random(-1, 1);

        if(style === 1){
          point(0+shiftX1, 0+shiftY1);
          point(0+rectSize+shiftX2, 0+shiftY2);
          point(0+rectSize+shiftX3, 0+rectSize+shiftY3);
          point(0+shiftX4, 0+rectSize+shiftY4);
        }
        if(style === 2){
          line(0+shiftX2, 0+shiftY2, 0+rectSize+shiftX3, 0+rectSize+shiftY3)
        }
        if(style === 3){
          beginShape();
          vertex(0+shiftX1, 0+shiftY1);
          vertex(0+rectSize+shiftX2, 0+shiftY2);
          vertex(0+rectSize+shiftX3, 0+rectSize+shiftY3);
          vertex(0+shiftX4, 0+rectSize+shiftY4);
          endShape(CLOSE);
        }
        // if(style === 4){
        //   ellipse(0, 0, 10, 10)
        // }

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
    // if(key == "4"){
    //   style = 4;
    // }

    textTyped += key;
  }
  loop();
}
