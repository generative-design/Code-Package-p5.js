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

var textTyped;
var textTypedCounter;
var font;
var fontSize = 120;
var style = 1;
var path;
var paths;
var ranges;
var breaks;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  // push text 
  textTyped = [];
  textTyped.push(new myText("TYPE...!"));

  // set the textTypedCounter to the number of lines
  if(textTyped.length > 0){
    textTypedCounter = textTyped.length -1;
  } else{
    textTypedCounter = 0;
  }

  rectMode(CENTER);

  // read in the font to opentype.js
  opentype.load('data/FreeSans.otf', function(err, f) {
    if (err) {
      print('Font could not be loaded: ' + err);
    } else {
      font = f;
      loop();
    }
  });
}


// create an array of strings
// each string is a line
// if enter is pressed, create a new string,
// and move to a new line using on the cmd.x, cmd.y

function draw() {
  // noLoop();
  if (!font) return;
  background(255, 255, 255, 30);
  // margin border
  translate(20,150);

  fill(0);

  paths = [];
  textTyped.forEach(function(txt, lineNum){
    if(txt.text.length > 0){
      var fontPath = font.getPath(txt.text, 0, 0, fontSize);
      // convert it to a g.Path object
      path = new g.Path(fontPath.commands);
      // resample it with equidistant points
      path = g.resampleByLength(path, 1);

      var output = {
        data: path,
        lineNumber: lineNum,
        len: path.commands.length,
        breaks: floor(path.commands.length / txt.text.length)
      };
      paths.push(output);
    }
  })


  ranges = [];
  paths.forEach(function(path, index){
    var output = {id: index, start:[]};
    for(var i = 0; i < path.len-1; i+=path.breaks){
      output.start.push(floor(i));
    }
    ranges.push(output);
  })


  ranges.forEach(function(range, i){
    // console.log(range.start);
    range.start.forEach(function(d){
      if(textTyped[i].counter < paths[i].breaks){
          var cmd = paths[i].data.commands[textTyped[i].counter+ d];
          var ocmd = paths[i].data.commands[ceil(paths[i].breaks) - textTyped[i].counter + d];
          if(cmd !=undefined && ocmd != undefined){

            if(style == 1){
              stroke(65, 105, 185, 150);
              fill(65, 105, 185)
              ellipse(cmd.x, cmd.y + (paths[i].lineNumber*fontSize), fontSize*0.10, fontSize*0.10);
            }
            if(style == 2){
              stroke(65, 105, 185, 150);
              fill(65, 105, 185)
             rect(cmd.x, cmd.y + (paths[i].lineNumber*fontSize), fontSize*0.10, fontSize*0.10);
            }
            if(style == 3){
              stroke(65, 105, 185, 150);
              noCursor();
              line(cmd.x, cmd.y + (paths[i].lineNumber*fontSize), mouseX - 20, mouseY - 150); // adjusted for translation
              noStroke();

              fill(65, 105, 185);
              ellipse(cmd.x, cmd.y + (paths[i].lineNumber*fontSize), 6,6);

            }
          }
        textTyped[i].counter++;
      }else{
        textTyped[i].counter = 0;
      }

    });

  });

}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE || keyCode === LEFT_ARROW) {
    // remove the last letter and destroy each string in the array
    // until all the strings are gone

    if (textTypedCounter >= 0 && textTyped[0].text.length > 0){
     textTyped[textTypedCounter].text = textTyped[textTypedCounter].text.substring(0,max(0,textTyped[textTypedCounter].text.length-1));
    } else{
      console.log("nada")
    }

    if(textTyped[textTypedCounter].text.length == 0){
        textTypedCounter--;
        if(textTypedCounter < 0){
          console.log("nothing left")
          textTypedCounter = 0;
        }else{
          textTyped.pop();
        }
    }

  } else if (keyCode === TAB || keyCode === ENTER || keyCode === RETURN || keyCode === ESCAPE) {
    console.log("enter!")
    textTyped.push(new myText(""));
    textTypedCounter++;
  } else {
    if(key == "1"){
      style = 1;
    }
    else if(key == "2"){
      style = 2;
    }
    else if(key == "3"){
      style = 3;
    }else{
      textTyped[textTypedCounter].text += key;
    }
    loop()
  }

}

function myText(_text){
    var output = {counter:0, text:_text}
    return output;
  }
