import Circle from "./Circle";
import Color from "./Color";

class PulsatingCircle extends Circle
{
    private alpha:number = 0.5;
    private alphaFlag:boolean = true;
    private pulsatingColor:Color;

    public draw():void
    {
        this.updateTransparency();
        this.withStrokeStyle(this.pulsatingColor.alpha(this.alpha));

        super.draw();
    }

    public withStrokeStyle(color:Color):this
    {
        this.pulsatingColor = color;

        super.withStrokeStyle(color);

        return this;
    }

    private updateTransparency():void
    {
        if (this.alphaFlag) {
            this.alpha += 0.005;
        } else {
            this.alpha -= 0.005;
        }

        if (this.alpha >= 0.8 || this.alpha <= 0.2) {
            this.alphaFlag = !this.alphaFlag;
        }
    }
}

export default PulsatingCircle
