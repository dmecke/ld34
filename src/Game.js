Menu = require('./Menu.js');
Level = require('./Level.js');
Vector = require('./Math/Vector.js');
levelDefinitions = require('./LevelDefinitions.js');
canvas = require('./System/Canvas.js');

function Game()
{
    this.menu = new Menu(this);
    this.level = undefined;
    this.dimensions = new Vector(canvas.width, canvas.height);

    this.run = function()
    {
        console.log('Game::run');
        this.showMenu();
    };

    this.startLevel = function(level)
    {
        console.log('Game::startLevel');
        this.menu.hide();

        this.level = new Level(this, level.winningConditions);
        this.level.start();
    };

    this.finishLevel = function()
    {
        this.level.cleanup();
        this.level = undefined;
    };

    this.showMenu = function()
    {
        this.menu.show();
    };
}

module.exports = Game;
