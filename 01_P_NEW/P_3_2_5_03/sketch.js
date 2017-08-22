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
  background(255, 255, 255, 10);
  // background(255, 255, 255, 50);

  // margin border
  translate(20,150);

  fill(0);

  myAnimatedText.getLineCount();
  myAnimatedText.getPaths();
  // myAnimatedText.getAllPaths();
  myAnimatedText.getCoordinates();
  // myAnimatedText.getAllCoordinates();

  // draw methods
  if(myAnimatedText.drawMode == 1){
    myAnimatedText.animatedPoints();  
  }
  if(myAnimatedText.drawMode == 2){
    myAnimatedText.lines2mouse();
  }
  if(myAnimatedText.drawMode == 3){
    myAnimatedText.show();
  }
  
  

}



function animatedType(){
  var that = this;
  that.textTyped = [];
  that.paths = [];
  that.ranges = [];
  that.lineCount = 0;
  that.letterCoordinates = [];
  that.pointDensity = 4;

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

  // get the path objects for each line typed
  this.getAllPaths = function(){
    // clear the paths each loop
    that.paths = [];

    // we need:
    // starting location
    // number of points per letter

  
    // go though each of the text objects
    that.textTyped.forEach(function(txt, lineNum){
      if(txt.text.length > 0){
        // for each string of text, split it up to each letter
        txt.text.split('').forEach(function(d){
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
            breaks: floor(path.commands.length / txt.text.length)
          };
          
          that.paths.push(pathData);
        })

      }
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
    that.textTyped[that.lineCount].text += _key;
  }


  /* 
  Rendering Methods
  */

  // show all the points with random color
  this.show = function(){
    that.coordinates.forEach(function(coords){
      stroke(random(255),random(255),random(255))
      ellipse(coords.x, coords.y,5, 5);
    })
  } // end this.show();

  // follow the mouse with extruded lines
  this.lines2mouse = function(){
    that.coordinates.forEach(function(coords){
        strokeWeight(1);
        line( coords.x + map(mouseX, 0, width, -100, 100), coords.y + map(mouseY, 0, height, -100, 100), coords.x, coords.y)
    })
  }

  // animate the points
  this.animatedPoints = function(){
    that.paths.forEach(function(path, idx){
      path.ranges.forEach(function(d){
        var cmd = path.data.commands[that.textTyped[idx].counter + d];
        
        if((cmd != undefined) && (that.textTyped[idx].counter < path.breaks)){
            var yOffset = path.lineNumber*fontSize;    
            ellipse(cmd.x, cmd.y + yOffset, fontSize*0.10, fontSize*0.10);
            that.textTyped[idx].counter++;
        }else{
            that.textTyped[idx].counter = 0;
        }

      });
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
    if (myAnimatedText.drawMode < 1) myAnimatedText.drawMode = 4;
  }
  if (keyCode === RIGHT_ARROW) {
    myAnimatedText.drawMode++;
    if (myAnimatedText.drawMode > 4) myAnimatedText.drawMode = 1;
  }

  if (keyCode === DOWN_ARROW) {
    myAnimatedText.pointDensity--;
    if (myAnimatedText.pointDensity < 2) myAnimatedText.pointDensity = 2;
  }
  if (keyCode === UP_ARROW) {
    myAnimatedText.pointDensity++;
  }

}

function keyTyped() {
  if (keyCode >= 32){
    myAnimatedText.addCharacters(key);
  }
}



  // get the ranges
  // this.getRanges = function(){
  //   // clear the ranges each loop
  //   that.ranges = [];
  //   // for each path, retrieve a list of
  //   // the starting locations of each letter
  //   that.paths.forEach(function(path, idx){
  //     var startingLocations = {id: idx, start:[]};
  //     for(var i = 0; i < path.len-1; i+=path.breaks){
  //       startingLocations.start.push(floor(i));
  //     }
  //     that.ranges.push(startingLocations);
  //   });
  // } 
