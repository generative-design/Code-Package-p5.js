// P_3_2_5_03
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Animated type exploring various drawing modes
 *
* MOUSE
* position x/y             : affect randomness
*
* KEYS
* A-Z                      : type letters
* Arrow left/right         : toggle through draw modes
* Arrow up/down            : increase/decrease point density
* CONTROL                  : save png
 *
 * CONTRIBUTED BY
 * [Joey Lee](http://jk-lee.com)
 */
"use strict";

var font;
var fontSize = 120;
// declare your animatedText variable
var myAnimatedText;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noCursor();
  imageMode(CENTER);
  rectMode(CENTER);

  // initialize the animatedType Object
  myAnimatedText = new animatedType();
  // add some text in
  myAnimatedText.textTyped.push(myAnimatedText.addText("TYPE!"));
  myAnimatedText.textTyped.push(myAnimatedText.addText("CODE!"));

  // read in the font to opentype.js
  opentype.load('data/FreeSans.otf', function(err, f) {
    if (err) {
      print('Font could not be loaded: ' + err);
    } else {
      font = f;
      loop();
    }
  });

  // frameRate(1)
}



function draw() {
  // noLoop();
  if (!font) return;
  background(255, 255, 255, 20);
  // background(255, 255, 255);

  // margin border
  translate(20,150);
  fill(0);

  myAnimatedText.getLineCount();
  myAnimatedText.getPaths();
  myAnimatedText.getIndividualPaths();
  myAnimatedText.getCoordinates();

  // draw methods
  if(myAnimatedText.drawMode == 1){
    myAnimatedText.animatedPoints("ellipse");
  }
  if(myAnimatedText.drawMode == 2){
    myAnimatedText.animatedPoints("rect");
  }
  if(myAnimatedText.drawMode == 3){
    myAnimatedText.lines2mouse();
  }
  if(myAnimatedText.drawMode == 4){
    myAnimatedText.radialLines();
  }
  if(myAnimatedText.drawMode == 5){
    myAnimatedText.orbitingPoints("points");
  }
  if(myAnimatedText.drawMode == 6){
    myAnimatedText.wobblyShapes("TRIANGLE_FAN");
  }
  if(myAnimatedText.drawMode == 7){
    myAnimatedText.wobblyShapes("TRIANGLES");
  }
  if(myAnimatedText.drawMode == 8){
    myAnimatedText.outwardLines();
  }



}



