var appPort =  process.env.PORT || 4000;

var express = require('express'), app = express();
var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);



app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('home.jade');
});

app.get('/control', function(req, res){
  res.render('control.jade');
});



server.listen(appPort);
// app.listen(appPort);


io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});


io.sockets.on('connection', function (socket) {
    socket.on('rewind', function(){
        socket.broadcast.emit('rewind');
    });

    socket.on('pause', function(){
        socket.broadcast.emit('pause');
    });

    socket.on('play', function(){
        socket.broadcast.emit('play');
    });

    socket.on('reset', function(){
        socket.broadcast.emit('reset');
    });

    socket.on('fullscreen', function(){
        socket.broadcast.emit('fullscreen');
    });
});