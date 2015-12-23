import Vector from './../Math/Vector';
import canvas from './../System/Canvas';
import Timer from "../Util/Timer";

class Mouse
{
    public static position:Vector = new Vector(0, 0);
    private static click = false;
    public static timer = new Timer(30);
    private static onMoveCallbacks:Array<Function> = [];

    public static init():void
    {
        document.addEventListener('mousemove', Mouse.mouseMove.bind(this), true);
        document.addEventListener('mousedown', Mouse.mouseDown.bind(this), true);
        document.addEventListener('mouseup', Mouse.mouseUp.bind(this), true);
        document.addEventListener('touchstart', Mouse.touchStart.bind(this), true);
        document.addEventListener('touchend', Mouse.touchEnd.bind(this), true);

        setInterval(function() {
            Mouse.timer.update();
        }, 1 / 30);
    }

    public static mouseMove(event:MouseEvent):void
    {
        Mouse.updatePosition(new Vector(event.clientX, event.clientY));
    }

    public static updatePosition(position:Vector):void
    {
        var canvasRect = canvas.getBoundingClientRect();
        Mouse.position = position.subtract(new Vector(canvasRect.left, canvasRect.top));
        Mouse.onMoveCallbacks.forEach(function(callback) {
            callback();
        });
    }

    public static mouseDown():void
    {
        Mouse.click = true;
    }

    public static mouseUp():void
    {
        Mouse.click = false;
    }

    public static touchStart(event:TouchEvent):void
    {
        Mouse.updatePosition(new Vector(event.changedTouches[0].pageX, event.changedTouches[0].pageY));
        Mouse.mouseDown();
    }

    public static touchEnd():void
    {
        Mouse.mouseUp();
    }

    public static onMove(callback: Function):void
    {
        Mouse.onMoveCallbacks.push(callback);
    }

    public static clicked():boolean
    {
        return Mouse.click && Mouse.timer.isReady();
    }
}

export default Mouse;
