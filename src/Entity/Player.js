Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');
ClickTimer = require('./../Input/ClickTimer.js');
mouse = require('./../Input/Mouse.js');

function Player()
{
    this.position = new Vector(400, 300);
    this.velocity = new Vector(0, 0);
    this.minimumMass = 10;
    this.mass = this.minimumMass;
    this.mouse = mouse;
    this.clickTimer = new ClickTimer(30);

    this.update = function()
    {
        if (this.mouse.buttons[0] && this.clickTimer.isReady()) {
            var emittedMass = Math.max(0.01, this.mass * 0.01);
            var force = this.mouse.position.subtract(this.position).multiply(-1).normalize().multiply(emittedMass);
            this.velocity = this.velocity.add(force);
            this.reduceMass(emittedMass);
            this.clickTimer.reset();
        }

        this.position = this.position.add(this.velocity);
        this.clickTimer.update();
    };

    this.render = function()
    {
        var core = new Circle(this.position, this.minimumMass);
        core.strokeStyle = 'blue';
        core.fillStyle = 'blue';
        core.draw();

        var shell = new Circle(this.position, this.mass);
        shell.strokeStyle = 'blue';
        shell.draw();
    };

    this.reduceMass = function(amount)
    {
        this.mass = Math.max(this.minimumMass, this.mass - amount);
    };
}

module.exports = Player;
