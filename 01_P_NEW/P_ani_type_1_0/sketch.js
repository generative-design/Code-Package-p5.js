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
 */
"use strict";

var cursorLocation = {x:50, y:50};
var aniLetters;
var letterPadding = 20;

var typed = [];

function setup() {
  createCanvas(800,800);
  strokeWeight(1);
  strokeCap(ROUND);
  aniLetters = new AniLetters(40, 100);
}

function draw() {
  // noLoop();
  background(255, 255, 255, 30);
  if(typed.length > 0){
    typed.forEach(function(d){
        aniLetters[d.letter](d.x, d.y);
    })
  }
}


function AniLetters(_lwidth, _lheight){
  this.letterWidth = _lwidth;
  this.letterHeight = _lheight;
  this.aniSteps = 20;
  this.mode = 3;

  // -------------- letters -------------
  this.aniA = function(x, y){
    push();
    translate(x, y);
    this.diagonalToMiddle(this.letterWidth/2,0, 1);
    this.diagonalToMiddle(-this.letterWidth/2,0, -1);
    this.halfCrossBar(this.letterWidth/4, this.letterHeight/2);
    pop();
  }

  this.aniB = function(x, y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    this.halfBowl(0,this.letterHeight/2, -1);
    pop();
  }
  this.aniC = function(x, y){
    push();
    translate(x, y);
    this.fullBowl(0, 0, 1);
    pop();
  }

  this.aniD = function(x, y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullBowl(0, 0, -1);
    pop();
  }

  this.aniE = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0,0);
    this.crossBar(0,this.letterHeight/2);
    this.crossBar(0,this.letterHeight);
    pop();
  }

  this.aniF = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0,0);
    this.crossBar(0,this.letterHeight/2);
    pop();
  }

  this.aniG = function(x,y){
    push();
    translate(x, y);
    this.fullBowl(0, 0, 1);
    this.halfStem(this.letterWidth,this.letterHeight/2);
    this.halfCrossBar(this.letterWidth/2, this.letterHeight/2);
    pop();
  }

  this.aniH = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0, this.letterHeight/2);
    this.fullStem(this.letterWidth,0);
    pop();
  }

  this.aniI = function(x,y){
    push();
    translate(x, y);
    this.fullStem(this.letterWidth/2,0);
    pop();
  }

  this.aniJ = function(x,y){
    push();
    translate(x, y);
    this.jCurve(0, 0);
    pop();
  }

  this.aniK = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfDiagonalLeg(0, this.letterHeight/2, 1);
    this.halfDiagonalLeg(0, this.letterHeight/2, -1);
    pop();
  }

  this.aniL = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.crossBar(0, this.letterHeight)
    pop();
  }

  this.aniM = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullStem(this.letterWidth,0);
    this.diagonalToMiddle(0, 0, 1);
    this.diagonalToMiddle(0, 0, -1);
    pop();
  }

  this.aniN = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.fullStem(this.letterWidth,0);
    this.diagonalToEnd(0, 0, -1);
    pop();
  }

  this.aniO = function(x,y){
    push();
    translate(x, y);
    this.letterO(0, 0);
    pop();
  }

  this.aniP = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    pop();
  }

  this.aniQ = function(x,y){
    push();
    translate(x, y);
    this.letterO(0,0);
    this.halfDiagonalArm(this.letterWidth/2,this.letterHeight/2, -1);
    pop();
  }

  this.aniR = function(x,y){
    push();
    translate(x, y);
    this.fullStem(0,0);
    this.halfBowl(0,0, -1);
    this.halfDiagonalLeg(0, this.letterHeight/2, -1);
    pop();
  }

  this.aniS = function(x,y){
    push();
    translate(x, y);
    // noFill();
    this.sCurve(0,0);
    pop();
  }

  this.aniT = function(x,y){
    push();
    translate(x, y);
    this.fullStem(this.letterWidth/2,0);
    this.crossBar(0,0);
    pop();
  }

  this.aniU = function(x,y){
    push();
    translate(x, y);
    this.uCurve(0,0);
    pop();
  }

  this.aniV = function(x,y){
    push();
    translate(x, y);
    this.diagonalToMiddle(0, 0, 1);
    this.diagonalToMiddle(0, 0, -1);
    pop();
  }

  this.aniW = function(x,y){
    push();
    translate(x, y);
    this.diagonalToQuarter(0, 0, 1);
    this.diagonalToQuarter(0, 0, -1);

    this.diagonalToQuarter(this.letterWidth/2, 0, 1);
    this.diagonalToQuarter(this.letterWidth/2, 0, -1);
    pop();
  }

  this.aniX = function(x, y){
    push();
    translate(x ,y);
    this.diagonalToEnd(0, 0, -1);
    this.diagonalToEnd(0, 0, 1);
    pop();
  }

  this.aniY = function(x,y){
    push();
    translate(x, y);
    this.halfStem(this.letterWidth/2, this.letterHeight/2);
    this.halfDiagonalArm(0,0, 1);
    this.halfDiagonalArm(0,0, -1);
    pop()
  }

  this.aniZ = function(x,y){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
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

    if(this.mode === 1){
      this.static();
    }
    if(this.mode === 2){
      this.dynamic();
    }
    if(this.mode === 3){
      this.static();
      this.dynamic();
    }
    pop()
  }

}


