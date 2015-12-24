import Vector from "./../../Math/Vector";
import Circle from "./../../Graphics/Circle";
import settings from "./../../Settings";
import Level from "../../Level";
import Color from "../../Graphics/Color";
import MovingObject from "./../MovingObject";
import CellGraphics from "../../Graphics/CellGraphics";

abstract class Cell extends MovingObject
{
    private graphic:CellGraphics = new CellGraphics();
    
    constructor(level:Level, position:Vector, velocity:Vector, mass:number)
    {
        super(position, mass, velocity);
        this.level = level;
    }

    public update():void
    {
        super.update();
    }

    public render():void
    {
        this.graphic.draw(this.position, this.radius(), this.color());
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
