# chat-material
Simple Node.js + Socket.io chatroom with Materialish design

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
git clone https://github.com/S8Cloud/chat-material.git
```
Install NodeJS and NPM 
```
curl -sL https://deb.nodesource.com/setup_8.x | bash -  
apt-get install nodejs sudo -y
sudo npm i npm -g
sudo npm i express -g
sudo npm i socket.io -g
sudo npm i pm2 -g
```
Install chat-material dependencies
```
cd chat-material/
npm install
```
then just type
```
pm2 start server.js -i 0 --name "chat-material"
```
**Default Listening Port `3180`**
