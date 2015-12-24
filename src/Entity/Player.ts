import Vector from "./../Math/Vector";
import Circle from "./../Graphics/Circle";
import keyboard from "./../Input/Keyboard";
import settings from "./../Settings";
import Level from "../Level";
import Mouse from "../Input/Mouse";
import Keyboard from "../Input/Keyboard";
import PlayerGraphic from "../Graphics/PlayerGraphic";
import MovingObject from "./MovingObject";
import PlayerCell from "./Cell/PlayerCell";
import Cell from "./Cell/Cell";

class Player extends MovingObject
{
    private minimumMass:number = 10;
    private graphic:PlayerGraphic = new PlayerGraphic();
    
    constructor(level)
    {
        super(new Vector(400, 300), 20, new Vector(0, 0));
        this.level = level;
    }

    public update():void
    {
        this.checkCollision();
        this.processUserInput();
        super.update();
    }

    public render():void
    {
        this.graphic.draw(this.position, this.minimumMass, this.radius());
    }

    private checkCollision():void
    {
        for (var i = 0; i < this.level.cells.length; i++) {
            var cell = this.level.cells[i];
            this.checkCollisionAt(this.position, cell, i);
        }
    }

    private checkCollisionAt(position:Vector, cell:Cell, index:number):void
    {
        if (this.collidesWithCell(position, cell)) {
            this.incorporateCell(position, cell, index);
        }
    }

    private collidesWithCell(position:Vector, cell:Cell):boolean
    {
        return cell.position.distanceTo(position) < this.radius() + cell.radius();
    }

    private incorporateCell(position, cell, index):void
    {
        //var overallMomentum = this.momentum().add(cell.momentum());
        //this.velocity = overallMomentum.divide(this.mass);

        this.addMass(cell.mass * cell.massSign());
        this.level.cells.splice(index, 1);
        this.level.game.sfx.absorb();
        if (cell.isForeign()) {
            this.level.collectedCells++;
        }

        //var diff = 0.1;
        //this.addMass(diff * cell.massSign());
        //cell.mass -= diff;
        //if (cell.mass <= 0) {
        //    this.level.cells.splice(index, 1);
        //    this.level.game.sfx.absorb();
        //    if (cell.isForeign()) {
        //        this.level.collectedCells++;
        //    }
        //}
    }

    private processUserInput():void
    {
        if (!this.accelerationActive()) {
            return;
        }

        if (this.mass == this.minimumMass) {
            return;
        }

        var emittedMass = Math.max(0.1, this.mass * 0.1);
        var direction = this.movementDirection();
        var force = direction.multiply(-1).multiply(emittedMass).divide(this.mass);
        this.addMass(-emittedMass);
        var cell = new PlayerCell(this.level, new Vector(0, 0), this.velocity, emittedMass);
        cell.position = this.position.add(direction.multiply(this.radius() + cell.radius()));
        this.velocity = this.velocity.add(force);
        this.level.cells.push(cell);
        this.level.game.sfx.accelerate();
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
