Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');

function Cell(game, position, velocity, mass, color)
{
    this.game = game;
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.color = color;

    this.update = function()
    {
        this.position = this.position.add(this.velocity);
        if (this.position.x > this.game.dimensions.x) {
            this.position.x -= this.game.dimensions.x;
        }
        if (this.position.y > this.game.dimensions.y) {
            this.position.y -= this.game.dimensions.y;
        }
        if (this.position.x < 0) {
            this.position.x = this.game.dimensions.x - this.position.x;
        }
        if (this.position.y < 0) {
            this.position.y = this.game.dimensions.y - this.position.y;
        }
    };

    this.render = function()
    {
        var shell = new Circle(this.position, this.mass);
        shell.strokeStyle = this.color;
        shell.draw();
    };
}

module.exports = Cell;
