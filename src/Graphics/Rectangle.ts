import Context from "./../System/Context";
import Vector from "../Math/Vector";
import Shape from "./Shape";

class Rectangle extends Shape
{
    private width:number = 10;
    private height:number = 10;

    public withWidth(width:number):this
    {
        this.width = width;

        return this;
    }

    public withHeight(height:number):this
    {
        this.height = height;

        return this;
    }

    public draw():void
    {
        var position = this.position.subtract(new Vector(this.width / 2, this.height / 2));

        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.lineWidth = this.lineWidth;
        Context.beginPath();
        Context.rect(position.x(), position.y(), this.width, this.height);
        Context.stroke();
        Context.fill();
        Context.closePath();
    }
}

export default Rectangle;
