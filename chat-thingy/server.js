var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 8000;

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log("User has connected!");

    socket.on('chatMessage', function (message) {
        var sentMessage = {content: message.content};
        io.in(message.room).emit('chatMessage', sentMessage);
    });
    
    socket.on('validateSocketInRoom', function(room){
        if(socket.rooms.indexOf(room) < 0){
            io.emit('');
        }

        return true;
    });

    socket.on('joinRoom', function (room) {
        socket.join(room);
    });

    socket.on('leaveRoom', function (room) {
        socket.leave(room);
    });
});

http.listen(port, function () {
    console.log('Listening on port: ' + port);
});
