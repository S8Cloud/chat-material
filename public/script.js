var App = App || {};

App.socket = io();
App.nick = "";
// App.color = Math.floor(200 + Math.random()*55) + "," +
// 			Math.floor(200 + Math.random()*55) + "," + 
// 			Math.floor(200 + Math.random()*55);
App.color = getColor();
App.uniqueID = null;

App.socket.on('message', function(res)
{
	res.msg = res.msg.toHtmlEntities();
	// console.log(res);
	document.querySelector("#messages").innerHTML += "<li class='chatmessage' style='background-color:hsl(" + res.color + ")'><span class='nick'>"+ res.nick + " </span><span class='msg'>" + res.msg + "</span><span class='time'>" + res.time + "</span></li>";
	scroll();
});

App.socket.on('uniqueID', function(id)
{
	App.uniqueID = id;
});

App.socket.on('sysmessage', function(data)
{
	// console.log(data);
	var stbar = document.querySelector(".peopleColors");
	stbar.innerHTML = "";
	data.users.forEach(function(item)
	{
		if (item != null)
			stbar.innerHTML += "<span class='coloricle' style='background-color: hsl(" + item.color + ")'><span class='info'>" + item.nick + "</span></span>";
	})

	var statusmain = document.querySelector(".statusmain")
	statusmain.innerHTML = "<span class='coloricle'  onclick='changeColor()' style='background-color: hsl(" + App.color + ")'></span>";
	statusmain.innerHTML += "<div class='nick'>" + App.nick + "</div>";

	if (data.count > 1)
		statusmain.innerHTML += " <div class='peopleCount'> " + data.count + " people online </div>";
	else
		statusmain.innerHTML +=  " <div class='peopleCount'>Only you are online</div>";

});

function scroll() 
{
	var msgs = document.querySelector("#messages");
	msgs.scrollTop = msgs.scrollHeight;
}

function getColor() 
{
	var hue = Math.floor(Math.random() * 120) * 3 ;
	return hue + ", 60%, 85%";
};

function changeColor()
{
	App.color = getColor();
	App.socket.emit('updateProfile', 
	{
		"nick" : App.nick, 
		"color" : App.color, 
			// "uniqueID" : App.uniqueID
		});
};

function simulate()
{
	var stbar = document.querySelector(".peopleColors");
	stbar.innerHTML = "";for (var i = 0; i < 10; i++) 
	{
		stbar.innerHTML += "<span class='coloricle' onclick='changeColor()' style='background-color: hsl(" + getColor() + ")'><span class='info'>Dude</span></span>";
	}
};

function send() 
{
	var input = document.querySelector("#m");
	if (input.value.substr(0,2) == "/c")
		App.socket.emit('command', input.value.substr(3));
	else
		App.socket.emit('message', input.value);
	input.value = "";
	return false;
};

function onConnect() 
{
	App.socket.emit('onConnect', {"nick" : App.nick, "color" : App.color});
}

(function()
{
	App.nick = prompt("Name yourself!", "Guest");
	onConnect();
	// simulate();
})();


String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        return "&#" + s.charCodeAt(0) + ";";
    });
};