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

    this.show = function()
    {
        console.log('Menu::show');

        this.background.src = 'img/startscreen.jpg';

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
            if (level) {
                this.game.startLevel(level);
            }
        }
    };

    this.render = function()
    {
        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);

        context.drawImage(this.background, 0, 0);

        for (var key in levelDefinitions) {
            if (levelDefinitions.hasOwnProperty(key)) {
                this.drawLevel(levelDefinitions[key]);
            }
        }
    };

    this.drawLevel = function(level)
    {
        var circle = new Circle(level.position, 50);
        circle.strokeStyle = 'white';
        circle.lineWidth = 2;
        circle.fillStyle = settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba');
        circle.draw();

        var label = new Text(level.position.add(new Vector(0, 20)), level.level);
        label.font = '52px "Gloria Hallelujah"';
        label.fillStyle = 'white';
        label.strokeStyle = '#374959';
        label.lineWidth = 5;
        label.draw();
    };

    this.levelAtPosition = function(position)
    {
        for (var key in levelDefinitions) {
            if (levelDefinitions.hasOwnProperty(key)) {
                var level = levelDefinitions[key];
                if (level.position.distanceTo(position) <= 50) {
                    return level;
                }
            }
        }

        return null;
    };
}

module.exports = Menu;
