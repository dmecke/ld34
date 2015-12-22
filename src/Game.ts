import Menu from "./Menu";
import Level from "./Level";
import Vector from "./Math/Vector";
import Sfx from "./Audio/Sfx";
import Music from "./Audio/Music";
import levelDefinitions from "./LevelDefinitions";
import canvas from "./System/Canvas";

class Game
{
    private menu:Menu = new Menu(this);
    public levels:Array<Level> = [];
    private currentLevel:Level;
    public dimensions:Vector = new Vector(canvas.width, canvas.height);
    public sfx:Sfx = new Sfx();
    public music:Music = new Music();

    public run():void
    {
        for (var key in levelDefinitions) {
            if (levelDefinitions.hasOwnProperty(key)) {
                var level = new Level(this, levelDefinitions[key]);
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
    }

    public startLevel(level:Level):void
    {
        this.menu.hide();

        this.currentLevel = level;
        this.currentLevel.start();
    }

    public finishLevel():void
    {
        this.currentLevel.isFinished = true;
        window.localStorage.setItem('level_' +  this.currentLevel.levelSettings.level, true.toString());
        this.currentLevel.cleanup();
        this.currentLevel = undefined;
    }

    public showMenu():void
    {
        this.menu.show();
    }
}

export default Game;
