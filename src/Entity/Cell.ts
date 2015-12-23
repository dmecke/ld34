import Vector from "./../Math/Vector";
import Circle from "./../Graphics/Circle";
import PositionCheck from "./../Util/PositionCheck";
import settings from "./../Settings";
import Level from "../Level";
import Color from "../Graphics/Color";

class Cell
{
    private level:Level;
    public position:Vector;
    private velocity:Vector;
    public mass:number;
    private transparency:number = 0.5;
    private transparencyFlag:boolean = true;
    private type:number;
    
    constructor(level:Level, position:Vector, velocity:Vector, mass:number, type:number)
    {
        this.level = level;
        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.type = type;
    }

    public update():void
    {
        if (this.type == settings.CELL_TYPE_DIRECTION && Math.random() < 0.005) {
            this.velocity = new Vector(Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3);
        }
        if (this.type == settings.CELL_TYPE_ESCAPER) {
            var toPlayer = this.position.subtract(this.level.player.position);
            if (toPlayer.length() < 100) {
                this.velocity = toPlayer.normalize().multiply(this.velocity.length());
            }
        }
        this.position = this.position.add(this.velocity);
        if (this.position.x() > this.level.game.dimensions.x()) {
            this.position = this.position.subtract(new Vector(this.level.game.dimensions.x(), 0));
        }
        if (this.position.y() > this.level.game.dimensions.y()) {
            this.position = this.position.subtract(new Vector(0, this.level.game.dimensions.y()));
        }
        if (this.position.x() < 0) {
            this.position = new Vector(this.level.game.dimensions.x() - this.position.x(), this.position.y());
        }
        if (this.position.y() < 0) {
            this.position = new Vector(this.position.x(), this.level.game.dimensions.y() - this.position.y());
        }

        this.updateTransparency();
    }

    public render():void
    {
        var dimensions = this.level.game.dimensions;
        var check = new PositionCheck(this.position, this.mass, dimensions);

        this.drawElement(this.position);
        if (check.isOutOfLeftBorder()) {
            this.drawElement(new Vector(dimensions.x() + this.position.x(), this.position.y()));
        }
        if (check.isOutOfTopBorder()) {
            this.drawElement(new Vector(this.position.x(), dimensions.y() + this.position.y()));
        }
        if (check.isOutOfRightBorder()) {
            this.drawElement(new Vector(this.position.x() - dimensions.x(), this.position.y()));
        }
        if (check.isOutOfBottomBorder()) {
            this.drawElement(new Vector(this.position.x(), this.position.y() - dimensions.y()));
        }

        if (check.isOutOfTopLeftCorner()) {
            this.drawElement(new Vector(dimensions.x() + this.position.x(), dimensions.y() + this.position.y()));
        }
        if (check.isOutOfBottomLeftCorner()) {
            this.drawElement(new Vector(dimensions.x() + this.position.x(), this.position.y() - dimensions.y()));
        }
        if (check.isOutOfTopRightCorner()) {
            this.drawElement(new Vector(this.position.x() - dimensions.x(), dimensions.y() + this.position.y()));
        }
        if (check.isOutOfBottomRightCorner()) {
            this.drawElement(new Vector(this.position.x() - dimensions.x(), this.position.y() - dimensions.y()));
        }
    }

    private drawElement(position:Vector):void
    {
        new Circle()
            .at(position)
            .withRadius(this.mass)
            .withStrokeStyle(this.color())
            .withFillStyle(this.color().alpha(0.3))
            .withLineWidth(3)
            .draw();
        new Circle()
            .at(position)
            .withRadius(this.mass + 1)
            .withStrokeStyle(settings.white.alpha(this.transparency))
            .draw();
    }

    private updateTransparency():void
    {
        if (this.transparencyFlag) {
            this.transparency += 0.005;
        } else {
            this.transparency -= 0.005;
        }

        if (this.transparency >= 0.8 || this.transparency <= 0.2) {
            this.transparencyFlag = !this.transparencyFlag;
        }
    }

    private color():Color
    {
        if (this.type == settings.CELL_TYPE_PLAYER) {
            return settings.blue;
        } else if (this.type == settings.CELL_TYPE_SIMPLE) {
            return settings.green;
        } else if (this.type == settings.CELL_TYPE_ABSORB) {
            return settings.red;
        } else if (this.type == settings.CELL_TYPE_DIRECTION) {
            return settings.yellow;
        } else if (this.type == settings.CELL_TYPE_ESCAPER) {
            return settings.purple;
        }
    }

    public isForeign()
    {
        return this.type !== settings.CELL_TYPE_PLAYER;
    }

    public massWhenAbsorbed()
    {
        var mass = this.mass;

        if (this.type == settings.CELL_TYPE_ABSORB) {
            mass *= -1;
        }

        return mass;
    }
}

export default Cell;
