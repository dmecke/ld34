context = require('./System/Context.js');
Text = require('./Graphics/Text.js');
Circle = require('./Graphics/Circle.js');
Vector = require('./Math/Vector.js');
mouse = require('./Input/Mouse.js');

function Menu(game)
{
    this.game = game;
    this.mouse = mouse;
    this.interval = undefined;

    this.show = function()
    {
        console.log('Menu::show');
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
        if (this.mouse.buttons[0]) {
            var level = this.levelAtPosition(this.mouse.position);
            if (level) {
                this.game.startLevel();
            }
        }
    };

    this.render = function()
    {
        context.clearRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);

        var headline = new Text(new Vector(this.game.dimensions.x / 2, 100), 'My Game Name');
        headline.font = '72px Roboto';
        headline.fillStyle = 'blue';
        headline.draw();

        var selectLevel = new Text(new Vector(this.game.dimensions.x / 2, 200), 'Select Level');
        selectLevel.font = '32px Roboto';
        selectLevel.fillStyle = 'blue';
        selectLevel.draw();

        this.drawLevel(1);
    };

    this.drawLevel = function(level)
    {
        var yPosition = level * 100 + 200;

        var circle = new Circle(new Vector(this.game.dimensions.x / 2, yPosition), 50);
        circle.fillStyle = 'lightblue';
        circle.strokeStyle = 'blue';
        circle.draw();

        var label = new Text(new Vector(this.game.dimensions.x / 2, yPosition + 20), level);
        label.font = '52px Roboto';
        label.fillStyle = 'blue';
        label.draw();
    };

    this.levelAtPosition = function(position)
    {
        for (var level = 1; level <= 1; level++) {
            var levelPosition = new Vector(this.game.dimensions.x / 2, level * 100 + 200);
            if (levelPosition.distanceTo(position) <= 50) {
                return level;
            }
        }

        return null;
    };
}

module.exports = Menu;
