import Vector from "../Math/Vector";
import Color from "../Graphics/Color";

abstract class Shape
{
    protected position:Vector = new Vector(0, 0);
    protected strokeStyle:string = 'transparent';
    protected fillStyle:string = 'transparent';
    protected lineWidth:number = 1;

    public at(position:Vector):this
    {
        this.position = position;

        return this;
    }

    public withStrokeStyle(color:Color):this
    {
        this.strokeStyle = color.toString();

        return this;
    }

    public withFillStyle(color:Color):this
    {
        this.fillStyle = color.toString();

        return this;
    }

    public withLineWidth(lineWidth:number):this
    {
        this.lineWidth = lineWidth;

        return this;
    }

    public abstract draw():void;
}

export default Shape;
