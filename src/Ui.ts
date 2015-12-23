import Vector from "./Math/Vector";
import Text from "./Graphics/Text";
import Rectangle from "./Graphics/Rectangle";
import settings from "./Settings";
import Level from "./Level";
import Mouse from "./Input/Mouse";
import Color from "./Graphics/Color";

class Ui
{
    private level:Level;

    constructor(level:Level)
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
        if (!Mouse.clicked()) {
            return;
        }

        if (Mouse.position.x() >= 210 &&
            Mouse.position.x() <= 290 &&
            Mouse.position.y() >= this.level.game.dimensions.y() - 35 &&
            Mouse.position.y() <= this.level.game.dimensions.y() - 15)
        {
            Mouse.timer.reset();
            this.level.cleanup();
            this.level.game.showMenu();
        }
    }

    private drawHud():void
    {
        var winningConditions = this.level.levelSettings.winningConditions;

        new Rectangle()
            .at(new Vector(150, this.level.game.dimensions.y() - 25))
            .withWidth(300)
            .withHeight(50)
            .withStrokeStyle(settings.white)
            .withFillStyle(settings.white.alpha(0.6))
            .withLineWidth(2)
            .draw();

        var cellsText = 'Cells collected: ' + this.level.collectedCells;
        if (winningConditions.cells) {
            cellsText += ' (' + winningConditions.cells + ' needed)';
        }
        new Text(cellsText)
            .at(new Vector(10, this.level.game.dimensions.y() - 10))
            .withFontSize(14)
            .leftAligned()
            .withFillStyle(settings.blue)
            .draw();

        var massText = 'Mass: ' + Math.floor(this.level.player.mass);
        if (winningConditions.mass) {
            massText += ' (' + winningConditions.mass + ' needed)';
        }
        new Text(massText)
            .at(new Vector(10, this.level.game.dimensions.y() - 30))
            .withFontSize(14)
            .leftAligned()
            .withFillStyle(settings.blue)
            .draw();

        new Rectangle()
            .at(new Vector(250, this.level.game.dimensions.y() - 25))
            .withWidth(80)
            .withHeight(20)
            .withStrokeStyle(settings.red)
            .withFillStyle(settings.red.alpha(0.2))
            .draw();

        new Text('back to menu')
            .at(new Vector(250, this.level.game.dimensions.y() - 19))
            .withFontSize(14)
            .withFillStyle(settings.red)
            .draw();
    }

    private showObjectives():void
    {
        if (!this.level.showObjectives) {
            return;
        }

        this.drawWindow();

        new Text(this.level.levelSettings.intro)
            .at(this.level.game.dimensions.divide(2).subtract(new Vector(0, 100)))
            .withFontSize(18)
            .withFont('Gloria Hallelujah')
            .withStrokeStyle(settings.grey)
            .withFillStyle(settings.white)
            .withMaxWidth(350)
            .withLineWidth(5)
            .draw();

        this.drawContinueText('Click to start!');

        if (Mouse.clicked()) {
            Mouse.timer.reset();
            this.level.showObjectives = false;
        }
    }

    private showScore():void
    {
        if (!this.level.showScore) {
            return;
        }

        this.drawWindow();

        new Text('You made it!')
            .at(this.level.game.dimensions.divide(2).subtract(new Vector(0, 50)))
            .withFontSize(28)
            .withFont('Gloria Hallelujah')
            .withStrokeStyle(settings.grey)
            .withFillStyle(settings.white)
            .withLineWidth(5)
            .withMaxWidth(350)
            .draw();

        this.drawContinueText('Click to return to main menu!');

        if (Mouse.clicked()) {
            Mouse.timer.reset();
            this.level.game.finishLevel();
            this.level.game.showMenu();
        }
    }

    private drawWindow():void
    {
        new Rectangle()
            .at(this.level.game.dimensions.divide(2))
            .withWidth(400)
            .withHeight(300)
            .withStrokeStyle(settings.white)
            .withLineWidth(2)
            .withFillStyle(settings.white.alpha(0.6))
            .draw();
    }

    private drawContinueText(text:string):void
    {
        new Text(text)
            .at(this.level.game.dimensions.divide(2).add(new Vector(0, 120)))
            .withFontSize(18)
            .withFont('Gloria Hallelujah')
            .withStrokeStyle(settings.grey)
            .withFillStyle(settings.white)
            .withLineWidth(4)
            .draw();
    }
}

export default Ui;
