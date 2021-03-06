Vector = require('./Math/Vector.js');
Text = require('./Graphics/Text.js');
Rectangle = require('./Graphics/Rectangle.js');
settings = require('./Settings.js');
mouse = require('./Input/Mouse.js');

function Ui(level)
{
    this.level = level;

    this.render = function()
    {
        this.drawHud();
        this.showObjectives();
        this.showScore();
    };

    this.update = function()
    {
        if (mouse.clicked()) {
            if (mouse.position.x >= 210 &&
                mouse.position.x <= 290 &&
                mouse.position.y >= this.level.game.dimensions.y - 35 &&
                mouse.position.y <= this.level.game.dimensions.y - 15)
            {
                mouse.timer.reset();
                this.level.cleanup();
                this.level.game.showMenu();
            }
        }
    };

    this.drawHud = function()
    {
        var winningConditions = this.level.levelSettings.winningConditions;

        var container = new Rectangle(new Vector(150, this.level.game.dimensions.y - 25), 300, 50);
        container.strokeStyle = settings.white;
        container.lineWidth = 2;
        container.fillStyle = settings.white.replace(')', ', 0.6)').replace('rgb', 'rgba');
        container.draw();

        var cellsText = 'Cells collected: ' + this.level.collectedCells;
        if (winningConditions.cells) {
            cellsText += ' (' + winningConditions.cells + ' needed)';
        }
        var cells = new Text(new Vector(10, this.level.game.dimensions.y - 10), cellsText);
        cells.font = '14px Oswald';
        cells.textAlign = 'left';
        cells.fillStyle = settings.blue;
        cells.draw();

        var massText = 'Mass: ' + Math.floor(this.level.player.mass);
        if (winningConditions.mass) {
            massText += ' (' + winningConditions.mass + ' needed)';
        }
        var mass = new Text(new Vector(10, this.level.game.dimensions.y - 30), massText);
        mass.font = '14px Oswald';
        mass.textAlign = 'left';
        mass.fillStyle = settings.blue;
        mass.draw();

        var abortButton = new Rectangle(new Vector(250, this.level.game.dimensions.y - 25), 80, 20);
        abortButton.strokeStyle = settings.red;
        abortButton.fillStyle = settings.red.replace(')', ', 0.2)').replace('rgb', 'rgba');
        abortButton.draw();

        var abortText = new Text(new Vector(250, this.level.game.dimensions.y - 19), 'back to menu');
        abortText.font = '14px Oswald';
        abortText.fillStyle = settings.red;
        abortText.draw();
    };

    this.showObjectives = function()
    {
        if (!this.level.showObjectives) {
            return;
        }

        this.drawWindow();

        var objectives = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 - 100), this.level.levelSettings.intro);
        objectives.font = '18px "Gloria Hallelujah"';
        objectives.fillStyle = 'white';
        objectives.strokeStyle = settings.grey;
        objectives.lineWidth = 5;
        objectives.maxWidth = 350;
        objectives.draw();

        this.drawContinueText('Click to start!');

        if (mouse.clicked()) {
            mouse.timer.reset();
            this.level.showObjectives = false;
        }
    };

    this.showScore = function()
    {
        if (!this.level.showScore) {
            return;
        }

        this.drawWindow();

        var score = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 - 50), 'You made it!');
        score.font = '28px "Gloria Hallelujah"';
        score.fillStyle = 'white';
        score.strokeStyle = settings.grey;
        score.lineWidth = 5;
        score.maxWidth = 350;
        score.draw();

        this.drawContinueText('Click to return to main menu!');

        if (mouse.clicked()) {
            mouse.timer.reset();
            this.level.game.finishLevel();
            this.level.game.showMenu();
        }
    };

    this.drawWindow = function()
    {
        var window = new Rectangle(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2), 400, 300);
        window.strokeStyle = settings.white;
        window.lineWidth = 2;
        window.fillStyle = settings.white.replace(')', ', 0.6)').replace('rgb', 'rgba');
        window.draw();
    };

    this.drawContinueText = function(text)
    {
        var clickToStart = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 + 120), text);
        clickToStart.font = '18px "Gloria Hallelujah"';
        clickToStart.fillStyle = 'white';
        clickToStart.strokeStyle = settings.grey;
        clickToStart.lineWidth = 4;
        clickToStart.draw();
    };
}

module.exports = Ui;
