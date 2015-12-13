Context = require('./../System/Context.js');

function Text(position, content)
{
    this.position = position;
    this.content = content;
    this.font = '12px Oswald';
    this.fillStyle = 'transparent';
    this.strokeStyle = 'transparent';
    this.lineWidth = 1;
    this.textAlign = 'center';
    this.maxWidth = undefined;
    this.lineHeight = 38;

    this.draw = function()
    {
        Context.font = this.font;
        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.lineWidth = this.lineWidth;
        Context.textAlign = this.textAlign;

        var words = String(this.content).split(' ');
        var line = '';
        var y = this.position.y;
        for (var word = 0; word < words.length; word++) {
            var testLine = line + words[word] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;

            if (this.maxWidth && testWidth > this.maxWidth) {
                Context.strokeText(line, this.position.x, y);
                Context.fillText(line, this.position.x, y);
                line = words[word] + ' ';
                y += this.lineHeight;
            } else {
                line = testLine;
            }
        }
        Context.strokeText(line.trim(), this.position.x, y);
        Context.fillText(line.trim(), this.position.x, y);
    }
}

module.exports = Text;
