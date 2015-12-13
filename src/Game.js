Menu = require('./Menu.js');
Level = require('./Level.js');
Vector = require('./Math/Vector.js');
Sfx = require('./Audio/Sfx.js');
levelDefinitions = require('./LevelDefinitions.js');
canvas = require('./System/Canvas.js');

function Game()
{
    this.menu = new Menu(this);
    this.levels = [];
    this.currentLevel = undefined;
    this.dimensions = new Vector(canvas.width, canvas.height);
    this.sfx = new Sfx();

    this.run = function()
    {
        for (var key in levelDefinitions) {
            if (levelDefinitions.hasOwnProperty(key)) {
                var level = new Level(this, levelDefinitions[key]);
                if (window.localStorage.getItem('level_' +  level.levelSettings.level)) {
                    level.isFinished = true;
                }
                this.levels.push(level);
            }
        }
        this.showMenu();
    };

    this.startLevel = function(level)
    {
        this.menu.hide();

        this.currentLevel = level;
        this.currentLevel.start();
    };

    this.finishLevel = function()
    {
        this.currentLevel.isFinished = true;
        window.localStorage.setItem('level_' +  this.currentLevel.levelSettings.level, true);
        this.currentLevel.cleanup();
        this.currentLevel = undefined;
    };

    this.showMenu = function()
    {
        this.menu.show();
    };
}

module.exports = Game;
