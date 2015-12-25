class FPS
{
    static filterStrength:number = 20;
    private frameTime:number = 0;
    private lastLoop:number = new Date().valueOf();
    private thisLoop:number;

    public tick():void
    {
        this.thisLoop = new Date().valueOf();
        var thisFrameTime:number = this.thisLoop - this.lastLoop;
        this.frameTime += (thisFrameTime - this.frameTime) / FPS.filterStrength;
        this.lastLoop = this.thisLoop;
    }

    public toString():string
    {
        return (1000 / this.frameTime).toFixed(0) + ' FPS';
    }
}

export default FPS
