import Context from "./../System/Context";
import Vector from "../Math/Vector";

class Rectangle
{
    private position:Vector;
    private width:number;
    private height:number;
    public lineWidth:number;
    public fillStyle:string;
    public strokeStyle:string;

    constructor(position:Vector, width:number, height:number)
    {
        this.position = position;
        this.width = width;
        this.height = height;
        this.lineWidth = 1;
        this.fillStyle = 'transparent';
        this.strokeStyle = 'transparent';
    }

    public draw():void
    {
        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.lineWidth = this.lineWidth;
        Context.beginPath();
        Context.rect(this.position.x() - this.width / 2, this.position.y() - this.height / 2, this.width, this.height);
        Context.stroke();
        Context.fill();
        Context.closePath();
    }
}

export default Rectangle;
