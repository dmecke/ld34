import Context from "./../System/Context";
import Vector from "../Math/Vector";

class Text
{
    private position:Vector;
    private content:string;
    private font:string;
    private strokeStyle:string;
    private fillStyle:string;
    public lineWidth:number = 1;
    private textAlign:string;
    public maxWidth:number;
    private lineHeight:number = 38;

    constructor(position:Vector, content:string, strokeStyle:string = 'transparent', fillStyle:string = 'transparent', font:string = '12px Oswald', textAlign:string = 'center')
    {
        this.position = position;
        this.content = content;
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.font = font;
        this.textAlign = textAlign;
    }

    public draw():void
    {
        Context.font = this.font;
        Context.fillStyle = this.fillStyle;
        Context.strokeStyle = this.strokeStyle;
        Context.lineWidth = this.lineWidth;
        Context.textAlign = this.textAlign;

        var words = this.content.split(' ');
        var line = '';
        var y = this.position.y();
        for (var word = 0; word < words.length; word++) {
            var testLine = line + words[word] + ' ';
            var metrics = Context.measureText(testLine);
            var testWidth = metrics.width;

            if (this.maxWidth && testWidth > this.maxWidth) {
                Context.strokeText(line, this.position.x(), y);
                Context.fillText(line, this.position.x(), y);
                line = words[word] + ' ';
                y += this.lineHeight;
            } else {
                line = testLine;
            }
        }
        Context.strokeText(line.trim(), this.position.x(), y);
        Context.fillText(line.trim(), this.position.x(), y);
    }
}

export default Text;
