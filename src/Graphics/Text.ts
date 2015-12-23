import Context from "./../System/Context";
import Vector from "../Math/Vector";
import Shape from "./Shape";

class Text extends Shape
{
    private content:string;
    private fontSize:number = 12;
    private font:string = 'Oswald';
    private textAlign:string = 'center';
    private maxWidth:number;
    private lineHeight:number = 38;

    public constructor(content)
    {
        super();
        this.content = content;
    }

    public withFont(font:string):this
    {
        this.font = font;

        return this;
    }

    public withFontSize(fontSize:number):this
    {
        this.fontSize = fontSize;

        return this;
    }

    public leftAligned():this
    {
        this.textAlign = 'left';

        return this;
    }

    public withMaxWidth(maxWidth:number):this
    {
        this.maxWidth = maxWidth;

        return this;
    }

    public draw():void
    {
        Context.font = this.fontSize.toString() + 'px "' + this.font + '"';
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
