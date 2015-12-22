import Level from "../Level";

class Music
{
    public enabled = true;
    private musicMenu:HTMLAudioElement = new Audio('music/menu.mp3');
    private musicLevels:Array<HTMLAudioElement> = [
        new Audio('music/0.mp3'),
        new Audio('music/1.mp3'),
        new Audio('music/2.mp3'),
        new Audio('music/3.mp3'),
        new Audio('music/4.mp3'),
        new Audio('music/5.mp3')
    ];

    public toggle():void
    {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.pauseMenu();
        }
        if (this.enabled) {
            this.playMenu();
        }
        window.localStorage.setItem('disable_music', (!this.enabled).toString());
    }

    public playMenu():void
    {
        if (!this.enabled) {
            return;
        }

        this.musicMenu.loop = true;
        this.musicMenu.play();
    }

    public playLevel(level:number):void
    {
        if (!this.enabled) {
            return;
        }

        var index = level % 6;

        this.musicLevels[index].loop = true;
        this.musicLevels[index].play();
    }

    public pauseMenu():void
    {
        this.musicMenu.pause();
    }

    public pauseLevel(level:number):void
    {
        var index = level % 6;

        this.musicLevels[index].pause();
    }
}

export default Music;
