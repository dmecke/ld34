import Vector from "../Math/Vector";

class PositionCheck
{
    private position:Vector;
    private radius:number;
    private dimensions:Vector;

    constructor(position:Vector, radius:number, dimensions:Vector)
    {
        this.position = position;
        this.radius = radius;
        this.dimensions = dimensions;
    }

    public isOutOfLeftBorder():boolean
    {
        return this.position.x() - this.radius < 0
    }

    public isOutOfTopBorder():boolean
    {
        return this.position.y() - this.radius < 0;
    }

    public isOutOfRightBorder():boolean
    {
        return this.position.x() + this.radius > this.dimensions.x();
    }

    public isOutOfBottomBorder():boolean
    {
        return this.position.y() + this.radius > this.dimensions.y();
    }

    public isOutOfTopLeftCorner():boolean
    {
        return this.position.x() - this.radius < 0 && this.position.y() - this.radius < 0;
    }

    public isOutOfTopRightCorner():boolean
    {
        return this.position.x() + this.radius > this.dimensions.x() && this.position.y() - this.radius < 0;
    }

    public isOutOfBottomLeftCorner():boolean
    {
        return this.position.x() - this.radius < 0 && this.position.y() + this.radius > this.dimensions.y();
    }

    public isOutOfBottomRightCorner():boolean
    {
        return this.position.x() + this.radius > this.dimensions.x() && this.position.y() + this.radius > this.dimensions.y();
    }
}

export default PositionCheck;
