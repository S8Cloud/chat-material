var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client.html');
});

app.get('/frame', function(req, res){
	res.sendFile(__dirname + '/frame.html');
});


app.use(express.static('public'));

var usercount = 0;
var uniqueID = -1;
var users = {
	private : [],
	public : []
};

io.on('connection', function(socket)
{
	uniqueID++;
	var private = {};

	var addedUser = false;
	// socket.broadcast.emit('sysmessage', users);

	socket.on('message', function(msg)
	{
		var user = users.public[private.uniqueID];
	    io.emit('message', 
	    	{
	    		"color" : user.color, 
	    		"msg" : msg, 
	    		"time" : new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(), 
	    		"nick" : user.nick
	    	});
 	});
	
	socket.on('disconnect', function()
	{
		if (addedUser)
			usercount--;

		delete users.public[private.uniqueID];
		io.sockets.emit('sysmessage', { "users" : users.public, "count" : usercount});
	});

	socket.on('command', function(req)
	{
		console.log(req);
	});



	socket.on('updateProfile', function(data)
	{
		users.public[private.uniqueID] = data;
		io.sockets.emit('sysmessage', { "users" : users.public, "count" : usercount});
	});


	socket.on('onConnect', function(data)
	{

		if (addedUser)
			return;

		addedUser = true;
		usercount++;
		
		private.uniqueID = uniqueID;
		users.public[private.uniqueID] = data;

		// io.emit('uniqueID', user.uniqueID); 
		io.sockets.emit('sysmessage', { "users" : users.public, "count" : usercount});
	});
});

http.listen(9999, function(){
	console.log('listening on *:9999');
});

