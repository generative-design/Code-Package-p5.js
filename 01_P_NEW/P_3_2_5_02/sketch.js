/**
 * Type messages with this animated font
 *
 * MOUSE
 *
 * KEYS
 * CONTROL                   : save png
 * A-Z
 * 1                         : only letter form
 * 2                         : only animated letter form
 * 3                         : both letter form and animation
 * 4                         : use squares for animation
 * 5                         : use ellipses for animation
 * left arrow                : remove the letter
 *
 * CONTRIBUTED BY
 * [Joey Lee](http://jk-lee.com)
 */


 // TODO:
 /*
 1. restructure data model:
  - move aniMessage into the aniType Object itself

 2. automatic line number counting
 3. move rendering methods into the object
 4. add rendering method for bending letters

 */

"use strict";

var aniLetters;
var style;
var aniMessage;

function setup() {
  createCanvas(800,800);
  strokeWeight(1);
  strokeCap(ROUND);

  // assign globals
  style = 1;
  aniMessage = [];
  aniLetters = new AniLetters(40, 100);

  // initialize with "Type" message
  aniMessage.push({letter: 'T', x: aniLetters.cursorLocation.x, y: aniLetters.cursorLocation.y});
  aniLetters.cursorLocation.x += aniLetters.letterWidth+aniLetters.letterPadding;
  aniMessage.push({letter: 'Y', x: aniLetters.cursorLocation.x, y: aniLetters.cursorLocation.y});
  aniLetters.cursorLocation.x += aniLetters.letterWidth+aniLetters.letterPadding;
  aniMessage.push({letter: 'P', x: aniLetters.cursorLocation.x, y: aniLetters.cursorLocation.y});
  aniLetters.cursorLocation.x += aniLetters.letterWidth+aniLetters.letterPadding;
  aniMessage.push({letter: 'E', x: aniLetters.cursorLocation.x, y: aniLetters.cursorLocation.y});
  aniLetters.cursorLocation.x += aniLetters.letterWidth+aniLetters.letterPadding;

  // frameRate(1);
}

function draw() {
  // noLoop();
  background(255, 255, 255, 30);
  if(aniMessage.length > 0){
    aniMessage.forEach(function(d){
        aniLetters[d.letter](d.x, d.y);
    })
  }
}


