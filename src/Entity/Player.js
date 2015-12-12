Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');
ClickTimer = require('./../Input/ClickTimer.js');
mouse = require('./../Input/Mouse.js');

function Player()
{
    this.position = new Vector(400, 300);
    this.velocity = new Vector(0, 0);
    this.mass = 10;
    this.mouse = mouse;
    this.clickTimer = new ClickTimer(30);

    this.update = function()
    {
        if (this.mouse.buttons[0] && this.clickTimer.isReady()) {
            var direction = this.mouse.position.subtract(this.position).multiply(-1).normalize();
            this.velocity = this.velocity.add(direction).limit(this.maxSpeed());
            this.clickTimer.reset();
        }

        this.position = this.position.add(this.velocity);
        this.clickTimer.update();
    };

    this.render = function()
    {
        var core = new Circle(this.position, 10);
        core.strokeStyle = 'blue';
        core.fillStyle = 'blue';
        core.draw();

        var shell = new Circle(this.position, this.mass);
        shell.strokeStyle = 'blue';
        shell.draw();
    };

    this.maxSpeed = function()
    {
        return 1;
    }
}

module.exports = Player;
