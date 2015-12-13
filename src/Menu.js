context = require('./System/Context.js');
Text = require('./Graphics/Text.js');
Circle = require('./Graphics/Circle.js');
Vector = require('./Math/Vector.js');
levelDefinitions = require('./LevelDefinitions.js');
mouse = require('./Input/Mouse.js');
settings = require('./Settings.js');

function Menu(game)
{
    this.game = game;
    this.mouse = mouse;
    this.interval = undefined;
    this.background = new Image();
    this.lock = new Image();
    this.sfx = new Image();

    this.show = function()
    {
        this.background.src = 'img/startscreen.jpg';
        this.lock.src = 'img/lock.png';
        this.sfx.src = 'img/sfx.png';

        var menu = this;
        this.interval = setInterval(function() {
            menu.update();
            menu.render();
        }, 1 / 30);
    };

    this.hide = function()
    {
        clearInterval(this.interval);
    };

    this.update = function()
    {
        if (this.mouse.clicked()) {
            var level = this.levelAtPosition(this.mouse.position);
            if (level && !level.isLocked()) {
                this.game.startLevel(level);
            }
            if (this.mouseIsAtSfx()) {
                this.game.sfx.toggle();
            }
        }
    };

    this.render = function()
    {
        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);

        context.drawImage(this.background, 0, 0);

        this.drawSfx();

        for (var i = 0; i < this.game.levels.length; i++) {
            this.drawLevel(this.game.levels[i]);
        }
    };

    this.drawSfx = function()
    {
        var position = new Vector(this.game.dimensions.x - 50, 50);

        var circle = new Circle(position, 25);
        circle.strokeStyle = settings.white;
        circle.lineWidth = 2;
        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
        circle.draw();

        context.drawImage(this.sfx, position.x - 19, position.y - 18);

        if (!this.game.sfx.enabled) {
            var x = new Text(position.add(new Vector(1, 18)), 'X');
            x.font = '44px "Gloria Hallelujah"';
            x.fillStyle = settings.red;
            x.strokeStyle = settings.white;
            x.lineWidth = 5;
            x.draw();
        }
    };

    this.drawLevel = function(level)
    {
        var circle = new Circle(level.levelSettings.position, 50);
        circle.strokeStyle = settings.white;
        circle.lineWidth = 2;
        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
        circle.draw();

        if (level.isLocked()) {
            context.drawImage(this.lock, level.levelSettings.position.x - 29, level.levelSettings.position.y - 44);
        } else {
            var label = new Text(level.levelSettings.position.add(new Vector(0, 20)), level.levelSettings.level);
            label.font = '52px "Gloria Hallelujah"';
            label.fillStyle = settings.white;
            label.strokeStyle = settings.grey;
            label.lineWidth = 8;
            label.draw();
        }
    };

    this.levelAtPosition = function(position)
    {
        for (var i = 0; i < this.game.levels.length; i++) {
            if (this.game.levels[i].levelSettings.position.distanceTo(position) <= 50) {
                return this.game.levels[i];
            }
        }

        return null;
    };

    this.mouseIsAtSfx = function()
    {
        var sfxPosition = new Vector(this.game.dimensions.x - 50, 50);

        return sfxPosition.distanceTo(this.mouse.position) <= 50;
    };
}

module.exports = Menu;
