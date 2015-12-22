require('./app.css');

import Game from "./Game";
import mouse from "./Input/Mouse";
import keyboard from "./Input/Keyboard";

var game = new Game();

game.run();

document.addEventListener('mousemove', function(event) { mouse.updatePosition(event); });
document.addEventListener('mousedown', function(event) { mouse.buttonDown(event); });
document.addEventListener('mouseup', function(event) { mouse.buttonUp(event); });
document.addEventListener('touchstart', function(event) { mouse.updatePosition(event); mouse.buttonDown(event); });
document.addEventListener('touchend', function(event) { mouse.buttonUp(event); });
document.addEventListener('keydown', function(event) { keyboard.steer(event.keyCode); });
