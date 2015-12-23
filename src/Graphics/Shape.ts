import Vector from "../Math/Vector";

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

    public withStrokeStyle(strokeStyle:string):this
    {
        this.strokeStyle = strokeStyle;

        return this;
    }

    public withFillStyle(fillStyle:string):this
    {
        this.fillStyle = fillStyle;

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
