import Vector from "./../Math/Vector";
import Circle from "./../Graphics/Circle";
import Cell from "./Cell";
import PositionCheck from "./../Util/PositionCheck";
import keyboard from "./../Input/Keyboard";
import settings from "./../Settings";
import Level from "../Level";
import Mouse from "../Input/Mouse";
import Keyboard from "../Input/Keyboard";

class Player
{
    private level:Level;
    public position:Vector = new Vector(400, 300);
    private velocity:Vector = new Vector(0, 0);
    private minimumMass:number = 10;
    public mass:number = this.minimumMass + 10;
    private transparency:number = 0.5;
    private transparencyFlag:boolean = true;
    
    constructor(level)
    {
        this.level = level;
    }

    public update():void
    {
        this.checkCollision();
        this.processUserInput();
        this.updatePosition();
        this.updateTransparency();
    }

    public render():void
    {
        this.draw(this.mass);
        this.draw(this.minimumMass);

        new Circle()
            .at(this.position)
            .withRadius(this.mass + 1)
            .withStrokeStyle(settings.white.replace(')', ', ' + this.transparency + ')').replace('rgb', 'rgba'))
            .draw();
    }

    private draw(radius:number):void
    {
        var dimensions = this.level.game.dimensions;
        var check = new PositionCheck(this.position, radius, dimensions);

        this.drawElement(this.position, radius);
        if (check.isOutOfLeftBorder()) {
            this.drawElement(new Vector(dimensions.x() + this.position.x(), this.position.y()), radius);
        }
        if (check.isOutOfTopBorder()) {
            this.drawElement(new Vector(this.position.x(), dimensions.y() + this.position.y()), radius);
        }
        if (check.isOutOfRightBorder()) {
            this.drawElement(new Vector(this.position.x() - dimensions.x(), this.position.y()), radius);
        }
        if (check.isOutOfBottomBorder()) {
            this.drawElement(new Vector(this.position.x(), this.position.y() - dimensions.y()), radius);
        }

        if (check.isOutOfTopLeftCorner()) {
            this.drawElement(new Vector(dimensions.x() + this.position.x(), dimensions.y() + this.position.y()), radius);
        }
        if (check.isOutOfBottomLeftCorner()) {
            this.drawElement(new Vector(dimensions.x() + this.position.x(), this.position.y() - dimensions.y()), radius);
        }
        if (check.isOutOfTopRightCorner()) {
            this.drawElement(new Vector(this.position.x() - dimensions.x(), dimensions.y() + this.position.y()), radius);
        }
        if (check.isOutOfBottomRightCorner()) {
            this.drawElement(new Vector(this.position.x() - dimensions.x(), this.position.y() - dimensions.y()), radius);
        }
    }

    private drawElement(position:Vector, radius:number):void
    {
        new Circle()
            .at(position)
            .withRadius(radius)
            .withStrokeStyle(settings.blue)
            .withFillStyle(settings.blue.replace(')', ', 0.2)').replace('rgb', 'rgba'))
            .withLineWidth(2)
            .draw();
    }

    private checkCollision():void
    {
        var dimensions = this.level.game.dimensions;
        var check = new PositionCheck(this.position, this.mass, dimensions);

        for (var i = 0; i < this.level.cells.length; i++) {
            var cell = this.level.cells[i];
            this.checkCollisionAt(this.position, cell, i);

            if (check.isOutOfLeftBorder()) {
                this.checkCollisionAt(new Vector(dimensions.x() + this.position.x(), this.position.y()), cell, i);
            }
            if (check.isOutOfTopBorder()) {
                this.checkCollisionAt(new Vector(this.position.x(), dimensions.y() + this.position.y()), cell, i);
            }
            if (check.isOutOfRightBorder()) {
                this.checkCollisionAt(new Vector(this.position.x() - dimensions.x(), this.position.y()), cell, i);
            }
            if (check.isOutOfBottomBorder()) {
                this.checkCollisionAt(new Vector(this.position.x(), this.position.y() - dimensions.y()), cell, i);
            }

            if (check.isOutOfTopLeftCorner()) {
                this.checkCollisionAt(new Vector(dimensions.x() + this.position.x(), dimensions.y() + this.position.y()), cell, i);
            }
            if (check.isOutOfBottomLeftCorner()) {
                this.checkCollisionAt(new Vector(dimensions.x() + this.position.x(), this.position.y() - dimensions.y()), cell, i);
            }
            if (check.isOutOfTopRightCorner()) {
                this.checkCollisionAt(new Vector(this.position.x() - dimensions.x(), dimensions.y() + this.position.y()), cell, i);
            }
            if (check.isOutOfBottomRightCorner()) {
                this.checkCollisionAt(new Vector(this.position.x() - dimensions.x(), this.position.y() - dimensions.y()), cell, i);
            }
        }
    }

    private checkCollisionAt(position:Vector, cell:Cell, index:number):void
    {
        if (this.collidesWithCell(position, cell)) {
            this.incorporateCell(cell, index);
            if (cell.isForeign()) {
                this.level.collectedCells++;
            }
        }
    }

    private collidesWithCell(position:Vector, cell:Cell):boolean
    {
        return cell.position.distanceTo(position) < this.mass + cell.mass;
    }

    private incorporateCell(cell, index):void
    {
        // @todo find out correct formula
        //var velChange = this.velocity.subtract(cell.velocity).multiply(-1).normalize().multiply(1 / cell.mass);
        //this.velocity = this.velocity.add(velChange);
        this.addMass(cell.massWhenAbsorbed());
        this.level.cells.splice(index, 1);
        this.level.game.sfx.absorb();
    }

    private updatePosition():void
    {
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
    }

    private processUserInput():void
    {
        if (!this.accelerationActive()) {
            return;
        }

        if (this.mass == this.minimumMass) {
            return;
        }

        var emittedMass = Math.max(0.2, this.mass * 0.2);
        var direction = this.movementDirection();
        var force = direction.multiply(-1).multiply(emittedMass).divide(this.mass);
        this.addMass(-emittedMass);
        var cellPosition = this.position.add(direction.multiply(this.mass + emittedMass));
        var cell = new Cell(this.level, cellPosition, this.velocity, emittedMass, settings.CELL_TYPE_PLAYER);
        this.velocity = this.velocity.add(force);
        this.level.cells.push(cell);
        this.level.game.sfx.accelerate();
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

    private addMass(amount:number):void
    {
        this.mass = Math.max(this.minimumMass, this.mass + amount);
    }

    private accelerationActive():boolean
    {
        if (this.level.levelSettings.level == 5) {
            this.velocity = Keyboard.direction.normalize();
            return false;
        }

        var clicked = Mouse.clicked();
        if (clicked) {
            Mouse.timer.reset();
        }

        return clicked;
    }

    private movementDirection():Vector
    {
        if (this.level.levelSettings.level == 5) {
            return Keyboard.direction.normalize();
        }

        return Mouse.position.subtract(this.position).normalize()
    }
}

export default Player;
