context = require('./System/Context.js');
canvas = require('./System/Canvas.js');
Player = require('./Entity/Player.js');

function Game()
{
    this.player = new Player(this);
    this.cells = [];

    this.run = function()
    {
        var game = this;
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
