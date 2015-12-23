import Timer from "./../Util/Timer";
import Vector from "./../Math/Vector";

class Keyboard
{
    static KEY_A = 65;
    static KEY_D = 68;

    public static direction:Vector = new Vector(1, 0);
    public static timer:Timer = new Timer(30);

    public static init():void
    {
        document.addEventListener('keydown', Keyboard.keyDown.bind(this), true);

        setInterval(function() {
            Keyboard.timer.update();
        }, 1 / 30);
    }

    public static keyDown(event:KeyboardEvent):void
    {
        Keyboard.steer(event.keyCode);
    }

    public static steer(keyCode:number):void
    {
        if (!Keyboard.timer.isReady()) {
            return;
        }

        if (keyCode == Keyboard.KEY_A) {
            Keyboard.direction = Keyboard.direction.rotateByDegress(-45);
            Keyboard.timer.reset();
        }

        if (keyCode == Keyboard.KEY_D) {
            Keyboard.direction = Keyboard.direction.rotateByDegress(45);
            Keyboard.timer.reset();
        }
    }
}

export default Keyboard;
