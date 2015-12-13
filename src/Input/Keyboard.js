Timer = require('./../Util/Timer.js');
Vector = require('./../Math/Vector.js');

function Keyboard()
{
    this.KEY_A = 65;
    this.KEY_D = 68;
    this.direction = new Vector(1, 0);
    this.timer = new Timer(30);

    this.steer = function(keyCode)
    {
        if (!this.timer.isReady()) {
            return;
        }

        if (keyCode == this.KEY_A) {
            this.direction = this.direction.rotateByDegress(-45);
            this.timer.reset();
        }

        if (keyCode == this.KEY_D) {
            this.direction = this.direction.rotateByDegress(45);
            this.timer.reset();
        }
    };
}

var keyboard = new Keyboard();
setInterval(function() {
    keyboard.timer.update();
}, 1 / 30);

module.exports = keyboard;
