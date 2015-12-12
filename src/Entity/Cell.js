Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');

function Cell(position, velocity, mass)
{
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;

    this.update = function()
    {
        this.position = this.position.add(this.velocity);
    };

    this.render = function()
    {
        var shell = new Circle(this.position, this.mass);
        shell.strokeStyle = 'blue';
        shell.draw();
    };
}

module.exports = Cell;
