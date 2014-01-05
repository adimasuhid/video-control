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
    // kept for reference
	socket.on('setPseudo', function (data) {
		socket.set('pseudo', data);
	});
	socket.on('message', function (message) {
		socket.get('pseudo', function (error, name) {
			var data = { 'message' : message, pseudo : name };
			socket.broadcast.emit('message', data);
			console.log("user " + name + " send this : " + message);
		})
	});

    socket.on('rewind', function(setTime){
        socket.broadcast.emit('rewind', setTime);
    });
});