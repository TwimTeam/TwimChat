'use strict';

angular.module('chat.services')
    .factory('socketService', [
        function () {
            var socket = io();

            function on(event, callback) {
                socket.on(event, callback);
            }

            function emit(event, eventArgs) {
                socket.emit(event, eventArgs);
            }

            function join(room) {
                socket.emit('joinRoom', room);
            }

            function leave(room) {
                socket.emit('leaveRoom', room);
            }

            function emitRoom(room, event, eventArgs) {
                socket.emit('emitInRoom', room, event, eventArgs);
            }

            function onRoom(room, event, callback) {
                socket.emit('onInRoom', room, event, callback);
            }

            function validateSocketInRoom(room) {
                socket.emit('validateSocketInRoom', room);
            }

            return {
                validateSocketInRoom: validateSocketInRoom,
                on: on,
                emit: emit,
                join: join,
                leave: leave,
                emitRoom: emitRoom,
                onRoom: onRoom
            };
        }
    ]);