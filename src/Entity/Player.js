Vector = require('./../Math/Vector.js');
Circle = require('./../Graphics/Circle.js');
Cell = require('./Cell.js');
ClickTimer = require('./../Input/ClickTimer.js');
mouse = require('./../Input/Mouse.js');

function Player(game)
{
    this.game = game;
    this.position = new Vector(400, 300);
    this.velocity = new Vector(0, 0);
    this.minimumMass = 10;
    this.mass = 100;//this.minimumMass;
    this.mouse = mouse;
    this.clickTimer = new ClickTimer(30);

    this.update = function()
    {
        this.processUserInput();
        this.updatePosition();
        this.clickTimer.update();
    };

    this.render = function()
    {
        var shell = new Circle(this.position, this.mass);
        shell.strokeStyle = 'blue';
        shell.fillStyle = 'lightblue';
        shell.draw();

        var core = new Circle(this.position, this.minimumMass);
        core.strokeStyle = 'blue';
        core.fillStyle = 'blue';
        core.draw();
    };

    this.updatePosition = function()
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
        this.game.cells.push(new Cell(this.game, cellPosition, force.multiply(-1), emittedMass));
        this.clickTimer.reset();
    };

    this.reduceMass = function(amount)
    {
        this.mass = Math.max(this.minimumMass, this.mass - amount);
    };
}

module.exports = Player;
