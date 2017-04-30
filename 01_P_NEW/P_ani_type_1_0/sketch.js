/**
 * description
 *
 * MOUSE
 *
 * KEYS
 * s                   : save png
 */
"use strict";

var cursorLocation = {x:50, y:50};
var aniLetters;

function setup() {
  createCanvas(800,800);
  colorMode(HSB,360,100,100,100);

  strokeWeight(1);
  strokeCap(ROUND);
  aniLetters = new AniLetters(40, 100);

}

function draw() {
  noLoop();

}


function AniLetters(_lwidth, _lheight){
  this.letterWidth = _lwidth;
  this.letterHeight = _lheight;

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

  // TODO - refine
  this.aniJ = function(x,y){
    push();
    translate(x, y);
    // this.jStem(this.letterWidth, 0);
    this.jCurve(0, 0);
    console.log("J");
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

  //TODO
  this.aniS = function(x,y){
    push();
    translate(x, y);
    this.sCurve(0,0);
    console.log("s");
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
    console.log("u")
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

  // ------------- components ---------------
  this.sCurve = function(x1,y1){
    push();
    translate(x1, y1);
    noFill();
    arc(this.letterWidth/2, this.letterHeight*0.25, this.letterWidth, this.letterHeight/2, PI, 0);
    arc(this.letterWidth/2, this.letterHeight*0.75, this.letterWidth, this.letterHeight/2, 0, PI);
    curve(this.letterWidth, -this.letterHeight*1.5, 0, this.letterHeight*0.25, this.letterWidth, this.letterHeight*0.75, this.letterWidth-this.letterWidth, this.letterHeight*0.75+this.letterHeight*1.5)
    pop()
  }

  this.uCurve = function(x1, y1){
    push();
    translate(x1, y1);
    noFill();
    arc(this.letterWidth/2, 0, this.letterWidth, this.letterHeight*2, 0, PI);
    pop()
  }

  this.jCurve = function(x1, y1){
    push();
    translate(x1, y1);
    noFill();
    // arc(this.letterWidth/2, this.letterHeight*0.75, this.letterWidth, this.letterHeight/2, 0, PI);
    bezier(this.letterWidth, 0, this.letterWidth+10, this.letterHeight*1.5, 0, this.letterHeight, 0, this.letterHeight*0.75)
    pop()
  }

  this.jStem = function(x1, y1){
    push();
    translate(x1, y1);
    line(0,0, 0, this.letterHeight*0.75);
    pop();
  }

  this.letterO = function(x1, y1){
    push();
    translate(x1, y1);
    ellipse(this.letterWidth/2, this.letterHeight/2, this.letterWidth, this.letterHeight);
    pop();
  }

  this.halfDiagonalArm = function(x1, y1, direction){
    push();
    translate(x1, y1);
    if(direction == 1){
      line(this.letterWidth/2, this.letterHeight/2, this.letterWidth, 0);
    }
    if (direction == -1){
      line(0, 0, this.letterWidth/2, this.letterHeight/2);
    }
    pop()
  }

  this.diagonalToEnd = function(x1, y1, direction){
    push();
    translate(x1, y1);
    if(direction == 1){
      line(this.letterWidth, 0, 0, this.letterHeight);
    }
    if (direction == -1){
      line(0, 0, this.letterWidth, this.letterHeight);
    }
    pop();
  }

  this.diagonalToQuarter = function(x1, y1, direction){
    push();
    translate(x1, y1);
    if(direction == 1){
      line(0, 0, this.letterWidth/4 , this.letterHeight);
    }
    if(direction == -1){
      line(this.letterWidth/4, this.letterHeight, this.letterWidth/2, 0);
    }
    pop();
  }

  this.diagonalToMiddle = function(x1, y1, direction){
    push();
    translate(x1, y1);
    if(direction == 1){
      line(0, 0, this.letterWidth/2 , this.letterHeight);
    }
    if(direction == -1){
      line(this.letterWidth/2, this.letterHeight, this.letterWidth, 0);
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

    line(0, 0, this.letterHeight/2, endpoint);

    pop();
  }

  this.fullStem = function(x1, y1){
    push();
    translate(x1,y1);
      line(0, 0, 0, this.letterHeight);
    pop();
  }

  this.halfStem =function(x1, y1){
    push();
    translate(x1,y1);
      line(0, 0, 0, this.letterHeight/2);
    pop();
  }

  this.halfCrossBar = function(x1, y1){
    push();
    translate(x1,y1);
      line(0, 0, this.letterWidth/2, 0);
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
    curve(cPoint*direction, 0, 0,0,0,this.letterHeight/2,cPoint*direction,this.letterHeight/2)
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
    curve(cPoint*direction, 0, 0,0,0,this.letterHeight, cPoint*direction,this.letterHeight)
    pop();

  }

  this.crossBar = function(x1, y1){
    push()
    translate(x1, y1);
    line(0, 0, this.letterWidth, 0);
    pop()
  }

}




function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode == 32) {
    cursorLocation.x += 50;
  }

  if (keyCode == ENTER || keyCode == RETURN) {
    cursorLocation.x = 50;
    cursorLocation.y += aniLetters.letterHeight + 5;
  }


}

function keyTyped() {
  if(keyCode !== ENTER || keyCode !== RETURN || keyCode != 32 || key != ' '){
    console.log(key);
    console.log(keyCode);
    var thing  = 'ani' + key.toUpperCase();
    aniLetters[thing](cursorLocation.x, cursorLocation.y);
    cursorLocation.x += aniLetters.letterWidth+20;
  }

}


