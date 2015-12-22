import Context from "./../System/Context";
import Vector from "../Math/Vector";

class Circle
{
    private position:Vector;
    private radius:number;
    private fillStyle:string;
    private strokeStyle:string;
    private lineWidth:number;

    constructor(position:Vector, radius:number, strokeStyle:string = 'transparent', fillStyle:string = 'transparent', lineWidth:number = 1)
    {
        this.position = position;
        this.radius = radius;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }

    public draw():void
    {
        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.lineWidth = this.lineWidth;
        Context.beginPath();
        Context.arc(this.position.x(), this.position.y(), this.radius, 0, 2 * Math.PI);
        Context.stroke();
        Context.fill();
        Context.closePath();
    }
}

export default Circle;
