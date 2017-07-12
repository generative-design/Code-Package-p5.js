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


