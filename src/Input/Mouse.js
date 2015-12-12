Timer = require('./../Util/Timer.js');
Vector = require('./../Math/Vector.js');
canvas = require('./../System/Canvas.js');

function Mouse()
{
    this.position = new Vector(0, 0);
    this.click = false;
    this.timer = new Timer(30);

    this.updatePosition = function(event)
    {
        var canvasRect = canvas.getBoundingClientRect();
        var x, y;
        if (event.clientX) {
            x = event.clientX;
        }
        if (event.clientY) {
            y = event.clientY;
        }
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        }

        this.position = new Vector(x - canvasRect.left, y - canvasRect.top);
    };

    this.buttonDown = function(event)
    {
        this.click = true;
    };

    this.buttonUp = function(event)
    {
        this.click = false;
    };

    this.clicked = function()
    {
        var clicked = this.click && this.timer.isReady();
        if (clicked) {
            this.timer.reset();
        }

        return clicked;
    };
}

var mouse = new Mouse();
setInterval(function() {
    mouse.timer.update();
}, 1 / 30);

module.exports = mouse;