function animatedType(){
  var that = this;
  that.textTyped = [];
  that.paths = [];
  that.individualPaths = [];
  that.ranges = [];
  that.lineCount = 0;
  that.letterCoordinates = [];
  that.pointDensity = 2;
  that.startX = 0;
  that.colors = [color(65, 105, 185), color(245, 95, 80), color(15, 233, 118), color(233, 15, 130), color(118, 15, 233), color(  15, 233, 118)];
  that.angle = 0;

  that.drawMode = 8;
  that.style = 1;

  /*
  Data Handling Methods
  */

  // set the lineCount to the number of "lines" or text object in the textTyped Array
  this.getLineCount = function(){
    if(that.textTyped.length > 0){
      that.lineCount = that.textTyped.length -1;
    } else{
      that.lineCount = 0;
    }
  }

  // create a text object to hold each line of text
  // usage: this.textTyped.push(this.addText("hello"))
  this.addText = function(_text){
    var textObject = {counter:0, text:_text}
    return textObject;
  }

  // get the path objects for each line typed
  this.getPaths = function(){
    // clear the paths each loop
    that.paths = [];

    // go though each of the text objects
    that.textTyped.forEach(function(txt, lineNum){
      if(txt.text.length > 0){
          var fontPath = font.getPath(txt.text, 0, 0, fontSize);
          // convert it to a g.Path object
          var path = new g.Path(fontPath.commands);
          // resample it with equidistant points
          path = g.resampleByLength(path, that.pointDensity);
          // console.log(fontPath.getBoundingBox())

          // structure the relevant path data
          var pathData = {
            data: path,
            lineNumber: lineNum,
            len: path.commands.length,
            breaks: floor(path.commands.length / txt.text.length),
            ranges: []
          };

          // get the start point of each letter
          for(var i = 0; i < pathData.len-1; i += pathData.breaks){
            pathData.ranges.push(floor(i));
          }

          that.paths.push(pathData);
      }
    });
  }

  this.getIndividualPaths = function(){
    that.individualPaths = [];

    // go though each of the text objects
    that.textTyped.forEach(function(txt, lineNum){
      if(txt.text.length > 0){
        txt.text.split("").forEach(function(d){
          var fontPath = font.getPath(d, 0, 0, fontSize);
          // convert it to a g.Path object
          var path = new g.Path(fontPath.commands);
          // resample it with equidistant points
          path = g.resampleByLength(path, that.pointDensity);

          // structure the relevant path data
          var pathData = {
            data: path,
            lineNumber: lineNum,
            len: path.commands.length,
            bbox: fontPath.getBoundingBox(),
            distX: 0,
            startX: 0
          };

          // console.log(pathData.bbox.x1)
          pathData.distX = ceil(dist(pathData.bbox.x1, 0, pathData.bbox.x2, 0));

          that.individualPaths.push(pathData);
          })
      }
    });

    // set the startX to zero
    that.startX = 0;
    for(var i = 0; i < that.individualPaths.length-1; i++){
      // if the linenumbers are the same
      if(that.individualPaths[i].lineNumber === that.individualPaths[i+1].lineNumber){
        // then add to the startX and assign it to the individualpath startX
        that.individualPaths[i].startX = that.startX;
        that.startX += that.individualPaths[i].distX + 15;
      } else{
        that.individualPaths[i].startX = that.startX;
        that.startX = 0;
      }
      // when reaching the end
      if(i == that.individualPaths.length-2){
        that.individualPaths[i+1].startX = that.startX;
      }

    }

  }

  // get all the coordinates
  this.getCoordinates = function(){
    // clear the coordinates each loop
    that.coordinates = [];

    // for each of the letters
    that.paths.forEach(function(path, idx){

      path.data.commands.forEach(function(coord){
        if(coord.x != undefined && coord.y != undefined){
          var yOffset = path.lineNumber*fontSize;
          that.coordinates.push({x: coord.x, y: coord.y + yOffset})
        }
      })

    });
  }



  /*
  keyboard interaction Methods
  */

  // remove letters
  this.removeLetters = function(){
    var textTypedCounter = that.lineCount;
    // remove letters from each object
    if (textTypedCounter >= 0 && that.textTyped[0].text.length > 0){
     that.textTyped[textTypedCounter].text = that.textTyped[textTypedCounter].text.substring(0,max(0,that.textTyped[textTypedCounter].text.length-1));
    }
    // remove objects if there's no characters
    if(that.textTyped[textTypedCounter].text.length == 0){
        textTypedCounter--;
        if(textTypedCounter < 0){
          console.log("nothing left")
          textTypedCounter = 0;
        }else{
          that.textTyped.pop();
        }
    }
  }

  // add lines
  this.addLines = function(){
    that.textTyped.push(that.addText(""));
    that.lineCount++;
  }

  // add characters
  this.addCharacters = function(_key){
    that.textTyped[that.lineCount].text += _key;
  }


  /*
  Rendering Methods
  */

  // show all the points with random color
  this.randomStrokes = function(){
    that.coordinates.forEach(function(coords){
      stroke(random(255),random(255),random(255))
      ellipse(coords.x, coords.y,5, 5);
    })
  } // end this.show();

  // follow the mouse with extruded lines
  this.lines2mouse = function(){

    stroke(that.colors[0])
    that.coordinates.forEach(function(coords){
        strokeWeight(1);
        line( coords.x + map(mouseX, 0, width, -100, 100), coords.y + map(mouseY, 0, height, -100, 100), coords.x, coords.y)
    })
  }


  // animate the points
  this.animatedPoints = function(_shape){

    that.paths.forEach(function(path, idx){
      fill(that.colors[path.lineNumber])
      stroke(that.colors[path.lineNumber])
      path.ranges.forEach(function(d){
        var cmd = path.data.commands[that.textTyped[idx].counter + d];

        if(cmd != undefined ){
          if(that.textTyped[idx].counter < path.breaks){
            var yOffset = path.lineNumber*fontSize;
            if(_shape == "ellipse"){
              ellipse(cmd.x, cmd.y + yOffset, fontSize*0.10, fontSize*0.10);
            }else if(_shape == "rect"){
              rect(cmd.x, cmd.y + yOffset, fontSize*0.10, fontSize*0.10);
            }

            that.textTyped[idx].counter++;
          }else{
            that.textTyped[idx].counter = 0;
          }
        }
      });
    })

  }

  // radial lines
  this.radialLines = function(){

    stroke(that.colors[0])
    that.coordinates.forEach(function(coords){
        strokeWeight(1);
        for(var i = 0; i < 360; i+=60){
          var angle = radians(i);
          var radiusDistanceX = map(mouseX, 0, width, 0, random(20));
          var radiusDistanceY = map(mouseY, 0, width, 0, random(20));

          var ptX = cos(angle) * radiusDistanceX + coords.x;
          var ptY = sin(angle) * radiusDistanceY + coords.y;
          line(ptX, ptY, coords.x, coords.y)
        }
    })
  }

  // orbiting points
  this.orbitingPoints = function(_type){

    stroke(that.colors[0])
    var rectSize = fontSize*0.05;
    var shiftX1 = mouseX/100 * random(-1, 1);
    var shiftY1 = mouseY/100 * random(-1, 1);
    var shiftX2 = mouseX/100 * random(-1, 1);
    var shiftY2 = mouseY/100 * random(-1, 1);
    var shiftX3 = mouseX/100 * random(-1, 1);
    var shiftY3 = mouseY/100 * random(-1, 1);
    var shiftX4 = mouseX/100 * random(-1, 1);
    var shiftY4 = mouseY/100 * random(-1, 1);

    that.coordinates.forEach(function(coords, idx){

        if(idx%2 ==0){
          var angle = radians(frameCount%360);
        } else{
          var angle = radians(-frameCount%360);
        }

        if(_type == "points"){
          push()
          translate(coords.x, coords.y)
          rotate(angle);
          point(0+shiftX1, 0+shiftY1);
          point(0+rectSize+shiftX2, 0+shiftY2);
          pop()
        }
    })
  }

  // make a triangle blob from the points
  this.triangleBlob = function(){
    fill(that.colors[1])
    stroke(that.colors[1])

    beginShape(TRIANGLE_STRIP);
    that.coordinates.forEach(function(coords, idx){
      vertex(coords.x, coords.y);
    })
    endShape();

  }

  // wobblyShapes
  this.wobblyShapes= function(_type){

    that.individualPaths.forEach(function(path, idx){
      stroke(that.colors[path.lineNumber])
      fill(that.colors[path.lineNumber])

      that.angle +=0.01;
      if(idx %2){
        var shifter = sin(that.angle) * 0.05 ;
      } else{
        var shifter = sin(that.angle) * -0.05 ;
      }

      var yOffset = path.lineNumber*fontSize;
      var xOffset = path.startX;

      push();
      translate(xOffset,yOffset);
      rotate(shifter);

      // choose a beginShape mode
      if(_type == "TRIANGLES"){
        beginShape(TRIANGLES);
      }
      else if(_type == "TRIANGLE_STRIP"){
        beginShape(TRIANGLE_STRIP);
      }
      else if(_type == "LINES"){
        beginShape(LINES);
      }
      else if(_type == "TRIANGLE_FAN"){
        beginShape(TRIANGLE_FAN);
      } else{
        beginShape(TRIANGLES);
      }

      // add all those vertices to the shape
      path.data.commands.forEach(function(d){
        vertex(d.x, d.y)
      })

      endShape();
      pop();

    });

  }

  // outward lines following mouse
  this.outwardLines = function(){
    that.individualPaths.forEach(function(path, idx){
      stroke(that.colors[path.lineNumber])
      strokeWeight(0.5);
      fill(that.colors[path.lineNumber])
      var yOffset = path.lineNumber*fontSize;
      var xOffset = path.startX;

      push();
      translate(xOffset,yOffset);
        var cX = (path.bbox.x1 + path.bbox.x2)/2 + map(mouseX, 0, width, -50, 50);
        var cY = (path.bbox.y1 + path.bbox.y2)/2 + map(mouseY, 0, height, -50, 50);
        // add all those vertices to the shape
        path.data.commands.forEach(function(d){
          line(cX, cY, d.x, d.y)

        })
      pop();
    });
  }

} // end animatedType object

// key controls
function keyPressed(){
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    myAnimatedText.removeLetters();
  }

  if (keyCode === ENTER || keyCode === RETURN) {
    myAnimatedText.addLines();
  }

  if (keyCode === LEFT_ARROW) {
    myAnimatedText.drawMode--;
    if (myAnimatedText.drawMode < 1) myAnimatedText.drawMode = 8;
  }
  if (keyCode === RIGHT_ARROW) {
    myAnimatedText.drawMode++;
    if (myAnimatedText.drawMode > 8) myAnimatedText.drawMode = 1;
  }

  if (keyCode === UP_ARROW) {
    myAnimatedText.pointDensity--;
    if (myAnimatedText.pointDensity < 2) myAnimatedText.pointDensity = 2;
  }
  if (keyCode === DOWN_ARROW) {
    myAnimatedText.pointDensity++;
  }

}

function keyTyped() {
  if (keyCode >= 32){
    myAnimatedText.addCharacters(key);
  }
}


