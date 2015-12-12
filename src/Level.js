context = require('./System/Context.js');
Player = require('./Entity/Player.js');
Vector = require('./Math/Vector.js');
Cell = require('./Entity/Cell.js');

function Level(game)
{
    this.game = game;
    this.player = new Player(this);
    this.cells = [];
    this.interval = undefined;
    this.winningConditions = {
        mass: 110
    };

    this.start = function()
    {
        console.log('Level::start');
        var level = this;
        this.setup();

        this.interval = setInterval(function() {
            level.update();
            level.render();
        }, 1 / 30);
    };

    this.update = function()
    {
        console.log('Level::update');
        this.player.update();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].update();
        }
        this.checkWinningConditions();
    };

    this.render = function()
    {
        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);
        this.player.render();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].render();
        }
    };

    this.setup = function()
    {
        console.log('Level::setup');
        for (var i = 0; i < 10; i++) {
            this.cells.push(
                new Cell(
                    this,
                    new Vector(Math.random() * this.game.dimensions.x, Math.random() * this.game.dimensions.y),
                    new Vector(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1),
                    Math.random() * 10,
                    'green'
                )
            );
        }
    };

    this.checkWinningConditions = function()
    {
        if (this.player.mass >= this.winningConditions.mass) {
            this.game.finishLevel();
            this.game.showMenu();
        }
    };

    this.cleanup = function()
    {
        clearInterval(this.interval);
    };
}

module.exports = Level;
