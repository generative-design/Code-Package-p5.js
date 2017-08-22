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
var texture1;
var padding = 10;
var myAnimatedText;

function preload(){
  texture1= loadImage("data/texture1.png"); 
}

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

  frameRate(1)
  
}



function draw() {
  // noLoop();
  if (!font) return;
  // background(255, 255, 255, 2);
  background(255, 255, 255, 50);
  // background(255, 255, 255);

  // margin border
  translate(20,150);

  fill(0);

  myAnimatedText.getLineCount();
  myAnimatedText.getPaths();
  myAnimatedText.getRanges();
  myAnimatedText.getCoordinates();
  
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

  this.getLineCount = function(){
    // set the lineCount to the number of "lines" or text object 
    // in the textTyped Array
    if(that.textTyped.length > 0){
      that.lineCount = that.textTyped.length -1;
    } else{
      that.lineCount = 0;
    }
  }


  // get the path objects for each line typed
  this.getAllPaths = function(){
    // clear the paths each loop
    that.paths = [];
  
    // go though each of the text objects
    that.textTyped.forEach(function(txt, lineNum){
      if(txt.text.length > 0){
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

  } // end this.getAllPaths()

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

  } // end this.getPaths()

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

  } // end this.getRanges()

  // create a text object to hold each line of text
  // usage: this.textTyped.push(this.addText("hello"))
  this.addText = function(_text){
    var textObject = {counter:0, text:_text}
    return textObject;
  } // end this.addText()

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
  } // end getAllCoordinates();

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
  Rendering Methods
  */

  // show all the points
  this.show = function(){
    that.coordinates.forEach(function(coords){
      stroke(random(255),random(255),random(255))
      ellipse(coords.x, coords.y,5, 5);
    })
  } // end this.show();

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

  // if(style === 4){
  //   push();
  //   translate(d.commands[i].x, d.commands[i].y);
  //   rotate(radians(angle));
  //   fill(65, 105, 185);
  //   noStroke();
  //   ellipse(0+shiftX2, 0+shiftY2, rectSize/2, rectSize/2);
  //   pop();

  //   strokeWeight(0.1);
  //   line((xMin+xMax)/2, (yMax+yMin)/2,d.commands[i].x, d.commands[i].y );
  // }


  // this.animatePoints = function(){

  //   // for each of the letters
  //   that.ranges.forEach(function(range, i){
  //     range.start.forEach(function(d){
  //       if(that.textTyped[i].counter < that.paths[i].breaks){
  //           var pathIndex = that.textTyped[i].counter + d;
  //           var cmd = that.paths[i].data.commands[pathIndex];
  //           var ocmd = that.paths[i].data.commands[ceil(that.paths[i].breaks) - pathIndex];
  //           if(cmd !=undefined && ocmd != undefined){
  //             var yOffset = that.paths[i].lineNumber*fontSize;
  //             var featWidth = fontSize*random(0.10);
  //             if(that.style == 1){
  //               // stroke(65, 105, 185, 150);
  //               fill(65, 105, 185)
  //               ellipse(cmd.x, cmd.y + yOffset, featWidth, featWidth);
  //             }
  //             if(that.style == 2){
  //               // stroke(65, 105, 185, 150);
  //               push()
  //               // fill(65, 105, 185)
  //               stroke(0)
  //               strokeWeight(2)
  //               fill(255)
  //               translate(cmd.x, cmd.y + yOffset)
  //               rotate(radians(frameCount))
  //               rect(0,0, featWidth, featWidth);
  //              pop()
  //             }
  //             if(that.style == 3){
  //               push()
  //               translate(cmd.x, cmd.y + yOffset)
  //               rotate(radians(frameCount))
  //               image(texture1, 0,0, 15, 15);
  //               pop()
  //               // stroke(65, 105, 185, 150);
  //               // line(cmd.x, cmd.y + (paths[i].lineNumber*fontSize), mouseX - 20, mouseY - 150); // adjusted for translation
  //               // noStroke();

  //               // fill(65, 105, 185);
  //               // ellipse(cmd.x, cmd.y + (paths[i].lineNumber*fontSize), 6,6);
  //             }

  //           }
  //         that.textTyped[i].counter++;
  //       }else{
  //         that.textTyped[i].counter = 0;
  //       }

  //     });

  //   });
  // } // end animatePoints();

  


} // end animatedType object




// function keyPressed() {
//   if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

//   if (keyCode === DELETE || keyCode === BACKSPACE || keyCode === LEFT_ARROW) {

//     if (textTypedCounter >= 0 && textTyped[0].text.length > 0){
//      textTyped[textTypedCounter].text = textTyped[textTypedCounter].text.substring(0,max(0,textTyped[textTypedCounter].text.length-1));
//     } else{
//       console.log("nada")
//     }

//     if(textTyped[textTypedCounter].text.length == 0){
//         textTypedCounter--;
//         if(textTypedCounter < 0){
//           console.log("nothing left")
//           textTypedCounter = 0;
//         }else{
//           textTyped.pop();
//         }
//     }

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

