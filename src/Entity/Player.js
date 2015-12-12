Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');
mouse = require('./../Input/Mouse.js');

function Player()
{
    this.position = new Vector(400, 300);
    this.size = 10;
    this.mouse = mouse;

    this.update = function()
    {
        //this.position = this.position.add(new Vector(1, 1));
        //this.position = this.mouse.position;

        //this.position = this.position.add(new Vector(x, y));
    };

    this.render = function()
    {
        var core = new Circle(this.position, 10);
        core.strokeStyle = 'blue';
        core.fillStyle = 'blue';
        core.draw();

        var shell = new Circle(this.position, this.size);
        shell.strokeStyle = 'blue';
        shell.draw();
    };
}

module.exports = Player;
