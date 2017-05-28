/**
 * Simple Collaborative Conditional Drawing Exercise
 * 1. draw a circle in the middle of the canvas (press 'a' for circle)
 * 2. draw a line (press 'b' for line) of any length from that circle in any direction
 * 3. draw a circle (press 'a' for circle) at the end of the last line
 * 4. repeat steps 1 & 2 until the canvas is full
 * do not overlap lines or circles
 *
 * MOUSE
 * drag                : draw
 *
 * KEYS
 * 1-4                 : switch default colors
 * enter               : clear screen
 * space               : new random color
 * s                   : save png
 * a, A                : create a circle
 * b, B                : create a line
*/

'use strict';

var socket;
var params;

var circleSize = 20;

var usersCount;
var usersList;
var instructions;

function setup(){
  createCanvas(500,500);
  background(255);
  cursor(CROSS);
  rectMode(CENTER);
  stroke(0);

  params = {
    x1:0,
    y1:0,
    x2:0,
    y2:0,
    lineModuleSize:1,
    c: color(181,157,0,100),
    shape: "circle"
  };

  // include the socket connection
  socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing);

  // get the number of users and display it
  usersCount = createP("");
  usersCount.position(width+10,10);
  usersList = createP("");
  usersList.position(width+10,30);

  instructions = createP("");
  instructions.position(10, height+10);

  getUsers();
  setInterval(getUsers, 2000);

  // instruct();

}


// *** Get users ***
function getUsers(){
  httpGet("/count",'json', function(resp){
    usersCount.html("paticipants: <br>" + resp.count);
    var mytext = resp.users.toString().replace(/,/g , "<br>");
    usersList.html("<br><br> ids: <br>" + mytext);
  })
}

// *** create instructions ***
// function instruct(){
//   httpGet("/instructions",'json', function(resp){
//     console.log(resp.text);
//     instructions.html(resp.text);
//   })

// }

function newDrawing(data){

  // console.log(data);
  // stroke(0);
  // fill(parseColor(data.c));
  // strokeWeight(1);
  // rect(data.x2, data.y2, 50, 50);

  if(data.shape == "circle"){
    stroke(255);
    fill(parseColor(data.c));
    ellipse(data.x2, data.y2, circleSize, circleSize)
  }
  if(data.shape == "line"){
    stroke(0);
    line(data.x1, data.y1, data.x2, data.y2);
  }

}

function draw(){
  stroke(255);
  if(mouseIsPressed){
    params.x1 = pmouseX;
      params.y1 = pmouseY;
      params.x2 = mouseX;
      params.y2 = mouseY;

      socket.emit('mouse',params);

    if(params.shape == "circle"){

      fill(parseColor(params.c));
      ellipse(params.x2, params.y2, circleSize, circleSize)
    }
    if(params.shape == "line"){
      stroke(0);
      line(params.x1, params.y1, params.x2, params.y2);
    }

  }


}




function parseColor(colorObject){
  return color(colorObject.levels[0],colorObject.levels[1],colorObject.levels[2],colorObject.levels[3]);
}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode === DELETE || keyCode === BACKSPACE) background(255);
  // if (keyCode === ENTER) background(255);

  // change color
  if (key == ' ') params.c = color(random(255), random(255), random(255), random(80, 150));
  //default colors from 1 to 4
  if (key == '1') params.c = color(181,157,0,100);
  if (key == '2') params.c = color(0,130,164,100);
  if (key == '3') params.c = color(87,35,129,100);
  if (key == '4') params.c = color(197,0,123,100);
  if (key == 'a' || key =='A') params.shape = "circle";
  if (key == 'b' || key =='B') params.shape = "line";
  // erase with white circle
  if( key == '0') params.c = color(255, 255, 255, 255);

}


