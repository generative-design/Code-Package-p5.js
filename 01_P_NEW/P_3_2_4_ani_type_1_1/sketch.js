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
var fontSize;
var style;
var path;
var paths;
var ranges;
var breaks;
var counters;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  // assign globals
  textTyped = [];
  counters = [];
  textTyped.push("HELLO");
  counters.push(0);
  textTyped.push("WORLD");
  counters.push(0);
  textTypedCounter = 0;
  fontSize = 120;
  style = 1;


  rectMode(CENTER);

  opentype.load('../../data/FreeSans.otf', function(err, f) {
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
  translate(20,220);

  fill(0);


  // each line of text needs to be animating on its own
  paths = [];

  textTyped.forEach(function(txt, lineNum){
    if(txt.length > 0){
      var fontPath = font.getPath(txt, 0, 0, fontSize);
      // convert it to a g.Path object
      path = new g.Path(fontPath.commands);
      // resample it with equidistant points
      path = g.resampleByLength(path, 1);

      var output = {
        data: path,
        lineNumber: lineNum,
        len: path.commands.length,
        breaks: floor(path.commands.length / txt.length)
      };
      paths.push(output);



    }
  })


  ranges = [];
  paths.forEach(function(path, index){
    var output = {id: index, start:[]};
    // console.log(path.len)
    for(var i = 0; i < path.len-1; i+=path.breaks){
      output.start.push(floor(i));
    }
    ranges.push(output);
  })



  ranges.forEach(function(range, i){
    // console.log(range.start);
    range.start.forEach(function(d){
    if(counters[i] < paths[i].breaks){
        var cmd = paths[i].data.commands[counters[i]+ d];
        var ocmd = paths[i].data.commands[ceil(paths[i].breaks) - counters[i] + d];
        if(cmd !=undefined && ocmd != undefined){

          if(style == 1){
            ellipse(cmd.x, cmd.y + (paths[i].lineNumber*fontSize), fontSize*0.10, fontSize*0.10);
          }
          if(style == 2){
           rect(cmd.x, cmd.y + (paths[i].lineNumber*fontSize), fontSize*0.10, fontSize*0.10);
          }
          if(style == 3){
            line(cmd.x, cmd.y+ (paths[i].lineNumber*fontSize), ocmd.x , ocmd.y+ (paths[i].lineNumber*fontSize));
          }
        }
      counters[i]++;
    }else{
      counters[i] = 0;
    }
    })

  })


}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE || keyCode === LEFT_ARROW) {
    // remove the last letter and destroy each string in the array
    // until you kill all the strings

    if (textTypedCounter >= 0 && textTyped[0].length > 0){
     textTyped[textTypedCounter] = textTyped[textTypedCounter].substring(0,max(0,textTyped[textTypedCounter].length-1));
    } else{
      console.log("nada")
    }

    if(textTyped[textTypedCounter].length == 0){
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
    textTyped.push("");
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
      textTyped[textTypedCounter] += key;
    }
    loop()
  }

}
