/**
 * Simple Collaborative drawing tool using websockets
 * Your drawings show up as ellipses, collaborators are shown as squares
 * Shout out to Dan Shiffman's Websocket example
 *
 * MOUSE
 * left click          : draw
 *
 * KEYS
 * 1-4                 : switch default colors
 * enter               : clear screen
 * space               : new random color
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Joey Lee](http://jk-lee.com)
 *
 * INSPIRED BY
 * [Dan Shiffman](http://shiffman.net/)
 */

'use strict';

var socket;
var params;

var usersCount;
var usersList;

function setup(){
  createCanvas(500,500);
  background(255);
  cursor(CROSS);
  rectMode(CENTER);
  params = {
    x1:0,
    y1:0,
    x2:0,
    y2:0,
    lineModuleSize:1,
    c: color(181,157,0,100)
  };

  // include the socket connection
  socket = io.connect('http://localhost:3000')
  socket.on('mouse', newDrawing);

  // get the number of users and display it
  usersCount = createP("");
  usersCount.position(510,10);
  usersList = createP("");
  usersList.position(510,30);
  getUsers();
  setInterval(getUsers, 2000);

}


// *** Get users ***
function getUsers(){
  httpGet("/count",'json', function(resp){
    usersCount.html("paticipants: <br>" + resp.count);
    var mytext = resp.users.toString().replace(/,/g , "<br>");
    usersList.html("<br><br> ids: <br>" + mytext);
  })
}



function newDrawing(data){
  stroke(0);
  fill(parseColor(data.c));
  strokeWeight(1);
  rect(data.x2, data.y2, 50, 50);
}

function draw(){

  if(mouseIsPressed && mouseButton == LEFT){

    params.x2 = mouseX;
    params.y2 = mouseY;

    fill(parseColor(params.c));
    ellipse(params.x2, params.y2, 50, 50)

    socket.emit('mouse',params);
  }

}


function parseColor(colorObject){
  return color(colorObject.levels[0],colorObject.levels[1],colorObject.levels[2],colorObject.levels[3]);
}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode === ENTER) background(255);

  // change color
  if (key == ' ') params.c = color(random(255), random(255), random(255), random(80, 150));
  //default colors from 1 to 4
  if (key == '1') params.c = color(181,157,0,100);
  if (key == '2') params.c = color(0,130,164,100);
  if (key == '3') params.c = color(87,35,129,100);
  if (key == '4') params.c = color(197,0,123,100);

}


