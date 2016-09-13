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

            function join(args) {
                socket.emit('joinRoom', args);
                sessionStorage.setItem('room', args.room);
            }

            function leave(args) {
                socket.emit('leaveRoom', args);
                sessionStorage.setItem('room', '');
            }

            function validateSocketInRoom(room) {
                socket.emit('validateSocketInRoom', room);
            }

            return {
                validateSocketInRoom: validateSocketInRoom,
                on: on,
                emit: emit,
                join: join,
                leave: leave
            };
        }
    ]);