function AniLetters(_lwidth, _lheight){
  this.textTyped = [];
  this.letterWidth = _lwidth;
  this.letterHeight = _lheight;
  this.aniSteps = 20;
  this.drawMode = 3;
  this.cursorLocation = {x:50, y:50};
  this.letterPadding = 20;

  // -------------- letters -------------
  this.A = function(x, y){
    push();
    translate(x, y);
    this.diagonalToMiddle(this.letterWidth/2,0, 1);
    this.diagonalToMiddle(-this.letterWidth/2,0, -1);
    this.halfCrossBar(this.letterWidth/4, this.letterHeight/2);
    pop();
  }

  this.B = function(x, y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    this.halfBowl(0,this.letterHeight/2, -1);
    pop();
  }
  this.C = function(x, y){
    push();
    translate(x, y);
    this.fullBowl(0, 0, 1);
    pop();
  }

  this.D = function(x, y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullBowl(0, 0, -1);
    pop();
  }

  this.E = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0,0);
    this.crossBar(0,this.letterHeight/2);
    this.crossBar(0,this.letterHeight);
    pop();
  }

  this.F = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0,0);
    this.crossBar(0,this.letterHeight/2);
    pop();
  }

  this.G = function(x,y){
    push();
    translate(x, y);
    this.fullBowl(0, 0, 1);
    this.halfStem(this.letterWidth,this.letterHeight/2);
    this.halfCrossBar(this.letterWidth/2, this.letterHeight/2);
    pop();
  }

  this.H = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0, this.letterHeight/2);
    this.fullStem(this.letterWidth,0);
    pop();
  }

  this.I = function(x,y){
    push();
    translate(x, y);
    this.fullStem(this.letterWidth/2,0);
    pop();
  }

  this.J = function(x,y){
    push();
    translate(x, y);
    this.jCurve(0, 0);
    pop();
  }

  this.K = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfDiagonalLeg(0, this.letterHeight/2, 1);
    this.halfDiagonalLeg(0, this.letterHeight/2, -1);
    pop();
  }

  this.L = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0, this.letterHeight)
    pop();
  }

  this.M = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullStem(this.letterWidth,0);
    this.diagonalToMiddle(0, 0, 1);
    this.diagonalToMiddle(0, 0, -1);
    pop();
  }

  this.N = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullStem(this.letterWidth,0);
    this.diagonalToEnd(0, 0, -1);
    pop();
  }

  this.O = function(x,y){
    push();
    translate(x, y);
    this.letterO(0, 0);
    pop();
  }

  this.P = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    pop();
  }

  this.Q = function(x,y){
    push();
    translate(x, y);
    this.letterO(0,0);
    this.halfDiagonalArm(this.letterWidth/2,this.letterHeight/2, -1);
    pop();
  }

  this.R = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    this.halfDiagonalLeg(0, this.letterHeight/2, -1);
    pop();
  }

  this.S = function(x,y){
    push();
    translate(x, y);
    // noFill();
    this.sCurve(0,0);
    pop();
  }

  this.T = function(x,y){
    push();
    translate(x, y);
    this.fullStem(this.letterWidth/2,0);
    this.crossBar(0,0);
    pop();
  }

  this.U = function(x,y){
    push();
    translate(x, y);
    this.uCurve(0,0);
    pop();
  }

  this.V = function(x,y){
    push();
    translate(x, y);
    this.diagonalToMiddle(0, 0, 1);
    this.diagonalToMiddle(0, 0, -1);
    pop();
  }

  this.W = function(x,y){
    push();
    translate(x, y);
    this.diagonalToQuarter(0, 0, 1);
    this.diagonalToQuarter(0, 0, -1);

    this.diagonalToQuarter(this.letterWidth/2, 0, 1);
    this.diagonalToQuarter(this.letterWidth/2, 0, -1);
    pop();
  }

  this.X = function(x, y){
    push();
    translate(x ,y);
    this.diagonalToEnd(0, 0, -1);
    this.diagonalToEnd(0, 0, 1);
    pop();
  }

  this.Y = function(x,y){
    push();
    translate(x, y);
    this.halfStem(this.letterWidth/2, this.letterHeight/2);
    this.halfDiagonalArm(0,0, 1);
    this.halfDiagonalArm(0,0, -1);
    pop()
  }

  this.Z = function(x,y){
    push();
    translate(x, y);
    this.diagonalToEnd(0,0,1);
    this.crossBar(0,0);
    this.crossBar(0,this.letterHeight);
    pop()
  }

  // ------------- components --------------- //
  this.sCurve = function(x1,y1){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      curve(this.letterWidth, -this.letterHeight*1.5, 0, this.letterHeight*0.25, this.letterWidth, this.letterHeight*0.75, this.letterWidth-this.letterWidth, this.letterHeight*0.75+this.letterHeight*1.5)
      arc(this.letterWidth/2, this.letterHeight*0.25, this.letterWidth, this.letterHeight/2, PI, 0);
      arc(this.letterWidth/2, this.letterHeight*0.75, this.letterWidth, this.letterHeight/2, 0, PI);
    }

    this.dynamic = function(){
      arcFromToInSteps(this.letterWidth/2, this.letterHeight*0.25, this.letterWidth/2,this.letterWidth/2, -PI, 0, this.aniSteps);
      arcFromToInSteps(this.letterWidth/2, this.letterHeight*0.75, this.letterWidth/2,this.letterWidth/2, PI, 0, this.aniSteps);
      curveFromToInSteps(this.letterWidth, -this.letterHeight*1.5, 0, this.letterHeight*0.25, this.letterWidth, this.letterHeight*0.75, this.letterWidth-this.letterWidth, this.letterHeight*0.75+this.letterHeight*1.5,this.aniSteps);
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.uCurve = function(x1, y1){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      arc(this.letterWidth/2, 0, this.letterWidth, this.letterHeight*2, 0, PI);
    }
    this.dynamic = function(){
      arcFromToInSteps(this.letterWidth/2, 0, this.letterWidth/2, this.letterHeight, 0, PI, this.aniSteps+10)
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop()
  }


  this.jCurve = function(x1, y1){
    push();
    translate(x1, y1);
    this.static = function(){
      noFill();
      bezier(this.letterWidth, 0, this.letterWidth+10, this.letterHeight*1.5, 0, this.letterHeight, 0, this.letterHeight*0.75)
    }
    this.dynamic = function(){
      bezierFromToInSteps(this.letterWidth, 0, this.letterWidth+10, this.letterHeight*1.5, 0, this.letterHeight, 0, this.letterHeight*0.75, this.aniSteps + 10)
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop()
  }


  this.letterO = function(x1, y1){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      ellipse(this.letterWidth/2, this.letterHeight/2, this.letterWidth, this.letterHeight);
    }
    this.dynamic = function(){
      arcFromToInSteps(this.letterWidth/2, this.letterHeight/2, this.letterWidth/2, this.letterHeight/2, PI, -PI, this.aniSteps+10)
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.halfDiagonalArm = function(x1, y1, direction){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      if(direction == 1){
        line(this.letterWidth/2, this.letterHeight/2, this.letterWidth, 0);
      }
      if (direction == -1){
        line(0, 0, this.letterWidth/2, this.letterHeight/2);
      }
    }
    this.dynamic = function(){
      if(direction == 1){
        lineFromToInSteps(this.letterWidth/2, this.letterHeight/2, this.letterWidth, 0, this.aniSteps);
      }
      if (direction == -1){
        lineFromToInSteps(0, 0, this.letterWidth/2, this.letterHeight/2, this.aniSteps);
      }
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop()
  }

  this.diagonalToEnd = function(x1, y1, direction){
    push();
    translate(x1, y1);

    this.static = function(){
      noFill();
      if(direction == 1){
        line(this.letterWidth, 0, 0, this.letterHeight);
      }
      if (direction == -1){
        line(0, 0, this.letterWidth, this.letterHeight);
      }
    }
    this.dynamic = function(){
      if(direction == 1){
        lineFromToInSteps(this.letterWidth, 0, 0, this.letterHeight, this.aniSteps);
      }
      if (direction == -1){
        lineFromToInSteps(0, 0, this.letterWidth, this.letterHeight, this.aniSteps);
      }
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.diagonalToQuarter = function(x1, y1, direction){
    push();
    translate(x1, y1);
    this.static = function(){
      noFill();
      if(direction == 1){
        line(0, 0, this.letterWidth/4 , this.letterHeight);
      }
      if(direction == -1){
        line(this.letterWidth/4, this.letterHeight, this.letterWidth/2, 0);
      }
    }
    this.dynamic = function(){
      if(direction == 1){
        lineFromToInSteps(0, 0, this.letterWidth/4 , this.letterHeight, this.aniSteps);
      }
      if(direction == -1){
        lineFromToInSteps(this.letterWidth/4, this.letterHeight, this.letterWidth/2, 0, this.aniSteps);
      }
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.diagonalToMiddle = function(x1, y1, direction){
    push();
    translate(x1, y1);
    this.static = function(){
      noFill();
      if(direction == 1){
        line(0, 0, this.letterWidth/2 , this.letterHeight);
      }
      if(direction == -1){
        line(this.letterWidth/2, this.letterHeight, this.letterWidth, 0);
      }
    }
    this.dynamic = function(){
      if(direction == 1){
      lineFromToInSteps(0, 0, this.letterWidth/2 , this.letterHeight, this.aniSteps);
      }
      if(direction == -1){
        lineFromToInSteps(this.letterWidth/2, this.letterHeight, this.letterWidth, 0, this.aniSteps);
      }
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.halfDiagonalLeg = function(x1, y1, direction){
    push();
    translate(x1, y1);
    var endpoint;
    if(direction == 1){
      endpoint = -this.letterHeight/2;
    }
    if(direction == -1){
      endpoint = this.letterHeight/2;
    }

    this.static = function(){
      noFill();
      line(0, 0, this.letterHeight/2, endpoint);
    }
    this.dynamic = function(){
      lineFromToInSteps(0, 0, this.letterHeight/2, endpoint, this.aniSteps);
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.fullStem = function(x1, y1){
    push();
    translate(x1,y1);
    this.static = function(){
      noFill();
      line(0, 0, 0, this.letterHeight);
    }
    this.dynamic = function(){
      lineFromToInSteps(0, 0, 0, this.letterHeight, this.aniSteps);
    }
    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.halfStem =function(x1, y1){
    push();
    translate(x1,y1);
    this.static = function(){
      noFill();
      line(0, 0, 0, this.letterHeight/2);
    }
    this.dynamic = function(){
      lineFromToInSteps(0, 0, 0, this.letterHeight/2, this.aniSteps);
    }
    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.halfCrossBar = function(x1, y1){
    push();
    translate(x1,y1);
    this.static = function(){
      noFill();
      line(0, 0, this.letterWidth/2, 0);
    }
    this.dynamic = function(){
      lineFromToInSteps(0, 0, this.letterWidth/2, 0, this.aniSteps);
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.halfBowl= function(x1, y1, direction){
    var cPoint = this.letterWidth*8;
    noFill();
    push();
    if(direction === 1){
      translate(x1+ this.letterWidth,y1);
    }
    if(direction === -1){
      translate(x1,y1);
    }
    this.static = function(){
      noFill();
      curve(cPoint*direction, 0, 0,0,0,this.letterHeight/2,cPoint*direction,this.letterHeight/2)
    }
    this.dynamic = function(){
      curveFromToInSteps(cPoint*direction, 0, 0,0,0,this.letterHeight/2,cPoint*direction,this.letterHeight/2,this.aniSteps);
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.fullBowl = function(x1, y1, direction){
    var cPoint = this.letterWidth*8;
    noFill();
    push();
    if(direction === 1){
      translate(x1 + this.letterWidth,y1);
    }
    if(direction === -1){
      translate(x1,y1);
    }
    this.static = function(){
      noFill();
      curve(cPoint*direction, 0, 0,0,0,this.letterHeight, cPoint*direction,this.letterHeight)
    }
    this.dynamic = function(){
      curveFromToInSteps(cPoint*direction, 0, 0,0,0,this.letterHeight, cPoint*direction,this.letterHeight, this.aniSteps);
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop();
  }

  this.crossBar = function(x1, y1){
    push()
    translate(x1, y1);
    this.static = function(){
      noFill();
      line(0, 0, this.letterWidth, 0);
    }
    this.dynamic = function(){
      lineFromToInSteps(0, 0, this.letterWidth, 0, this.aniSteps);
    }

    if(this.drawMode === 1){
      this.static();
    }
    if(this.drawMode === 2){
      this.dynamic();
    }
    if(this.drawMode === 3){
      this.static();
      this.dynamic();
    }
    pop()
  }


  /*
  Keyboard interactions
  */

  this.space = function(){
    this.cursorLocation.x += 50;
  }

  this.newLine = function(){
    this.cursorLocation.x = 50;
    this.cursorLocation.y += this.letterHeight + 5;
  }

  this.addLetters = function(_key){
    // type letters
    stroke(65, 105, 185);
    var aniLetter  = _key.toUpperCase();
    if(aniLetters[aniLetter]){
      aniMessage.push({letter: aniLetter, x:this.cursorLocation.x, y: this.cursorLocation.y});
      this.cursorLocation.x += this.letterWidth+this.letterPadding;
    } else{
      console.log("not a letter")
    }
  }

} // end AniType() object


function lineFromToInSteps(x1, y1, x2, y2, stepCount) {
  var aniIndex = frameCount % (stepCount+1);
  var ratio = aniIndex/stepCount;
  var posX = lerp(x1, x2, ratio);
  var posY = lerp(y1, y2, ratio);
  fill(65, 105, 185);
  rectMode(CENTER);
  if(style == 1){
    rect(posX, posY, 10, 10);
  } else if(style == 2){
    ellipse(posX, posY, 10, 10);
  } else{
    ellipse(posX, posY, 10, 10);
  }
  
} 


function curveFromToInSteps(a1, a2, b1, b2, c1, c2, d1, d2,  stepCount){
  var points = [];
  for (var i = 0; i <= stepCount; i++) {
    var t = i / stepCount;
    var cx = curvePoint(a1, b1, c1, d1, t);
    var cy = curvePoint(a2, b2, c2, d2, t);
    points.push({x: cx, y: cy});
  }
   var aniIndex = frameCount % (stepCount);
    var ratio = aniIndex/stepCount;
    var posX = lerp(points[aniIndex].x, points[aniIndex+1].x, ratio);
    var posY = lerp(points[aniIndex].y, points[aniIndex+1].y, ratio);
    fill(65, 105, 185);
    rectMode(CENTER);
    if(style == 1){
      rect(posX, posY, 10, 10);
    } else if(style == 2){
      ellipse(posX, posY, 10, 10);
    } else{
      ellipse(posX, posY, 10, 10);
    }

}

function bezierFromToInSteps(a1, a2, b1, b2, c1, c2, d1, d2,  stepCount){
  var points = [];
  for (var i = 0; i <= stepCount; i++) {
    var t = i / stepCount;
    var cx = bezierPoint(a1, b1, c1, d1, t);
    var cy = bezierPoint(a2, b2, c2, d2, t);
    points.push({x: cx, y: cy});
  }
   var aniIndex = frameCount % (stepCount);
    var ratio = aniIndex/stepCount;
    var posX = lerp(points[aniIndex].x, points[aniIndex+1].x, ratio);
    var posY = lerp(points[aniIndex].y, points[aniIndex+1].y, ratio);
    fill(65, 105, 185);
    rectMode(CENTER);
    if(style == 1){
      rect(posX, posY, 10, 10);
    } else if(style == 2){
      ellipse(posX, posY, 10, 10);
    } else{
      ellipse(posX, posY, 10, 10);
    }

}

function arcFromToInSteps(x, y, radiusWidth, radiusHeight, a1, a2, stepCount) {
  var aniIndex = frameCount % (stepCount+1);
  var ratio = aniIndex/stepCount;
  var angle = lerp(a1, a2, ratio);
  var posX = x + cos(angle) * radiusWidth;
  var posY = y + sin(angle) * radiusHeight;
  fill(65, 105, 185);
  rectMode(CENTER);
  if(style == 1){
    rect(posX, posY, 10, 10);
  } else if(style == 2){
    ellipse(posX, posY, 10, 10);
  } else{
    ellipse(posX, posY, 10, 10);
  }

}


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
  if (key === "1") style = 1;
  if (key === "2") style = 2;
  
  // spacebar
  if (keyCode == 32) aniLetters.space();
  
  // on return
  if (keyCode == ENTER || keyCode == RETURN) {
    aniLetters.newLine();
  }
  // remove letters
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    aniMessage.pop();
    aniLetters.cursorLocation.x -= aniLetters.letterWidth + aniLetters.letterPadding;
  } 
}


function keyTyped() {
  if (keyCode >= 32){
    aniLetters.addLetters(key);
  }
}



