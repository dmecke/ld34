class Vector
{
    private components:Array<number>;
    
    constructor(x:number, y:number)
    {
        this.components = [x, y];
    }

    public x():number
    {
        return this.components[0];
    }

    public y():number
    {
        return this.components[1];
    }

    public add(vector:Vector):Vector
    {
        return new Vector(this.components[0] + vector.x(), this.components[1] + vector.y());
    }

    public subtract(vector:Vector):Vector
    {
        return new Vector(this.components[0] - vector.x(), this.components[1] - vector.y());
    }

    public multiply(multiplier:number):Vector
    {
        return new Vector(this.components[0] * multiplier, this.components[1] * multiplier);
    }

    public divide(divisor:number):Vector
    {
        return new Vector(this.components[0] / divisor, this.components[1] / divisor);
    }

    public length():number
    {
        return Math.sqrt(this.components[0] * this.components[0] + this.components[1] * this.components[1]);
    }

    public distanceTo(vector:Vector):number
    {
        var diffX = this.components[0] - vector.x();
        var diffY = this.components[1] - vector.y();

        return Math.sqrt(diffX * diffX + diffY * diffY);
    }

    public normalize():Vector
    {
        return this.divide(this.length());
    }

    public limit(limit:number):Vector
    {
        if (this.length() <= limit) {
            return new Vector(this.components[0], this.components[1]);
        }

        return this.normalize().multiply(limit);
    }

    public rotateByDegress(degrees:number):Vector
    {
        return this.rotateByRadians(degrees * Math.PI / 180);
    }

    public rotateByRadians(radians:number):Vector
    {
        var ca = Math.cos(radians);
        var sa = Math.sin(radians);
        var length = this.length();

        var vector = new Vector(Math.round(ca * this.components[0] - sa * this.components[1]), Math.round(sa * this.components[0] + ca * this.components[1]));

        return vector.normalize().multiply(length);
    }
}

export default Vector;
