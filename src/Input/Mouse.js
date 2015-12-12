Vector = require('./../Math/Vector.js');
canvas = require('./../System/Canvas.js');

function Mouse()
{
    this.position = new Vector(0, 0);
    this.buttons = [0, 0, 0];

    this.updatePosition = function(event)
    {
        var canvasRect = canvas.getBoundingClientRect();
        this.position = new Vector(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
    };

    this.buttonDown = function(event)
    {
        this.buttons[event.button] = 1;
    };

    this.buttonUp = function(event)
    {
        this.buttons[event.button] = 0;
    };
}

module.exports = new Mouse();
