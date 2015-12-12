Vector = require('./Math/Vector.js');
Text = require('./Graphics/Text.js');
settings = require('./Settings.js');

function Ui(level)
{
    this.level = level;

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
    };
}

module.exports = Ui;
