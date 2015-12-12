Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');

function Cell(level, position, velocity, mass, color)
{
    this.level = level;
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.color = color;
    this.disappearsIn = undefined;

    this.update = function()
    {
        this.position = this.position.add(this.velocity);
        if (this.position.x > this.level.game.dimensions.x) {
            this.position.x -= this.level.game.dimensions.x;
        }
        if (this.position.y > this.level.game.dimensions.y) {
            this.position.y -= this.level.game.dimensions.y;
        }
        if (this.position.x < 0) {
            this.position.x = this.level.game.dimensions.x - this.position.x;
        }
        if (this.position.y < 0) {
            this.position.y = this.level.game.dimensions.y - this.position.y;
        }

        if (this.disappearsIn) {
            this.disappearsIn--;
            console.log(this.disappearsIn);
            if (this.disappearsIn == 0) {
                var index = this.level.cells.indexOf(this);
                this.level.cells.splice(index, 1);
            }
        }
    };

    this.render = function()
    {
        var dimensions = this.level.game.dimensions;

        this.drawElement(this.position);
        if (this.position.x - this.mass < 0) {
            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y));
        }
        if (this.position.y - this.mass < 0) {
            this.drawElement(new Vector(this.position.x, dimensions.y + this.position.y));
        }
        if (this.position.x + this.mass > dimensions.x) {
            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y));
        }
        if (this.position.y + this.mass > dimensions.y) {
            this.drawElement(new Vector(this.position.x, this.position.y - dimensions.y));
        }

        if (this.position.x - this.mass < 0 && this.position.y - this.mass < 0) {
            this.drawElement(new Vector(dimensions.x + this.position.x, dimensions.y + this.position.y));
        }
        if (this.position.x - this.mass < 0 && this.position.y + this.mass > dimensions.y) {
            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y - dimensions.y));
        }
        if (this.position.x + this.mass > dimensions.x && this.position.y - this.mass < 0) {
            this.drawElement(new Vector(this.position.x - dimensions.x, dimensions.y + this.position.y));
        }
        if (this.position.x + this.mass > dimensions.x && this.position.y + this.mass > dimensions.y) {
            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y - dimensions.y));
        }
    };

    this.drawElement = function(position)
    {
        var shell = new Circle(position, this.mass);
        shell.strokeStyle = this.color;
        shell.draw();
    };
}

module.exports = Cell;
