// P_3_2_5_02
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
 * Animated font created from simple geometries
 *
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

'use strict';

var aniLetters;

function setup() {
  createCanvas(800,800);
  strokeWeight(1);
  strokeCap(ROUND);

  // adding your aniLetters object with
  // the letter width and height
  aniLetters = new AniLetters(40, 100);

  // initialize with a message
  aniLetters.textTyped.push(aniLetters.addText('TYPE'));
  aniLetters.textTyped.push(aniLetters.addText('CODE'));

}

function draw() {
  // noLoop();
  background(255, 255, 255, 30);

  // count how many lines of text there are
  aniLetters.getLineCount();
  // collect the letters and their x and y locations
  aniLetters.getPaths();
  // loop through the paths and draw them to screen
  aniLetters.render();

}

// the AniLetters object defines the simple geometry font
function AniLetters(_lwidth, _lheight){
  var that = this;
  that.textTyped = [];
  that.textTyped = [];
  that.paths = [];
  that.letterWidth = _lwidth;
  that.letterHeight = _lheight;
  that.lineCount = 0;
  that.aniSteps = 20;
  that.drawMode = 3;
  that.cursorLocation = {x: 50, y: 50,};
  that.letterPadding = 60;
  that.style = 1;

  /*
  Data Handling
  */

  // set the lineCount to the number of "lines" or text object in the textTyped Array
  this.getLineCount = function(){
    if (that.textTyped.length > 0){
      that.lineCount = that.textTyped.length - 1;
    } else {
      that.lineCount = 0;
    }
  };

  // get each data path of the letters
  this.getPaths = function(){
    that.paths = [];

    that.textTyped.forEach(function(txt, idx){
      txt.text.split('').forEach(function(d, i){

        var pathData = {
          letter: d.toUpperCase(),
          x: that.cursorLocation.x + (that.letterWidth + that.letterPadding * i),
          y: that.cursorLocation.y + (that.letterHeight * idx),
        };

        that.paths.push(pathData);

      });
    });
  };

  // add a text object for each line
  this.addText = function(_text){
    var textObject = {counter: 0, text: _text,};
    return textObject;
  };

  /*
  Keyboard interactions
  */

  // remove letters
  this.removeLetters = function(){
    var textTypedCounter = that.lineCount;
    // remove letters from each object
    if (textTypedCounter >= 0 && that.textTyped[0].text.length > 0){
      that.textTyped[textTypedCounter].text = that.textTyped[textTypedCounter].text.substring(0,max(0,that.textTyped[textTypedCounter].text.length - 1));
    }
    // remove objects if there's no characters
    if (that.textTyped[textTypedCounter].text.length == 0){
      textTypedCounter--;
      if (textTypedCounter < 0){
        console.log('nothing left');
        textTypedCounter = 0;
      } else {
        that.textTyped.pop();
      }
    }
  };

  // add lines
  this.addLines = function(){
    that.textTyped.push(that.addText(''));
    that.lineCount++;
  };

  // add characters
  this.addCharacters = function(_key){
    if (that[_key.toUpperCase()]){
      that.textTyped[that.lineCount].text += _key;
    } else {
      console.log('not a letter');
    }
  };

  /*
  Call functions in render
  */

  this.render = function(){
    if (that.paths.length > 0){
      that.paths.forEach(function(d){
        that[d.letter](d.x, d.y);
      });
    }
  };

  /*
  Letter Definitions
  */

  // space
  this[' '] = function(){
    // nothing
  };

  this.A = function(x, y){
    push();
    translate(x, y);
    this.diagonalToMiddle(that.letterWidth / 2,0, 1);
    this.diagonalToMiddle(-that.letterWidth / 2,0, -1);
    this.halfCrossBar(that.letterWidth / 4, that.letterHeight / 2);
    pop();
  };

  this.B = function(x, y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    this.halfBowl(0,that.letterHeight / 2, -1);
    pop();
  };
  this.C = function(x, y){
    push();
    translate(x, y);
    this.fullBowl(0, 0, 1);
    pop();
  };

  this.D = function(x, y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullBowl(0, 0, -1);
    pop();
  };

  this.E = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0,0);
    this.crossBar(0,that.letterHeight / 2);
    this.crossBar(0,that.letterHeight);
    pop();
  };

  this.F = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0,0);
    this.crossBar(0,that.letterHeight / 2);
    pop();
  };

  this.G = function(x,y){
    push();
    translate(x, y);
    this.fullBowl(0, 0, 1);
    this.halfStem(that.letterWidth,that.letterHeight / 2);
    this.halfCrossBar(that.letterWidth / 2, that.letterHeight / 2);
    pop();
  };

  this.H = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0, that.letterHeight / 2);
    this.fullStem(that.letterWidth,0);
    pop();
  };

  this.I = function(x,y){
    push();
    translate(x, y);
    this.fullStem(that.letterWidth / 2,0);
    pop();
  };

  this.J = function(x,y){
    push();
    translate(x, y);
    this.jCurve(0, 0);
    pop();
  };

  this.K = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfDiagonalLeg(0, that.letterHeight / 2, 1);
    this.halfDiagonalLeg(0, that.letterHeight / 2, -1);
    pop();
  };

  this.L = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0, that.letterHeight);
    pop();
  };

  this.M = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullStem(that.letterWidth,0);
    this.diagonalToMiddle(0, 0, 1);
    this.diagonalToMiddle(0, 0, -1);
    pop();
  };

  this.N = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullStem(that.letterWidth,0);
    this.diagonalToEnd(0, 0, -1);
    pop();
  };

  this.O = function(x,y){
    push();
    translate(x, y);
    this.letterO(0, 0);
    pop();
  };

  this.P = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    pop();
  };

  this.Q = function(x,y){
    push();
    translate(x, y);
    this.letterO(0,0);
    this.halfDiagonalArm(that.letterWidth / 2,that.letterHeight / 2, -1);
    pop();
  };

  this.R = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    this.halfDiagonalLeg(0, that.letterHeight / 2, -1);
    pop();
  };

  this.S = function(x,y){
    push();
    translate(x, y);
    // noFill();
    this.sCurve(0,0);
    pop();
  };

  this.T = function(x,y){
    push();
    translate(x, y);
    this.fullStem(that.letterWidth / 2,0);
    this.crossBar(0,0);
    pop();
  };

  this.U = function(x,y){
    push();
    translate(x, y);
    this.uCurve(0,0);
    pop();
  };

  this.V = function(x,y){
    push();
    translate(x, y);
    this.diagonalToMiddle(0, 0, 1);
    this.diagonalToMiddle(0, 0, -1);
    pop();
  };

  this.W = function(x,y){
    push();
    translate(x, y);
    this.diagonalToQuarter(0, 0, 1);
    this.diagonalToQuarter(0, 0, -1);

    this.diagonalToQuarter(that.letterWidth / 2, 0, 1);
    this.diagonalToQuarter(that.letterWidth / 2, 0, -1);
    pop();
  };

  this.X = function(x, y){
    push();
    translate(x ,y);
    this.diagonalToEnd(0, 0, -1);
    this.diagonalToEnd(0, 0, 1);
    pop();
  };

  this.Y = function(x,y){
    push();
    translate(x, y);
    this.halfStem(that.letterWidth / 2, that.letterHeight / 2);
    this.halfDiagonalArm(0,0, 1);
    this.halfDiagonalArm(0,0, -1);
    pop();
  };

  this.Z = function(x,y){
    push();
    translate(x, y);
    this.diagonalToEnd(0,0,1);
    this.crossBar(0,0);
    this.crossBar(0,that.letterHeight);
    pop();
  };

  /*
  Component Definitions
  */
  this.sCurve = function(x1,y1){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      curve(that.letterWidth, -that.letterHeight * 1.5, 0, that.letterHeight * 0.25, that.letterWidth, that.letterHeight * 0.75, that.letterWidth - that.letterWidth, that.letterHeight * 0.75 + that.letterHeight * 1.5);
      arc(that.letterWidth / 2, that.letterHeight * 0.25, that.letterWidth, that.letterHeight / 2, PI, 0);
      arc(that.letterWidth / 2, that.letterHeight * 0.75, that.letterWidth, that.letterHeight / 2, 0, PI);
    };

    this.dynamic = function(){
      this.arcFromToInSteps(that.letterWidth / 2, that.letterHeight * 0.25, that.letterWidth / 2,that.letterWidth / 2, -PI, 0, that.aniSteps);
      this.arcFromToInSteps(that.letterWidth / 2, that.letterHeight * 0.75, that.letterWidth / 2,that.letterWidth / 2, PI, 0, that.aniSteps);
      this.curveFromToInSteps(that.letterWidth, -that.letterHeight * 1.5, 0, that.letterHeight * 0.25, that.letterWidth, that.letterHeight * 0.75, that.letterWidth - that.letterWidth, that.letterHeight * 0.75 + that.letterHeight * 1.5,that.aniSteps);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.uCurve = function(x1, y1){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      arc(that.letterWidth / 2, 0, that.letterWidth, that.letterHeight * 2, 0, PI);
    };
    this.dynamic = function(){
      this.arcFromToInSteps(that.letterWidth / 2, 0, that.letterWidth / 2, that.letterHeight, 0, PI, that.aniSteps + 10);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.jCurve = function(x1, y1){
    push();
    translate(x1, y1);
    this.static = function(){
      noFill();
      bezier(that.letterWidth, 0, that.letterWidth + 10, that.letterHeight * 1.5, 0, that.letterHeight, 0, that.letterHeight * 0.75);
    };
    this.dynamic = function(){
      this.bezierFromToInSteps(that.letterWidth, 0, that.letterWidth + 10, that.letterHeight * 1.5, 0, that.letterHeight, 0, that.letterHeight * 0.75, that.aniSteps + 10);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.letterO = function(x1, y1){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      ellipse(that.letterWidth / 2, that.letterHeight / 2, that.letterWidth, that.letterHeight);
    };
    this.dynamic = function(){
      this.arcFromToInSteps(that.letterWidth / 2, that.letterHeight / 2, that.letterWidth / 2, that.letterHeight / 2, PI, -PI, that.aniSteps + 10);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.halfDiagonalArm = function(x1, y1, direction){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      if (direction == 1){
        line(that.letterWidth / 2, that.letterHeight / 2, that.letterWidth, 0);
      }
      if (direction == -1){
        line(0, 0, that.letterWidth / 2, that.letterHeight / 2);
      }
    };
    this.dynamic = function(){
      if (direction == 1){
        this.lineFromToInSteps(that.letterWidth / 2, that.letterHeight / 2, that.letterWidth, 0, that.aniSteps);
      }
      if (direction == -1){
        this.lineFromToInSteps(0, 0, that.letterWidth / 2, that.letterHeight / 2, that.aniSteps);
      }
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.diagonalToEnd = function(x1, y1, direction){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      if (direction == 1){
        line(that.letterWidth, 0, 0, that.letterHeight);
      }
      if (direction == -1){
        line(0, 0, that.letterWidth, that.letterHeight);
      }
    };
    this.dynamic = function(){
      if (direction == 1){
        this.lineFromToInSteps(that.letterWidth, 0, 0, that.letterHeight, that.aniSteps);
      }
      if (direction == -1){
        this.lineFromToInSteps(0, 0, that.letterWidth, that.letterHeight, that.aniSteps);
      }
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.diagonalToQuarter = function(x1, y1, direction){
    push();
    translate(x1, y1);
    this.static = function(){
      noFill();
      if (direction == 1){
        line(0, 0, that.letterWidth / 4 , that.letterHeight);
      }
      if (direction == -1){
        line(that.letterWidth / 4, that.letterHeight, that.letterWidth / 2, 0);
      }
    };
    this.dynamic = function(){
      if (direction == 1){
        this.lineFromToInSteps(0, 0, that.letterWidth / 4 , that.letterHeight, that.aniSteps);
      }
      if (direction == -1){
        this.lineFromToInSteps(that.letterWidth / 4, that.letterHeight, that.letterWidth / 2, 0, that.aniSteps);
      }
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.diagonalToMiddle = function(x1, y1, direction){
    push();
    translate(x1, y1);
    this.static = function(){
      noFill();
      if (direction == 1){
        line(0, 0, that.letterWidth / 2 , that.letterHeight);
      }
      if (direction == -1){
        line(that.letterWidth / 2, that.letterHeight, that.letterWidth, 0);
      }
    };
    this.dynamic = function(){
      if (direction == 1){
        this.lineFromToInSteps(0, 0, that.letterWidth / 2 , that.letterHeight, that.aniSteps);
      }
      if (direction == -1){
        this.lineFromToInSteps(that.letterWidth / 2, that.letterHeight, that.letterWidth, 0, that.aniSteps);
      }
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.halfDiagonalLeg = function(x1, y1, direction){
    push();
    translate(x1, y1);
    var endpoint;
    if (direction == 1){
      endpoint = -that.letterHeight / 2;
    }
    if (direction == -1){
      endpoint = that.letterHeight / 2;
    }

    this.static = function(){
      noFill();
      line(0, 0, that.letterHeight / 2, endpoint);
    };
    this.dynamic = function(){
      this.lineFromToInSteps(0, 0, that.letterHeight / 2, endpoint, that.aniSteps);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.fullStem = function(x1, y1){
    push();
    translate(x1,y1);
    this.static = function(){
      noFill();
      line(0, 0, 0, that.letterHeight);
    };
    this.dynamic = function(){
      this.lineFromToInSteps(0, 0, 0, that.letterHeight, that.aniSteps);
    };
    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.halfStem = function(x1, y1){
    push();
    translate(x1,y1);
    this.static = function(){
      noFill();
      line(0, 0, 0, that.letterHeight / 2);
    };
    this.dynamic = function(){
      this.lineFromToInSteps(0, 0, 0, that.letterHeight / 2, that.aniSteps);
    };
    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.halfCrossBar = function(x1, y1){
    push();
    translate(x1,y1);
    this.static = function(){
      noFill();
      line(0, 0, that.letterWidth / 2, 0);
    };
    this.dynamic = function(){
      this.lineFromToInSteps(0, 0, that.letterWidth / 2, 0, that.aniSteps);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.halfBowl = function(x1, y1, direction){
    var cPoint = that.letterWidth * 8;
    noFill();
    push();
    if (direction === 1){
      translate(x1 + that.letterWidth,y1);
    }
    if (direction === -1){
      translate(x1,y1);
    }
    this.static = function(){
      noFill();
      curve(cPoint * direction, 0, 0,0,0,that.letterHeight / 2,cPoint * direction,that.letterHeight / 2);
    };
    this.dynamic = function(){
      this.curveFromToInSteps(cPoint * direction, 0, 0,0,0,that.letterHeight / 2,cPoint * direction,that.letterHeight / 2,that.aniSteps);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.fullBowl = function(x1, y1, direction){
    var cPoint = that.letterWidth * 8;
    noFill();
    push();
    if (direction === 1){
      translate(x1 + that.letterWidth,y1);
    }
    if (direction === -1){
      translate(x1,y1);
    }
    this.static = function(){
      noFill();
      curve(cPoint * direction, 0, 0,0,0,that.letterHeight, cPoint * direction,that.letterHeight);
    };
    this.dynamic = function(){
      this.curveFromToInSteps(cPoint * direction, 0, 0,0,0,that.letterHeight, cPoint * direction,that.letterHeight, that.aniSteps);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  this.crossBar = function(x1, y1){
    push();
    translate(x1, y1);
    this.static = function(){
      noFill();
      line(0, 0, that.letterWidth, 0);
    };
    this.dynamic = function(){
      this.lineFromToInSteps(0, 0, that.letterWidth, 0, that.aniSteps);
    };

    if (that.drawMode === 1){
      this.static();
    }
    if (that.drawMode === 2){
      this.dynamic();
    }
    if (that.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  };

  /*
  Animation functions
  */

  this.lineFromToInSteps = function(x1, y1, x2, y2, stepCount) {
    var aniIndex = frameCount % (stepCount + 1);
    var ratio = aniIndex / stepCount;
    var posX = lerp(x1, x2, ratio);
    var posY = lerp(y1, y2, ratio);
    fill(65, 105, 185);
    rectMode(CENTER);
    if (that.style == 1){
      rect(posX, posY, 10, 10);
    } else if (that.style == 2){
      ellipse(posX, posY, 10, 10);
    } else {
      ellipse(posX, posY, 10, 10);
    }

  };

  this.curveFromToInSteps = function(a1, a2, b1, b2, c1, c2, d1, d2, stepCount){
    var points = [];
    for (var i = 0; i <= stepCount; i++) {
      var t = i / stepCount;
      var cx = curvePoint(a1, b1, c1, d1, t);
      var cy = curvePoint(a2, b2, c2, d2, t);
      points.push({x: cx, y: cy,});
    }
    var aniIndex = frameCount % (stepCount);
    var ratio = aniIndex / stepCount;
    var posX = lerp(points[aniIndex].x, points[aniIndex + 1].x, ratio);
    var posY = lerp(points[aniIndex].y, points[aniIndex + 1].y, ratio);
    fill(65, 105, 185);
    rectMode(CENTER);
    if (that.style == 1){
      rect(posX, posY, 10, 10);
    } else if (that.style == 2){
      ellipse(posX, posY, 10, 10);
    } else {
      ellipse(posX, posY, 10, 10);
    }

  };

  this.bezierFromToInSteps = function(a1, a2, b1, b2, c1, c2, d1, d2, stepCount){
    var points = [];
    for (var i = 0; i <= stepCount; i++) {
      var t = i / stepCount;
      var cx = bezierPoint(a1, b1, c1, d1, t);
      var cy = bezierPoint(a2, b2, c2, d2, t);
      points.push({x: cx, y: cy,});
    }
    var aniIndex = frameCount % (stepCount);
    var ratio = aniIndex / stepCount;
    var posX = lerp(points[aniIndex].x, points[aniIndex + 1].x, ratio);
    var posY = lerp(points[aniIndex].y, points[aniIndex + 1].y, ratio);
    fill(65, 105, 185);
    rectMode(CENTER);
    if (that.style == 1){
      rect(posX, posY, 10, 10);
    } else if (that.style == 2){
      ellipse(posX, posY, 10, 10);
    } else {
      ellipse(posX, posY, 10, 10);
    }

  };

  this.arcFromToInSteps = function(x, y, radiusWidth, radiusHeight, a1, a2, stepCount) {
    var aniIndex = frameCount % (stepCount + 1);
    var ratio = aniIndex / stepCount;
    var angle = lerp(a1, a2, ratio);
    var posX = x + cos(angle) * radiusWidth;
    var posY = y + sin(angle) * radiusHeight;
    fill(65, 105, 185);
    rectMode(CENTER);
    if (that.style == 1){
      rect(posX, posY, 10, 10);
    } else if (that.style == 2){
      ellipse(posX, posY, 10, 10);
    } else {
      ellipse(posX, posY, 10, 10);
    }

  };

} // end AniType() object

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  // change draw mode
  if (keyCode === LEFT_ARROW) {
    aniLetters.drawMode--;
    if (aniLetters.drawMode < 1) aniLetters.drawMode = 3;
  }
  if (keyCode === RIGHT_ARROW) {
    aniLetters.drawMode++;
    if (aniLetters.drawMode > 3) aniLetters.drawMode = 1;
  }
  // change the number of steps in the animation
  if (keyCode === DOWN_ARROW) {
    aniLetters.aniSteps--;
    if (aniLetters.aniSteps < 4) aniLetters.aniSteps = 4;
  }
  if (keyCode === UP_ARROW) {
    aniLetters.aniSteps++;
  }

  // change between ellipses and rect
  if (key === '1') aniLetters.style = 1;
  if (key === '2') aniLetters.style = 2;

  // on return
  if (keyCode == ENTER || keyCode == RETURN) {
    aniLetters.addLines();
  }
  // remove letters
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    // aniLetters.textTyped.pop();
    // aniLetters.cursorLocation.x -= aniLetters.letterWidth + aniLetters.letterPadding;
    aniLetters.removeLetters();
  }
}

function keyTyped() {
  if (keyCode >= 32){
    aniLetters.addCharacters(key);
  }
}

