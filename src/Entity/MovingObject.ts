import Vector from "../Math/Vector";
import Level from "../Level";

class MovingObject
{
    protected level:Level;
    public position:Vector;
    protected velocity:Vector;
    public mass:number;

    constructor(position:Vector, mass:number, velocity:Vector)
    {
        this.position = position;
        this.mass = mass;
        this.velocity = velocity;
    }

    public update():void
    {
        this.position = this.position.add(this.velocity);
        this.reflectAtWalls();
    }

    public momentum():Vector
    {
        return this.velocity.multiply(this.mass);
    }

    public radius():number
    {
        return this.mass;
    }

    protected reflectAtWalls():void
    {
        if (this.position.x() > this.level.game.dimensions.x() - this.radius()) {
            this.velocity = this.velocity.mirror(new Vector(1, 0));
            let ueberlappung = this.position.x() + this.radius() - this.level.game.dimensions.x();
            this.position = this.position.subtract(new Vector(2 * ueberlappung, 0));
        }
        if (this.position.y() > this.level.game.dimensions.y() - this.radius()) {
            this.velocity = this.velocity.mirror(new Vector(0, 1));
            let ueberlappung = this.position.y() + this.radius() - this.level.game.dimensions.y();
            this.position = this.position.subtract(new Vector(0, 2 * ueberlappung));
        }
        if (this.position.x() < this.radius()) {
            this.velocity = this.velocity.mirror(new Vector(1, 0));
            this.position = this.position.add(new Vector(2 * (this.radius() - this.position.x()), 0));
        }
        if (this.position.y() < this.radius()) {
            this.velocity = this.velocity.mirror(new Vector(0, 1));
            this.position = this.position.add(new Vector(0, 2 * (this.radius() - this.position.y())));
        }
    };
}

export default MovingObject
