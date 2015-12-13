function PositionCheck(position, radius, dimensions)
{
    this.position = position;
    this.radius = radius;
    this.dimensions = dimensions;

    this.isOutOfLeftBorder = function()
    {
        return this.position.x - this.radius < 0
    };

    this.isOutOfTopBorder = function()
    {
        return this.position.y - this.radius < 0;
    };

    this.isOutOfRightBorder = function()
    {
        return this.position.x + radius > this.dimensions.x;
    };

    this.isOutOfBottomBorder = function()
    {
        return this.position.y + this.radius > this.dimensions.y;
    };

    this.isOutOfTopLeftCorner = function()
    {
        return this.position.x - this.radius < 0 && this.position.y - this.radius < 0;
    };

    this.isOutOfTopRightCorner = function()
    {
        return this.position.x + this.radius > this.dimensions.x && this.position.y - this.radius < 0;
    };

    this.isOutOfBottomLeftCorner = function()
    {
        return this.position.x - this.radius < 0 && this.position.y + this.radius > this.dimensions.y;
    };

    this.isOutOfBottomRightCorner = function()
    {
        return this.position.x + this.radius > this.dimensions.x && this.position.y + this.radius > this.dimensions.y;
    };
}

module.exports = PositionCheck;
