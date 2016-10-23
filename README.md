# chat-material
Simple Node.js + Socket.io chatroom with Materialish design

Check out the demo here [chat.gach.space](http://chat.gach.space)

#### UPDATE 1:
- Added [chat.gach.space/frame](http://chat.gach.space/frame) for iframe embedding functionality

## Basic functionality
- Send and receive messages.
- Randomly generated beautiful colors for every participant. (120 different combinations)
- See people online by hovering over color-coded circles on the top-right side of the window.
- Change the personal color by clicking the color circle on the top-left side of the window.

## Stack
- Node.JS
- Socket.io
- Express

---
## How to install chat-material
Download repo
```
git clone https://github.com/georgegach/chat-material.git
```
Install NodeJS and NPM 
```
sudo apt-get install nodejs
sudo apt-get install npm
```
Install chat-material dependencies
```
cd chat-material/
npm install
```
then just type
```
nodejs server.js
```
or if you want to run it forever 
```
sudo npm install forever -g
sudo apt-get install nodejs-legacy 
forever start server.js
```
you can list currently running forever daemons from 
```
forever list
```
---

### App screenshot
![screenshot](https://raw.githubusercontent.com/georgegach/chat-material/master/res/screenshot.JPG)
