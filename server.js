var express=require("express"),app=express(),http=require("http").Server(app),io=require("socket.io")(http);app.get("/",function(e,s){s.sendFile(__dirname+"/client.html")}),app.get("/frame",function(e,s){s.sendFile(__dirname+"/frame.html")}),app.use(express.static("public"));var usercount=0,uniqueID=-1,users={private:[],public:[]};io.on("connection",function(e){uniqueID++;var s={},n=!1;e.on("message",function(e){var n=users.public[s.uniqueID];io.emit("message",{color:n.color,msg:e,time:(new Date).getHours()+":"+(new Date).getMinutes()+":"+(new Date).getSeconds(),nick:n.nick})}),e.on("disconnect",function(){n&&usercount--,delete users.public[s.uniqueID],io.sockets.emit("sysmessage",{users:users.public,count:usercount})}),e.on("command",function(e){console.log(e)}),e.on("updateProfile",function(e){users.public[s.uniqueID]=e,io.sockets.emit("sysmessage",{users:users.public,count:usercount})}),e.on("onConnect",function(e){n||(n=!0,usercount++,s.uniqueID=uniqueID,users.public[s.uniqueID]=e,io.sockets.emit("sysmessage",{users:users.public,count:usercount}))})}),http.listen(3180,function(){console.log("listening on *:3180")});