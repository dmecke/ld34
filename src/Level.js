context = require('./System/Context.js');
Player = require('./Entity/Player.js');
Vector = require('./Math/Vector.js');
Cell = require('./Entity/Cell.js');
Ui = require('./Ui.js');
settings = require('./Settings.js');

function Level(game, levelSettings)
{
    this.game = game;
    this.player = new Player(this);
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
        this.ui.update();

        if (this.paused()) {
            return;
        }

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
        context.drawImage(this.background, 0, 0);
        this.player.render();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].render();
        }
        this.ui.render();
    };

    this.setup = function()
    {
        console.log('Level::setup');
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
    };

    this.checkWinningConditions = function()
    {
        if (this.player.mass >= this.levelSettings.winningConditions.mass) {
            this.showScore = true;
        }
    };

    this.cleanup = function()
    {
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
