import Menu from "./../Menu";
import Level from "./../Level";
import Vector from "./../Math/Vector";
import Text from "./../Graphics/Text";
import Sfx from "./../Audio/Sfx";
import Music from "./../Audio/Music";
import levelDefinitions from "./../LevelDefinitions";
import canvas from "./../System/Canvas";
import context from "./../System/Context";
import Mouse from "./../Input/Mouse";
import Keyboard from "./../Input/Keyboard";
import FPS from "./../Util/FPS";
import GameScreen from "./GameScreen";
import settings from "./../Settings";

class Game
{
    public static FPS:number = 60;

    private menu:Menu = new Menu(this);
    public levels:Array<Level> = [];
    private currentLevel:Level;
    public dimensions:Vector = new Vector(canvas.width, canvas.height);
    public sfx:Sfx = new Sfx();
    public music:Music = new Music();
    private fps:FPS = new FPS();
    public screens:Array<GameScreen> = [];

    constructor()
    {
        this.screens.push(this.menu);
    }

    public run():void
    {
        Mouse.init();
        Keyboard.init();

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.dimensions = new Vector(canvas.width, canvas.height);
        }.bind(this));

        for (var key in levelDefinitions) {
            if (levelDefinitions.hasOwnProperty(key)) {
                var level = new Level(this, levelDefinitions[key]);
                this.screens.push(level);
                if (window.localStorage.getItem('level_' +  level.levelSettings.level)) {
                    level.isFinished = true;
                }
                this.levels.push(level);
            }
        }
        if (window.localStorage.getItem('disable_music') && window.localStorage.getItem('disable_music') == 'true') {
            this.music.enabled = false;
        }
        if (window.localStorage.getItem('disable_sfx') && window.localStorage.getItem('disable_sfx') == 'true') {
            this.sfx.enabled = false;
        }
        this.showMenu();

        setInterval(this.loop.bind(this), 1000 / Game.FPS);
    }

    public loop():void
    {
        this.update();
        this.render();
        this.fps.tick();
    }

    private update():void
    {
        this.screens.forEach(function(screen:GameScreen) {
            if (screen.isActive) {
                screen.update();
            }
        });
    }

    private render():void
    {
        context.clearRect(0, 0, this.dimensions.x(), this.dimensions.y());
        this.screens.forEach(function(screen:GameScreen) {
            if (screen.isActive) {
                screen.render();
            }
        });
        new Text(this.fps.toString())
            .at(new Vector(5, 15))
            .leftAligned()
            .withFillStyle(settings.white)
            .draw();
    }

    public startLevel(level:Level):void
    {
        this.menu.deactivate();
        this.menu.hide();

        this.currentLevel = level;
        this.currentLevel.activate();
        this.currentLevel.start();
    }

    public finishLevel():void
    {
        this.currentLevel.deactivate();
        this.currentLevel.isFinished = true;
        window.localStorage.setItem('level_' +  this.currentLevel.levelSettings.level, true.toString());
        this.currentLevel.cleanup();
        this.currentLevel = undefined;
    }

    public showMenu():void
    {
        this.menu.activate();
        this.menu.show();
    }
}

export default Game;
