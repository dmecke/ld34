require('./app.css');

Game = require('./Game.js');
mouse = require('./Input/Mouse.js');
keyboard = require('./Input/Keyboard.js');

var game = new Game();

game.run();

document.addEventListener('mousemove', function(event) { mouse.updatePosition(event); });
document.addEventListener('mousedown', function(event) { mouse.buttonDown(event); });
document.addEventListener('mouseup', function(event) { mouse.buttonUp(event); });
document.addEventListener('touchstart', function(event) { mouse.updatePosition(event); mouse.buttonDown(event); });
document.addEventListener('touchend', function(event) { mouse.buttonUp(event); });
document.addEventListener('keydown', function(event) { keyboard.addKey(event.keyCode); });
document.addEventListener('keyup', function(event) { keyboard.removeKey(event.keyCode); });
