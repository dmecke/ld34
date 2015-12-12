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

    this.show = function()
    {
        console.log('Menu::show');

        this.background.src = 'img/startscreen.jpg';
        this.lock.src = 'img/lock.png';

        var menu = this;
        this.interval = setInterval(function() {
            menu.update();
            menu.render();
        }, 1 / 30);
    };

    this.hide = function()
    {
        console.log('Menu::hide');
        clearInterval(this.interval);
    };

    this.update = function()
    {
        console.log('Menu::update');
        if (this.mouse.click) {
            var level = this.levelAtPosition(this.mouse.position);
            if (level && !level.isLocked()) {
                this.game.startLevel(level);
            }
        }
    };

    this.render = function()
    {
        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);

        context.drawImage(this.background, 0, 0);

        for (var i = 0; i < this.game.levels.length; i++) {
            this.drawLevel(this.game.levels[i]);
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
}

module.exports = Menu;
