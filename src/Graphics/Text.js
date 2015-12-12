Context = require('./../System/Context.js');

function Text(position, content)
{
    this.position = position;
    this.content = content;
    this.font = '12px Roboto';
    this.fillStyle = 'transparent';
    this.strokeStyle = 'transparent';
    this.lineWidth = 1;
    this.textAlign = 'center';

    this.draw = function()
    {
        Context.font = this.font;
        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.lineWidth = this.lineWidth;
        Context.textAlign = this.textAlign;
        Context.strokeText(this.content, this.position.x, this.position.y);
        Context.fillText(this.content, this.position.x, this.position.y);
    }
}

module.exports = Text;
