import Container from "./Container";

class Sfx
{
    private audioAccelerate:Container = new Container('sfx/accelerate.mp3');
    private audioAbsorb:Container = new Container('sfx/absorb.mp3');
    public enabled:boolean = true;

    public toggle():void
    {
        this.enabled = !this.enabled;
        window.localStorage.setItem('disable_sfx', (!this.enabled).toString());
    }

    public absorb():void
    {
        if (!this.enabled) {
            return;
        }

        this.audioAbsorb.play();
    }

    public accelerate():void
    {
        if (!this.enabled) {
            return;
        }

        this.audioAccelerate.play();
    }
}

export default Sfx;
