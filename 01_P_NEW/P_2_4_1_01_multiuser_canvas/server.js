var express = require('express');
var app = express();
var socket = require('socket.io');
var server = app.listen(3000);
var io = socket(server);

app.use(express.static('public'));


io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection: ' + socket.id);

  socket.on('mouse', mouseMsg);
  socket.on('disconnect', disconnectMsg);

  function mouseMsg(data){
    socket.broadcast.emit('mouse', data);
    // io.sockets.emit('mouse', data);
  }

  function disconnectMsg(){
    console.log("disconnected!");
  }
}




