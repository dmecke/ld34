import context from "./System/Context";
import Player from "./Entity/Player";
import Vector from "./Math/Vector";
import Cell from "./Entity/Cell/Cell";
import Ui from "./Ui";
import Music from "./Audio/Music";
import settings from "./Settings";
import Game from "./Game";
import PlayerCell from "./Entity/Cell/PlayerCell";
import SimpleCell from "./Entity/Cell/SimpleCell";
import AbsorberCell from "./Entity/Cell/AbsorberCell";
import DirectionCell from "./Entity/Cell/DirectionCell";
import EscaperCell from "./Entity/Cell/EscaperCell";
import Factory from "./Entity/Cell/Factory";

class Level
{
    public game:Game;
    public player:Player;
    public cells:Array<Cell> = [];
    private ui:Ui = new Ui(this);
    private interval;
    public levelSettings;
    private background:HTMLImageElement = new Image();
    public showObjectives:boolean = true;
    public showScore:boolean = false;
    public isFinished:boolean = false;
    public collectedCells:number = 0;

    constructor(game:Game, levelSettings)
    {
        this.game = game;
        this.levelSettings = levelSettings;
    }

    public start():void
    {
        var level = this;
        this.setup();

        this.interval = setInterval(function() {
            level.update();
            level.render();
        }, 1 / 30);
    }

    public update():void
    {
        this.ui.update();

        if (this.paused()) {
            return;
        }

        this.player.update();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].update();
        }
        this.checkWinningConditions();
    }

    public render():void
    {
        context.clearRect(0, 0, this.game.dimensions.x(), this.game.dimensions.y());
        context.drawImage(this.background, 0, 0, this.game.dimensions.x(), this.game.dimensions.y());
        this.player.render();
        for (var i = 0; i < this.cells.length; i++) {
            this.cells[i].render();
        }
        this.ui.render();
    }

    public setup():void
    {
        var numberOfCells = 10;
        if (this.levelSettings.setup) {
            var setup = this.levelSettings.setup;
            if (setup.numberOfCells) {
                numberOfCells = setup.numberOfCells;
            }
        }

        for (var i = 0; i < numberOfCells; i++) {
            var position = new Vector(Math.random() * this.game.dimensions.x(), Math.random() * this.game.dimensions.y());
            var velocity = new Vector(Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3);
            var mass = Math.random() * 10 + 5;
            var type = settings.CELL_TYPE_SIMPLE;
            if (setup && setup.cells && setup.cells[i]) {
                if (setup.cells[i].position) {
                    position = setup.cells[i].position;
                }
                if (setup.cells[i].velocity) {
                    velocity = setup.cells[i].velocity;
                }
                if (setup.cells[i].mass) {
                    mass = setup.cells[i].mass;
                }
                if (setup.cells[i].type) {
                    type = setup.cells[i].type;
                }
            }
            this.cells.push(Factory.create(type, this, position, velocity, mass));
        }
        var background = this.levelSettings.level % 10;
        this.background.src = 'img/background/' + background + '.jpg';
        this.game.music.playLevel(this.levelSettings.level);
        this.player = new Player(this);
    }

    private checkWinningConditions():void
    {
        var conditions = this.levelSettings.winningConditions;
        var solved = true;

        if (conditions.mass && this.player.mass < conditions.mass) {
            solved = false;
        }
        if (conditions.cells && this.collectedCells < conditions.cells) {
            solved = false;
        }

        if (solved) {
            this.showScore = true;
        }
    }

    public cleanup():void
    {
        this.collectedCells = 0;
        this.cells = [];
        this.showScore = false;
        this.showObjectives = true;
        this.game.music.pauseLevel(this.levelSettings.level);
        clearInterval(this.interval);
    }

    public paused():boolean
    {
        return this.showObjectives || this.showScore;
    }

    public isLocked():boolean
    {
        return this.levelSettings.level > 1 && this.previousLevel().isFinished == false;
    }

    public previousLevel():Level
    {
        for (var i = 0; i < this.game.levels.length; i++) {
            if (this.game.levels[i].levelSettings.level == this.levelSettings.level - 1) {
                return this.game.levels[i];
            }
        }

        return null;
    }
}

export default Level;