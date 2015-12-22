class Container
{
    private audio:Array<HTMLAudioElement>;

    constructor(src:string)
    {
        this.audio = [
            new Audio(src),
            new Audio(src),
            new Audio(src),
            new Audio(src),
            new Audio(src)
        ];
    }

    public play():void
    {
        for (var i = 0; i < this.audio.length; i++) {
            if (this.audio[i].paused) {
                this.audio[i].play();
                return;
            }
        }
    }

    public pause():void
    {
        for (var i = 0; i < this.audio.length; i++) {
            this.audio[i].pause();
        }
    }
}

export default Container;
