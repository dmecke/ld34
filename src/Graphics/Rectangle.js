Context = require('./../System/Context.js');

function Rectangle(position, width, height)
{
    this.position = position;
    this.width = width;
    this.height = height;
    this.fillStyle = 'transparent';
    this.strokeStyle = 'transparent';

    this.draw = function()
    {
        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.beginPath();
        Context.rect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
        Context.stroke();
        Context.fill();
        Context.closePath();
    }
}

module.exports = Rectangle;
