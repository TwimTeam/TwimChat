var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mongoose = require('mongoose'),
    atob = require('atob'),
    btoa = require('btoa'),
    router = express.Router();

var port = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static(__dirname + '/public'));

// ====================================================
// MONGODB LOGIC

mongoose.connect('mongodb://localhost/twimDatabase');

var Room = require('./app/models/room');
var User = require('./app/models/user');

// ====================================================
// ROUTING LOGIC

router.use(function (req, res, next) {
    console.log("(" + new Date().toJSON().slice(0, 10) + ")" + " Status: running.");
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'Got me!'});
});

// router.route('/')
//     .get(function(req, res) {
//
//     })
//     .post(function(req, res) {
//
//     })
//     .put(function(req, res) {
//
//     })
//     .delete(function(req, res) {
//
//     });

router.route('/users')
    .get(function (req, res) {
        res.status(405).send({error: 'Unsupported action.'});
    })
    .post(function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user._authToken = btoa(user.username + ':' + user.password);

        user.save(function (error) {
            if (error) {
                res.send({error: error});
            }

            res.json({message: 'User registered successfully.'});
        });
    })
    .put(function (req, res) {
        res.status(405).send({error: 'Unsupported action.'});
    })
    .delete(function (req, res) {
        res.status(405).send({error: 'Unsupported action.'});
    });

router.route('/users/login')
    .get(function (req, res) {
        res.status(405).send({error: 'Unsupported action.'});
    })
    .post(function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var requestResult = false;

        var query = User.findOne({'username': username});
        query.select('_id username password _authToken');

        query.exec(function (error, user) {
            if (error) {
                res.send({error: "The username does not exist."});
            }

            res.json(user);
        }).then(function(success) {
            var user = success;

            if (user.password == password) {
                res.json({_id: user._id, username: user.username, _authToken: user._authToken});
            }
            else {
                res.status(400).send({error: 'Invalid username or password.'});
            }

        }, function(error) {
            res.send(error);
        });
    })
    .put(function (req, res) {
        res.status(405).send({error: 'Unsupported action'});
    })
    .delete(function (req, res) {
        res.status(405).send({error: 'Unsupported action'});
    });


router.route('/rooms')
    .get(function (req, res) {
        var userAuthorization = req.get('Authorization');

        if (userAuthorization) {
            var authArguments = userAuthorization.split(' ');

            if (authArguments[0] == 'User') {
                var userCredentials = atob(authArguments[1]).split(':');
            }
            else {
                var error = 'Invalid Credentials.';
                res.status(401).send({error: error});
                return;
            }
        }
        else {
            var error = 'Invalid Credentials.';
            res.status(401).send({error: error});
            return;
        }

        Room.find(function (error, rooms) {
            if (error) {
                res.send({error: error});
            }

            res.json(rooms);
        });
    })
    .post(function (req, res) {
        var userAuthorization = req.get('Authorization');

        if (userAuthorization) {
            var authArguments = userAuthorization.split(' ');
            if (authArguments[0] == 'User') {
                var userCredentials = atob(authArguments[1]).split(':');
            }
            else {
                var error = 'Invalid Credentials.';
                res.status(401).send({error: error});
                return;
            }
        }
        else {
            var error = 'Invalid Credentials.';
            res.status(401).send({error: error});
            return;
        }

        var room = new Room();
        room.name = req.body.name;

        room.save(function (error) {
            if (error) {
                res.send(error);
            }

            res.json({message: 'Room posted successfully!'})
        });
    })
    .put(function (req, res) {
        res.status(405).send({error: 'Unsupported action'});
    })
    .delete(function (req, res) {
        res.status(405).send({error: 'Unsupported action'});
    });

// ====================================================
// SOCKET.IO LOGIC

io.on('connection', function (socket) {
    console.log("User has connected!");

    socket.on('chatMessage', function (eventArgs) {
        var sentMessage = {content: eventArgs.content, user: eventArgs.user};
        io.in(eventArgs.room).emit('chatMessage', sentMessage);
    });

    socket.on('joinRoom', function (eventArgs) {
        io.in(eventArgs.room).emit('joinedRoom', eventArgs.user);
        socket.join(eventArgs.room);
    });

    socket.on('leaveRoom', function (eventArgs) {
        socket.leave(eventArgs.room);
        io.in(eventArgs.room).emit('leftRoom', eventArgs.user);
    });
});

// ====================================================
// SERVER START

http.listen(port, function () {
    console.log('Listening on port: ' + port);
});
