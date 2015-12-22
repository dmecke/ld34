import Timer from "./../Util/Timer";
import Vector from "./../Math/Vector";

class Keyboard
{
    static KEY_A = 65;
    static KEY_D = 68;

    public direction:Vector = new Vector(1, 0);
    public timer:Timer = new Timer(30);

    public steer(keyCode:number):void
    {
        if (!this.timer.isReady()) {
            return;
        }

        if (keyCode == Keyboard.KEY_A) {
            this.direction = this.direction.rotateByDegress(-45);
            this.timer.reset();
        }

        if (keyCode == Keyboard.KEY_D) {
            this.direction = this.direction.rotateByDegress(45);
            this.timer.reset();
        }
    }
}

var keyboard = new Keyboard();
setInterval(function() {
    keyboard.timer.update();
}, 1 / 30);

export default keyboard;
