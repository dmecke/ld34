import Timer from "./../Util/Timer";
import Vector from "./../Math/Vector";
import canvas from "./../System/Canvas";

class Mouse
{
    public position = new Vector(0, 0);
    private click = false;
    public timer = new Timer(30);

    public updatePosition(event):void
    {
        var canvasRect = canvas.getBoundingClientRect();
        var x, y;
        if (event.clientX) {
            x = event.clientX;
        }
        if (event.clientY) {
            y = event.clientY;
        }
        if (event.changedTouches) {
            x = event.changedTouches[0].pageX;
            y = event.changedTouches[0].pageY;
        }

        this.position = new Vector(x - canvasRect.left, y - canvasRect.top);
    }

    public buttonDown():void
    {
        this.click = true;
    }

    public buttonUp():void
    {
        this.click = false;
    }

    public clicked():boolean
    {
        return this.click && this.timer.isReady();
    }
}

var mouse = new Mouse();
setInterval(function() { mouse.timer.update(); }, 1 / 30);

export default mouse;
