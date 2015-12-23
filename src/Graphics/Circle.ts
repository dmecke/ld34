import Context from "./../System/Context";
import Vector from "../Math/Vector";
import Shape from "./Shape";

class Circle extends Shape
{
    private radius:number = 10;

    public withRadius(radius:number):this
    {
        this.radius = radius;

        return this;
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
