Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');
PositionCheck = require('./../Util/PositionCheck.js');
settings = require('./../Settings.js');

function Cell(level, position, velocity, mass, type)
{
    this.level = level;
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.transparency = 0.5;
    this.transparencyFlag = true;
    this.disappearsIn = undefined;
    this.type = type;

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
            if (this.disappearsIn == 0) {
                var index = this.level.cells.indexOf(this);
                this.level.cells.splice(index, 1);
            }
        }

        this.updateTransparency();
    };

    this.render = function()
    {
        var dimensions = this.level.game.dimensions;
        var check = new PositionCheck(this.position, this.mass, dimensions);

        this.drawElement(this.position);
        if (check.isOutOfLeftBorder()) {
            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y));
        }
        if (check.isOutOfTopBorder()) {
            this.drawElement(new Vector(this.position.x, dimensions.y + this.position.y));
        }
        if (check.isOutOfRightBorder()) {
            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y));
        }
        if (check.isOutOfBottomBorder()) {
            this.drawElement(new Vector(this.position.x, this.position.y - dimensions.y));
        }

        if (check.isOutOfTopLeftCorner()) {
            this.drawElement(new Vector(dimensions.x + this.position.x, dimensions.y + this.position.y));
        }
        if (check.isOutOfBottomLeftCorner()) {
            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y - dimensions.y));
        }
        if (check.isOutOfTopRightCorner()) {
            this.drawElement(new Vector(this.position.x - dimensions.x, dimensions.y + this.position.y));
        }
        if (check.isOutOfBottomRightCorner()) {
            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y - dimensions.y));
        }
    };

    this.drawElement = function(position)
    {
        var circle = new Circle(position, this.mass);
        circle.strokeStyle = this.color();
        circle.fillStyle = this.color().replace(')', ', 0.3)').replace('rgb', 'rgba');
        circle.lineWidth = 3;
        circle.draw();

        var outline = new Circle(position, this.mass + 1);
        outline.strokeStyle = settings.white.replace(')', ', ' + this.transparency + ')').replace('rgb', 'rgba');
        outline.lineWidth = 1;
        outline.draw();
    };

    this.updateTransparency = function()
    {
        if (this.transparencyFlag) {
            this.transparency += 0.005;
        } else {
            this.transparency -= 0.005;
        }

        if (this.transparency >= 0.8 || this.transparency <= 0.2) {
            this.transparencyFlag = !this.transparencyFlag;
        }
    };

    this.color = function()
    {
        if (this.type == settings.CELL_TYPE_PLAYER) {
            return settings.blue;
        } else if (this.type == settings.CELL_TYPE_SIMPLE) {
            return settings.green;
        } else if (this.type == settings.CELL_TYPE_ABSORB) {
            return settings.red;
        }
    };

    this.isForeign = function()
    {
        return this.type !== settings.CELL_TYPE_PLAYER;
    };

    this.massWhenAbsorbed = function()
    {
        var mass = this.mass;

        if (this.type == settings.CELL_TYPE_ABSORB) {
            mass *= -1;
        }

        return mass;
    };
}

module.exports = Cell;
