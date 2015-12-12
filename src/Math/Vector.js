function Vector(x, y)
{
    this.x = x;
    this.y = y;

    this.add = function(vector)
    {
        return new Vector(this.x + vector.x, this.y + vector.y);
    };

    this.subtract = function(vector)
    {
        return new Vector(this.x - vector.x, this.y - vector.y);
    };

    this.multiply = function(multiplier)
    {
        return new Vector(this.x * multiplier, this.y * multiplier);
    };

    this.divide = function(divisor)
    {
        return new Vector(this.x / divisor, this.y / divisor);
    };

    this.length = function()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    this.distanceTo = function(vector)
    {
        var diffX = this.x - vector.x;
        var diffY = this.y - vector.y;

        return Math.sqrt(diffX * diffX + diffY * diffY);
    };

    this.normalize = function()
    {
        return this.divide(this.length());
    };

    this.limit = function(limit)
    {
        if (this.length() <= limit) {
            return new Vector(this.x, this.y);
        }

        return this.normalize().multiply(limit);
    };
}

module.exports = Vector;
