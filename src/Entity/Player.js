Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');
Cell = require('./Cell.js');
ClickTimer = require('./../Input/ClickTimer.js');
mouse = require('./../Input/Mouse.js');
settings = require('./../Settings.js');

function Player(level)
{
    this.level = level;
    this.position = new Vector(400, 300);
    this.velocity = new Vector(0, 0);
    this.minimumMass = 10;
    this.mass = this.minimumMass;
    this.mouse = mouse;
    this.clickTimer = new ClickTimer(30);
    this.clickTimer.reset();

    this.update = function()
    {
        this.checkCollision();
        this.processUserInput();
        this.updatePosition();
        this.clickTimer.update();
    };

    this.render = function()
    {
        this.draw(this.mass);
        this.draw(this.minimumMass);
    };

    this.draw = function(radius)
    {
        var dimensions = this.level.game.dimensions;

        this.drawElement(this.position, radius);
        if (this.position.x - radius < 0) {
            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y), radius);
        }
        if (this.position.y - radius < 0) {
            this.drawElement(new Vector(this.position.x, dimensions.y + this.position.y), radius);
        }
        if (this.position.x + radius > dimensions.x) {
            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y), radius);
        }
        if (this.position.y + radius > dimensions.y) {
            this.drawElement(new Vector(this.position.x, this.position.y - dimensions.y), radius);
        }

        if (this.position.x - radius < 0 && this.position.y - radius < 0) {
            this.drawElement(new Vector(dimensions.x + this.position.x, dimensions.y + this.position.y), radius);
        }
        if (this.position.x - radius < 0 && this.position.y + radius > dimensions.y) {
            this.drawElement(new Vector(dimensions.x + this.position.x, this.position.y - dimensions.y), radius);
        }
        if (this.position.x + radius > dimensions.x && this.position.y - radius < 0) {
            this.drawElement(new Vector(this.position.x - dimensions.x, dimensions.y + this.position.y), radius);
        }
        if (this.position.x + radius > dimensions.x && this.position.y + radius > dimensions.y) {
            this.drawElement(new Vector(this.position.x - dimensions.x, this.position.y - dimensions.y), radius);
        }
    };

    this.drawElement = function(position, radius)
    {
        var circle = new Circle(position, radius);
        circle.strokeStyle = settings.blue;
        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
        circle.lineWidth = 2;
        circle.draw();
    };

    this.checkCollision = function()
    {
        for (var i = 0; i < this.level.cells.length; i++) {
            var cell = this.level.cells[i];
            if (cell.position.distanceTo(this.position) < this.mass + cell.mass) {
                this.mass += cell.mass;
                this.level.cells.splice(i, 1);
            }
        }
    };

    this.updatePosition = function()
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
    };

    this.processUserInput = function()
    {
        if (!this.mouse.buttons[0]) {
            return;
        }

        if (!this.clickTimer.isReady()) {
            return;
        }

        var emittedMass = Math.max(0.05, this.mass * 0.05);
        var direction = this.mouse.position.subtract(this.position).normalize();
        var force = direction.multiply(-1).multiply(emittedMass).divide(this.mass);
        this.velocity = this.velocity.add(force);
        this.reduceMass(emittedMass);
        var cellPosition = this.position.add(direction.multiply(this.mass + emittedMass));
        var cell = new Cell(this.level, cellPosition, force.multiply(-1), emittedMass, settings.blue);
        if (this.mass == this.minimumMass) {
            cell.disappearsIn = 100;
        }
        this.level.cells.push(cell);
        this.clickTimer.reset();
    };

    this.reduceMass = function(amount)
    {
        this.mass = Math.max(this.minimumMass, this.mass - amount);
    };
}

module.exports = Player;
