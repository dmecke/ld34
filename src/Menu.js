context = require('./System/Context.js');
Text = require('./Graphics/Text.js');
Circle = require('./Graphics/Circle.js');
Vector = require('./Math/Vector.js');
levelDefinitions = require('./LevelDefinitions.js');
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
                this.game.startLevel(level);
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

        for (var key in levelDefinitions) {
            if (levelDefinitions.hasOwnProperty(key)) {
                this.drawLevel(levelDefinitions[key]);
            }
        }
    };

    this.drawLevel = function(level)
    {
        var circle = new Circle(level.position, 50);
        circle.fillStyle = 'lightblue';
        circle.strokeStyle = 'blue';
        circle.draw();

        var label = new Text(level.position.add(new Vector(0, 20)), level.level);
        label.font = '52px Roboto';
        label.fillStyle = 'blue';
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
