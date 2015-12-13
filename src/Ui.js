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

    this.drawHud = function()
    {
        var winningConditions = this.level.levelSettings.winningConditions;

        var container = new Rectangle(new Vector(100, this.level.game.dimensions.y - 25), 200, 50);
        container.strokeStyle = settings.white;
        container.lineWidth = 2;
        container.fillStyle = settings.white.replace(')', ', 0.6)').replace('rgb', 'rgba');
        container.draw();

        var cellsText = 'Cells collected: ' + this.level.collectedCells;
        if (winningConditions.cells) {
            cellsText += ' (' + winningConditions.cells + ' needed)';
        }
        var cells = new Text(new Vector(10, this.level.game.dimensions.y - 10), cellsText);
        cells.font = '14px Roboto';
        cells.textAlign = 'left';
        cells.fillStyle = settings.blue;
        cells.draw();

        var massText = 'Mass: ' + Math.floor(this.level.player.mass);
        if (winningConditions.mass) {
            massText += ' (' + winningConditions.mass + ' needed)';
        }
        var mass = new Text(new Vector(10, this.level.game.dimensions.y - 30), massText);
        mass.font = '14px Roboto';
        mass.textAlign = 'left';
        mass.fillStyle = settings.blue;
        mass.draw();
    };

    this.showObjectives = function()
    {
        if (!this.level.showObjectives) {
            return;
        }

        this.drawWindow();

        var objectives = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 - 50), 'Grow until you have a mass of ' + this.level.levelSettings.winningConditions.mass + '!');
        objectives.font = '28px "Gloria Hallelujah"';
        objectives.fillStyle = 'white';
        objectives.strokeStyle = settings.grey;
        objectives.lineWidth = 5;
        objectives.maxWidth = 350;
        objectives.draw();

        this.drawContinueText('Click to start!');

        if (mouse.clicked()) {
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
        var clickToStart = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 + 100), text);
        clickToStart.font = '18px "Gloria Hallelujah"';
        clickToStart.fillStyle = 'white';
        clickToStart.strokeStyle = settings.grey;
        clickToStart.lineWidth = 4;
        clickToStart.draw();
    };
}

module.exports = Ui;
