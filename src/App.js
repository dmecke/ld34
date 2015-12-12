require('./app.css');

Game = require('./Game.js');
mouse = require('./Input/Mouse.js');
keyboard = require('./Input/Keyboard.js');

var game = new Game();

game.run();

document.addEventListener('mousemove', function() { mouse.updatePosition(event); });
document.addEventListener('mousedown', function() { mouse.buttonDown(event); });
document.addEventListener('mouseup', function() { mouse.buttonUp(event); });
document.addEventListener('keydown', function() { keyboard.addKey(event.keyCode); });
document.addEventListener('keyup', function() { keyboard.removeKey(event.keyCode); });
