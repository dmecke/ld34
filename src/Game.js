context = require('./System/Context.js');
canvas = require('./System/Canvas.js');
Player = require('./Entity/Player.js');

function Game()
{
    this.player = new Player();

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
    };

    this.render = function()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.player.render();
    };
}

module.exports = Game;
