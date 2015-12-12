Menu = require('./Menu.js');
Level = require('./Level.js');
Vector = require('./Math/Vector.js');
levelDefinitions = require('./LevelDefinitions.js');
canvas = require('./System/Canvas.js');

function Game()
{
    this.menu = new Menu(this);
    this.levels = [];
    this.currentLevel = undefined;
    this.dimensions = new Vector(canvas.width, canvas.height);

    this.run = function()
    {
        console.log('Game::run');
        for (var key in levelDefinitions) {
            if (levelDefinitions.hasOwnProperty(key)) {
                this.levels.push(new Level(this, levelDefinitions[key]));
            }
        }
        this.showMenu();
    };

    this.startLevel = function(level)
    {
        console.log('Game::startLevel');
        this.menu.hide();

        this.currentLevel = level;
        this.currentLevel.start();
    };

    this.finishLevel = function()
    {
        this.currentLevel.isFinished = true;
        this.currentLevel.cleanup();
        this.currentLevel = undefined;
    };

    this.showMenu = function()
    {
        this.menu.show();
    };
}

module.exports = Game;
