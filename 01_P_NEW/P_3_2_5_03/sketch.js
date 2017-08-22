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
 * enter                     : new line
 *
 * CONTRIBUTED BY
 * [Joey Lee](http://jk-lee.com)
 */
"use strict";

var font;
var fontSize = 120;
var style = 1;
var padding = 10;
var myAnimatedText;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noCursor();
  imageMode(CENTER);
  rectMode(CENTER);


  myAnimatedText = new animatedType();
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
  // background(255, 255, 255, 2);
  background(255, 255, 255, 50);

  // margin border
  translate(20,150);

  fill(0);

  myAnimatedText.getLineCount();
  myAnimatedText.getPaths();
  // myAnimatedText.getAllPaths();
  // myAnimatedText.getRanges();
  myAnimatedText.getCoordinates();
  // myAnimatedText.getAllCoordinates();

  
  
  // // draw methods
  // myAnimatedText.show();
  // myAnimatedText.showAll();
  myAnimatedText.lines2mouse();

  

}



function animatedType(){
  var that = this;
  that.textTyped = [];
  that.paths = [];
  that.ranges = [];
  that.lineCount = 0;
  that.letterCoordinates = [];

  that.drawMode = 1;
  that.style = 1;

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
  this.getAllPaths = function(){
    // clear the paths each loop
    that.paths = [];
  
    // go though each of the text objects
    that.textTyped.forEach(function(txt, lineNum){
      if(txt.text.length > 0){
        // for each string of text, split it up to each letter
        txt.text.split('').forEach(function(d){
          var fontPath = font.getPath(d, 0, 0, fontSize);
          // convert it to a g.Path object
          var path = new g.Path(fontPath.commands);
          // resample it with equidistant points
          path = g.resampleByLength(path, 1);

          // structure the relevant path data
          var pathData = {
            data: path,
            lineNumber: lineNum,
            len: path.commands.length,
            breaks: floor(path.commands.length / txt.text.length)
          };
          
          that.paths.push(pathData);
        })

      }
    });

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
          path = g.resampleByLength(path, 4);
          // console.log(fontPath.getBoundingBox())

          // structure the relevant path data
          var pathData = {
            data: path,
            lineNumber: lineNum,
            len: path.commands.length,
            breaks: floor(path.commands.length / txt.text.length)
          };
          
          that.paths.push(pathData);
      }
    });

  } 

  // get the ranges
  this.getRanges = function(){
    // clear the ranges each loop
    that.ranges = [];
    // for each path, retrieve a list of
    // the starting locations of each letter
    that.paths.forEach(function(path, idx){
      var startingLocations = {id: idx, start:[]};
      for(var i = 0; i < path.len-1; i+=path.breaks){
        startingLocations.start.push(floor(i));
      }
      that.ranges.push(startingLocations);
    });

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

  // get all the coordinates
  this.getAllCoordinates = function(){
    // clear the coordinates each loop
    that.coordinates = [];

    // for each of the letters
    that.paths.forEach(function(path, idx){
          
      var letterCoords = [];          
      path.data.commands.forEach(function(coord){
        if(coord.x != undefined && coord.y != undefined){
          var yOffset = path.lineNumber*fontSize;

          letterCoords.push({x: coord.x, y: coord.y + yOffset})
        }
      })

      var coordsXMax =  floor(Math.max.apply(Math, letterCoords.map(function(o){return o.x;})))
      var coordsXMin =  floor(Math.min.apply(Math, letterCoords.map(function(o){return o.x;})))
      var coordsYMax =  floor(Math.max.apply(Math, letterCoords.map(function(o){return o.y;})))
      var coordsYMin =  floor(Math.min.apply(Math, letterCoords.map(function(o){return o.y;})))

      that.coordinates.push({
        coords: letterCoords,
        xMax:coordsXMax,
        xMin:coordsXMin,
        yMax:coordsYMax,
        yMin:coordsYMin
      });
      
    });
  } // end getAllCoordinates();


  /* 
  keyboard interaction Methods
  */

  // remove letters
  this.removeLetters = function(){
    var textTypedCounter = that.lineCount;

    if (textTypedCounter >= 0 && that.textTyped[0].text.length > 0){
     that.textTyped[textTypedCounter].text = that.textTyped[textTypedCounter].text.substring(0,max(0,that.textTyped[textTypedCounter].text.length-1));
    } 

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
    myAnimatedText.textTyped[myAnimatedText.lineCount].text += _key;
  }


  /* 
  Rendering Methods
  */

  // show all the points
  this.show = function(){
    that.coordinates.forEach(function(coords){
      stroke(random(255),random(255),random(255))
      ellipse(coords.x, coords.y,5, 5);
    })
  } // end this.show();


  this.showAll = function(){
    that.coordinates.forEach(function(coords){
        strokeWeight(1);
        coords.coords.forEach(function(d){
          ellipse(d.x, d.y, 10, 10)
        })
    })

  } 

  this.linesAllStructure = function(){
    that.coordinates.forEach(function(coords){
        strokeWeight(1);
        coords.coords.forEach(function(d){
          line((coords.xMin+coords.xMax)/2, (coords.yMax+coords.yMin)/2, d.x, d.y)
        })
    })
  }

  this.linesStructure = function(){
    that.coordinates.forEach(function(coords){
        strokeWeight(1);
        line(mouseX, mouseY, coords.x, coords.y)
    })
  }

  this.lines2mouse = function(){
    that.coordinates.forEach(function(coords){
        strokeWeight(1);
        line( coords.x + map(mouseX, 0, width, -100, 100), coords.y + map(mouseY, 0, height, -100, 100), coords.x, coords.y)
    })
  }


} // end animatedType object


function keyPressed(){
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    myAnimatedText.removeLetters();
  } 

  if (keyCode === ENTER || keyCode === RETURN) {
    myAnimatedText.addLines();
  }

}

function keyTyped() {
  if (keyCode >= 32){
    myAnimatedText.addCharacters(key);
  }
}



// function keyPressed() {

//   } else if (keyCode === TAB || keyCode === ENTER || keyCode === RETURN || keyCode === ESCAPE) {
//     console.log("enter!")
//     textTyped.push(new myText(""));
//     textTypedCounter++;
//   } else {
//     if(key == "1"){
//       style = 1;
//     }else if(key == "2"){
//       style = 2;
//     }else if(key == "3"){
//       style = 3;
//     }else if(key == "4"){
//       style = 4;
//     }else{
//       textTyped[textTypedCounter].text += key;
//     }
//     loop()
//   }

// }

