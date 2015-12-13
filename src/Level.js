context = require('./System/Context.js');
Player = require('./Entity/Player.js');
Vector = require('./Math/Vector.js');
Cell = require('./Entity/Cell.js');
Ui = require('./Ui.js');
Music = require('./Audio/Music.js');
settings = require('./Settings.js');

function Level(game, levelSettings)
{
    this.game = game;
    this.player = null;
    this.cells = [];
    this.ui = new Ui(this);
    this.interval = undefined;
    this.levelSettings = levelSettings;
    this.background = new Image();
    this.showObjectives = true;
    this.showScore = false;
    this.isFinished = false;

    this.start = function()
    {
        var level = this;
        this.setup();

        this.interval = setInterval(function() {
            level.update();
            level.render();
        }, 1 / 30);
    };

    this.update = function()
    {
        console.log(this.showScore);
        if (this.paused()) {
            return;
        }

        this.player.update();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].update();
        }
        this.checkWinningConditions();
    };

    this.render = function()
    {
        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);
        context.drawImage(this.background, 0, 0);
        this.player.render();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].render();
        }
        this.ui.render();
    };

    this.setup = function()
    {
        for (var i = 0; i < 20; i++) {
            this.cells.push(
                new Cell(
                    this,
                    new Vector(Math.random() * this.game.dimensions.x, Math.random() * this.game.dimensions.y),
                    new Vector(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1),
                    Math.random() * 10,
                    settings.green
                )
            );
        }
        var background = this.levelSettings.level % 10;
        this.background.src = 'img/background/' + background + '.jpg';
        this.game.music.playLevel(this.levelSettings.level);
        this.game.showObjectives = true;
        this.player = new Player(this);
    };

    this.checkWinningConditions = function()
    {
        if (this.player.mass >= this.levelSettings.winningConditions.mass) {
            this.showScore = true;
        }
    };

    this.cleanup = function()
    {
        console.log('cleanup');
        this.cells = [];
        this.showScore = false;
        this.game.music.pauseLevel(this.levelSettings.level);
        clearInterval(this.interval);
    };

    this.paused = function()
    {
        return this.showObjectives || this.showScore;
    };

    this.isLocked = function()
    {
        return this.levelSettings.level > 1 && this.previousLevel().isFinished == false;
    };

    this.previousLevel = function()
    {
        for (var i = 0; i < this.game.levels.length; i++) {
            if (this.game.levels[i].levelSettings.level == this.levelSettings.level - 1) {
                return this.game.levels[i];
            }
        }

        return null;
    };
}

module.exports = Level;
