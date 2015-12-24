import Vector from "../Math/Vector";

class MovingObject
{
    public position:Vector;
    protected velocity:Vector;
    public mass:number;

    constructor(position:Vector, mass:number, velocity:Vector)
    {
        this.position = position;
        this.mass = mass;
        this.velocity = velocity;
    }

    public momentum():Vector
    {
        return this.velocity.multiply(this.mass);
    }

    public radius():number
    {
        return this.mass;
    }
}

export default MovingObject
