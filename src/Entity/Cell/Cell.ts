import Vector from "./../../Math/Vector";
import Circle from "./../../Graphics/Circle";
import PositionCheck from "./../../Util/PositionCheck";
import settings from "./../../Settings";
import Level from "../../Level";
import Color from "../../Graphics/Color";
import MovingObject from "./../MovingObject";
import CellGraphics from "../../Graphics/CellGraphics";

abstract class Cell extends MovingObject
{
    protected level:Level;
    private graphic:CellGraphics = new CellGraphics();
    
    constructor(level:Level, position:Vector, velocity:Vector, mass:number)
    {
        super(position, mass, velocity);
        this.level = level;
    }

    public update():void
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

    public render():void
    {
        this.graphic.draw(this.position, this.radius(), this.color(), this.level.game.dimensions);
    }

    protected abstract color():Color;

    public isForeign():boolean
    {
        return true;
    }

    public massSign():number
    {
        return 1;
    }
}

export default Cell;
