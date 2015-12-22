import Vector from "./Math/Vector";
import Text from "./Graphics/Text";
import Rectangle from "./Graphics/Rectangle";
import settings from "./Settings";
import mouse from "./Input/Mouse";
import Level from "./Level";

class Ui
{
    private level: Level;

    constructor(level: Level)
    {
        this.level = level;
    }

    public render():void
    {
        this.drawHud();
        this.showObjectives();
        this.showScore();
    }

    public update():void
    {
        if (mouse.clicked()) {
            if (mouse.position.x() >= 210 &&
                mouse.position.x() <= 290 &&
                mouse.position.y() >= this.level.game.dimensions.y() - 35 &&
                mouse.position.y() <= this.level.game.dimensions.y() - 15)
            {
                mouse.timer.reset();
                this.level.cleanup();
                this.level.game.showMenu();
            }
        }
    }

    private drawHud():void
    {
        var winningConditions = this.level.levelSettings.winningConditions;

        var container = new Rectangle(new Vector(150, this.level.game.dimensions.y() - 25), 300, 50);
        container.strokeStyle = settings.white;
        container.lineWidth = 2;
        container.fillStyle = settings.white.replace(')', ', 0.6)').replace('rgb', 'rgba');
        container.draw();

        var cellsText = 'Cells collected: ' + this.level.collectedCells;
        if (winningConditions.cells) {
            cellsText += ' (' + winningConditions.cells + ' needed)';
        }
        new Text(new Vector(10, this.level.game.dimensions.y() - 10), cellsText, 'transparent', settings.blue, '14px Oswald', 'left').draw();

        var massText = 'Mass: ' + Math.floor(this.level.player.mass);
        if (winningConditions.mass) {
            massText += ' (' + winningConditions.mass + ' needed)';
        }
        new Text(new Vector(10, this.level.game.dimensions.y() - 30), massText, 'transparent', settings.blue, '14px Oswald', 'left').draw();

        var abortButton = new Rectangle(new Vector(250, this.level.game.dimensions.y() - 25), 80, 20);
        abortButton.strokeStyle = settings.red;
        abortButton.fillStyle = settings.red.replace(')', ', 0.2)').replace('rgb', 'rgba');
        abortButton.draw();

        new Text(new Vector(250, this.level.game.dimensions.y() - 19), 'back to menu', 'transparent', settings.red, '14px Oswald').draw();
    }

    private showObjectives():void
    {
        if (!this.level.showObjectives) {
            return;
        }

        this.drawWindow();

        var objectives = new Text(new Vector(this.level.game.dimensions.x() / 2, this.level.game.dimensions.y() / 2 - 100), this.level.levelSettings.intro, settings.grey, settings.white, '18px "Gloria Hallelujah');
        objectives.maxWidth = 350;
        objectives.lineWidth = 5;
        objectives.draw();

        this.drawContinueText('Click to start!');

        if (mouse.clicked()) {
            mouse.timer.reset();
            this.level.showObjectives = false;
        }
    }

    private showScore():void
    {
        if (!this.level.showScore) {
            return;
        }

        this.drawWindow();

        var score = new Text(new Vector(this.level.game.dimensions.x() / 2, this.level.game.dimensions.y() / 2 - 50), 'You made it!', settings.grey, settings.white, '28px "Gloria Hallelujah"');
        score.lineWidth = 5;
        score.maxWidth = 350;
        score.draw();

        this.drawContinueText('Click to return to main menu!');

        if (mouse.clicked()) {
            mouse.timer.reset();
            this.level.game.finishLevel();
            this.level.game.showMenu();
        }
    }

    private drawWindow():void
    {
        var window = new Rectangle(new Vector(this.level.game.dimensions.x() / 2, this.level.game.dimensions.y() / 2), 400, 300);
        window.strokeStyle = settings.white;
        window.lineWidth = 2;
        window.fillStyle = settings.white.replace(')', ', 0.6)').replace('rgb', 'rgba');
        window.draw();
    }

    private drawContinueText(text:string):void
    {
        var clickToStart = new Text(new Vector(this.level.game.dimensions.x() / 2, this.level.game.dimensions.y() / 2 + 120), text, settings.grey, settings.white, '18px "Gloria Hallelujah"');
        clickToStart.lineWidth = 4;
        clickToStart.draw();
    }
}

export default Ui;
