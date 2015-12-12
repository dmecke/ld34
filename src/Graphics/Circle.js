Context = require('./../System/Context.js');

function Circle(position, radius)
{
    this.position = position;
    this.radius = radius;
    this.fillStyle = 'transparent';
    this.strokeStyle = 'transparent';

    this.draw = function()
    {
        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.beginPath();
        Context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        Context.stroke();
        Context.fill();
        Context.closePath();
    }
}

module.exports = Circle;