function lineFromToInSteps(x1, y1, x2, y2, stepCount) {
  var aniIndex = frameCount % (stepCount+1);
  var ratio = aniIndex/stepCount;
  var posX = lerp(x1, x2, ratio);
  var posy = lerp(y1, y2, ratio);
  fill(0);
  rectMode(CENTER);
  rect(posX, posy, 10, 10);
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
    var posy = lerp(points[aniIndex].y, points[aniIndex+1].y, ratio);
    fill(0);
    rectMode(CENTER);
    rect(posX, posy, 10, 10);
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
    var posy = lerp(points[aniIndex].y, points[aniIndex+1].y, ratio);
    fill(0);
    rectMode(CENTER);
    rect(posX, posy, 10, 10);
}

function arcFromToInSteps(x, y, radiusWidth, radiusHeight, a1, a2, stepCount) {
  var aniIndex = frameCount % (stepCount+1);
  var ratio = aniIndex/stepCount;
  var angle = lerp(a1, a2, ratio);
  var posX = x + cos(angle) * radiusWidth;
  var posY = y + sin(angle) * radiusHeight;
  fill(0);
  rectMode(CENTER);
  rect(posX, posY, 10, 10);
}


function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (key === "1") aniLetters.mode = 1;
  if (key === "2") aniLetters.mode = 2;
  if (key === "3") aniLetters.mode = 3;

  // spacebar
  if (keyCode == 32) {
    cursorLocation.x += 50;
  }

  // on return
  if (keyCode == ENTER || keyCode == RETURN) {
    cursorLocation.x = 50;
    cursorLocation.y += aniLetters.letterHeight + 5;
  }

  // remove
  // if(keyCode == LEFT_ARROW ){
  //   var pad = 6;
  //   noStroke();
  //   cursorLocation.x -= aniLetters.letterWidth + letterPadding+pad;
  //   rect(cursorLocation.x, cursorLocation.y-pad, aniLetters.letterWidth+letterPadding+pad, aniLetters.letterHeight+pad)
  // }


}

function keyTyped() {
  console.log(aniLetters.mode);
  if(keyCode !== 13 && keyCode != ENTER && keyCode != RETURN && keyCode != 32 && key != 1 && key != 2 && key != 3){

    stroke(0);
    var aniLetter  = 'ani' + key.toUpperCase();
    if(aniLetters[aniLetter]){
      typed.push({letter: aniLetter, x:cursorLocation.x, y: cursorLocation.y});
      cursorLocation.x += aniLetters.letterWidth+letterPadding;
    } else{
      console.log("not a letter")
    }
  }

}

