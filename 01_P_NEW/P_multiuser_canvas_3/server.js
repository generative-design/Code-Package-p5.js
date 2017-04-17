var express = require('express');
var app = express();
var socket = require('socket.io');
var server = app.listen(3000);
var io = socket(server);

app.use(express.static('public'));


io.sockets.on('connection', newConnection);

var socketCount = {count:0, users:[]};

app.get("/count", function(req, res){
  res.send(socketCount);
})


app.get("/instructions", function(req, res){
  // var instructions = {
  //   init: "draw a circle in the middle of the canvas",
  //   step1: "draw a line of any length from that circle in any direction",
  //   step2: "draw a circle at the end of the last line",
  //   step3: "repeat steps 1 & 2 until the canvas is full"
  // }

  var instructions = {text:"1. draw a circle in the middle of the canvas (press 'a' for circle) <br> 2. draw a line (press 'b' for line) of any length from that circle in any direction<br> 3. draw a circle (press 'a' for circle) at the end of the last line<br> 4. repeat steps 1 & 2 until the canvas is full <br> * do not overlap lines or circles"};

  console.log(instructions)
  res.send(instructions);
})

function newConnection(socket){
  console.log('new connection: ' + socket.id);


  socketCount.count++;
  socketCount.users.push(socket.id);
  console.log("number of sockets:", socketCount);
  socket.on('mouse', mouseMsg);
  socket.on('disconnect', disconnectMsg);

  function mouseMsg(data){
    socket.broadcast.emit('mouse', data);
    // io.sockets.emit('mouse', data);
  }

  function disconnectMsg(){
    console.log("disconnected! " + socket.id);
    socketCount.count--;
    socketCount.users = removeUser(socketCount.users, socket.id);
  }
}

function removeUser(arr, sid){
  var index = arr.indexOf(sid);
  if (index >= 0) {
    arr.splice( index, 1 );
  }
  // console.log(arr);

  return arr;
}


