Vector = require('./Math/Vector.js');
Text = require('./Graphics/Text.js');
Rectangle = require('./Graphics/Rectangle.js');
ClickTimer = require('./Input/ClickTimer.js');
settings = require('./Settings.js');
mouse = require('./Input/Mouse.js');

function Ui(level)
{
    this.level = level;
    this.clickTimer = new ClickTimer(30);
    this.clickTimer.reset();

    this.update = function()
    {
        console.log('Ui::update');
        this.clickTimer.update();
    };

    this.render = function()
    {
        var currentMass = new Text(new Vector(10, this.level.game.dimensions.y - 30), 'Current mass: ' + Math.floor(this.level.player.mass));
        currentMass.textAlign = 'left';
        currentMass.fillStyle = settings.blue;
        currentMass.draw();

        var targetMass = new Text(new Vector(10, this.level.game.dimensions.y - 10), 'Target mass: ' + this.level.levelSettings.winningConditions.mass);
        targetMass.textAlign = 'left';
        targetMass.fillStyle = settings.blue;
        targetMass.draw();

        this.showObjectives();
        this.showScore();
    };

    this.showObjectives = function()
    {
        if (!this.level.showObjectives) {
            return;
        }

        this.drawWindow();

        var objectives = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 - 50), 'Grow until you have a mass of ' + this.level.levelSettings.winningConditions.mass + '!');
        objectives.font = '24px "Gloria Hallelujah"';
        objectives.fillStyle = 'white';
        objectives.strokeStyle = settings.grey;
        objectives.lineWidth = 5;
        objectives.maxWidth = 350;
        objectives.draw();

        this.drawContinueText('Click to start!');

        if (mouse.click && this.clickTimer.isReady()) {
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
        score.font = '24px "Gloria Hallelujah"';
        score.fillStyle = 'white';
        score.strokeStyle = settings.grey;
        score.lineWidth = 5;
        score.maxWidth = 350;
        score.draw();

        this.drawContinueText('Click to return to main menu!');

        if (mouse.click && this.clickTimer.isReady()) {
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
        var clickToStart = new Text(new Vector(this.level.game.dimensions.x / 2, this.level.game.dimensions.y / 2 + 50), text);
        clickToStart.font = '14px "Gloria Hallelujah"';
        clickToStart.fillStyle = 'white';
        clickToStart.strokeStyle = settings.grey;
        clickToStart.lineWidth = 3;
        clickToStart.draw();
    };
}

module.exports = Ui;
