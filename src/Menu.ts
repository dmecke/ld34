import context from "./System/Context";
import Text from "./Graphics/Text";
import Circle from "./Graphics/Circle";
import Vector from "./Math/Vector";
import Music from "./Audio/Music";
import levelDefinitions from "./LevelDefinitions";
import settings from "./Settings";
import Game from "./Game";
import Level from "./Level";
import Mouse from "./Input/Mouse";

class Menu
{
    private game:Game;
    private interval;
    private background:HTMLImageElement = new Image();
    private lock:HTMLImageElement = new Image();
    private symbolSfx:HTMLImageElement = new Image();
    private symbolMusic:HTMLImageElement = new Image();
    
    constructor(game)
    {
        this.game = game;
    }

    public show():void
    {
        this.background.src = 'img/startscreen.jpg';
        this.lock.src = 'img/lock.png';
        this.symbolSfx.src = 'img/sfx.png';
        this.symbolMusic.src = 'img/music.png';

        this.game.music.playMenu();

        var menu = this;
        this.interval = setInterval(function() {
            menu.update();
            menu.render();
        }, 1 / 30);
    }

    public hide():void
    {
        this.game.music.pauseMenu();
        clearInterval(this.interval);
    }

    public update():void
    {
        if (!Mouse.clicked()) {
            return;
        }

        Mouse.timer.reset();
        var level = this.levelAtPosition(Mouse.position);
        if (level && !level.isLocked()) {
            this.game.startLevel(level);
        }
        if (this.mouseIsAtMusic()) {
            this.game.music.toggle();
        }
        if (this.mouseIsAtSfx()) {
            this.game.sfx.toggle();
        }
    }

    public render():void
    {
        context.clearRect(0, 0, this.game.dimensions.x(), this.game.dimensions.y());

        context.drawImage(this.background, 0, 0, this.game.dimensions.x(), this.game.dimensions.y());

        this.drawMusic();
        this.drawSfx();

        for (var i = 0; i < this.game.levels.length; i++) {
            this.drawLevel(this.game.levels[i]);
        }
    }

    public drawMusic():void
    {
        var position = new Vector(this.game.dimensions.x() - 50, 50);

        new Circle()
            .at(position)
            .withRadius(25)
            .withStrokeStyle(settings.white)
            .withFillStyle(settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba'))
            .withLineWidth(2)
            .draw();

        context.drawImage(this.symbolMusic, position.x() - 15, position.y() - 18);

        if (!this.game.music.enabled) {
            new Text('X')
                .at(position.add(new Vector(1, 18)))
                .withFontSize(44)
                .withFont('Gloria Hallelujah')
                .withStrokeStyle(settings.white)
                .withFillStyle(settings.red)
                .withLineWidth(5)
                .draw();
        }
    }

    private drawSfx():void
    {
        var position = new Vector(this.game.dimensions.x() - 50, 120);

        new Circle()
            .at(position)
            .withRadius(25)
            .withStrokeStyle(settings.blue)
            .withFillStyle(settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba'))
            .withLineWidth(2)
            .draw();

        context.drawImage(this.symbolSfx, position.x() - 19, position.y() - 18);

        if (!this.game.sfx.enabled) {
            new Text('X')
                .at(position.add(new Vector(1, 18)))
                .withFontSize(44)
                .withFont('Gloria Hallelujah')
                .withStrokeStyle(settings.white)
                .withFillStyle(settings.red)
                .withLineWidth(5)
                .draw();
        }
    }

    private positionByLevel(level:number):Vector
    {
        var row = Math.floor((level - 1) / 5);

        return new Vector(0, this.game.dimensions.y() / 3 * 2).add(new Vector(this.game.dimensions.x() / 6 * ((level - 1) % 5 + 1), row * 120));
    }

    private drawLevel(level:Level):void
    {
        var position = this.positionByLevel(level.levelSettings.level);

        new Circle()
            .at(position)
            .withRadius(50)
            .withStrokeStyle(settings.white)
            .withFillStyle(settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba'))
            .withLineWidth(2)
            .draw();

        if (level.isLocked()) {
            context.drawImage(this.lock, position.x() - 29, position.y() - 44);
        } else {
            new Text(level.levelSettings.level.toString())
                .at(position.add(new Vector(0, 20)))
                .withFontSize(52)
                .withFont('Gloria Hallelujah')
                .withStrokeStyle(settings.grey)
                .withFillStyle(settings.white)
                .withLineWidth(8)
                .draw();
        }
    }

    private levelAtPosition(position:Vector):Level
    {
        for (var i = 0; i < this.game.levels.length; i++) {
            if (this.positionByLevel(this.game.levels[i].levelSettings.level).distanceTo(position) <= 50) {
                return this.game.levels[i];
            }
        }

        return null;
    }

    private mouseIsAtMusic():boolean
    {
        var position = new Vector(this.game.dimensions.x() - 50, 50);

        return position.distanceTo(Mouse.position) <= 50;
    }

    private mouseIsAtSfx():boolean
    {
        var position = new Vector(this.game.dimensions.x() - 50, 120);

        return position.distanceTo(Mouse.position) <= 50;
    }
}

export default Menu;
