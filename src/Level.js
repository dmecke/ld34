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
    this.collectedCells = 0;

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
        var numberOfCells = 20;
        if (this.levelSettings.setup) {
            var setup = this.levelSettings.setup;
            if (setup.numberOfCells) {
                numberOfCells = setup.numberOfCells;
            }
        }

        for (var i = 0; i < numberOfCells; i++) {
            var position = new Vector(Math.random() * this.game.dimensions.x, Math.random() * this.game.dimensions.y);
            var velocity = new Vector(Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3);
            var mass = Math.random() * 10 + 5;
            var type = settings.CELL_TYPE_SIMPLE;
            if (setup.cells && setup.cells[i]) {
                if (setup.cells[i].position) {
                    position = setup.cells[i].position;
                }
                if (setup.cells[i].velocity) {
                    velocity = setup.cells[i].velocity;
                }
                if (setup.cells[i].mass) {
                    mass = setup.cells[i].mass;
                }
                if (setup.cells[i].type) {
                    type = setup.cells[i].type;
                }
            }
            this.cells.push(new Cell(this, position, velocity, mass, type));
        }
        var background = this.levelSettings.level % 10;
        this.background.src = 'img/background/' + background + '.jpg';
        this.game.music.playLevel(this.levelSettings.level);
        this.game.showObjectives = true;
        this.player = new Player(this);
    };

    this.checkWinningConditions = function()
    {
        var conditions = this.levelSettings.winningConditions;
        var solved = true;

        if (conditions.mass && this.player.mass < conditions.mass) {
            solved = false;
        }
        if (conditions.cells && this.collectedCells < conditions.cells) {
            solved = false;
        }

        if (solved) {
            this.showScore = true;
        }
    };

    this.cleanup = function()
    {
        this.collectedCells = 0;
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
