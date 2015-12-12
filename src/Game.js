context = require('./System/Context.js');
canvas = require('./System/Canvas.js');
Player = require('./Entity/Player.js');
Vector = require('./Math/Vector.js');
Cell = require('./Entity/Cell.js');

function Game()
{
    this.player = new Player(this);
    this.dimensions = new Vector(canvas.width, canvas.height);
    this.cells = [];

    this.run = function()
    {
        var game = this;

        for (var i = 0; i < 10; i++) {
            this.cells.push(
                new Cell(
                    this,
                    new Vector(Math.random() * this.dimensions.x, Math.random() * this.dimensions.y),
                    new Vector(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1),
                    Math.random() * 10,
                    'green'
                )
            );
        }

        setInterval(function() {
            game.update();
            game.render();
        }, 1 / 30);
    };

    this.update = function()
    {
        this.player.update();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].update();
        }
    };

    this.render = function()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.player.render();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].render();
        }
    };
}

module.exports = Game;
