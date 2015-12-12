Context = require('./../System/Context.js');

function Square(position, size)
{
    this.position = position;
    this.size = size;
    this.fillStyle = 'transparent';
    this.strokeStyle = 'transparent';

    this.draw = function()
    {
        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.beginPath();
        Context.rect(this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
        Context.stroke();
        Context.fill();
        Context.closePath();
    }
}

module.exports = Square;
