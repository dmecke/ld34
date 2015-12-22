class Timer
{
    private maximum:number;
    private current:number;

    constructor(maximum:number)
    {
        this.maximum = maximum;
        this.current = maximum;
    }

    public reset():void
    {
        this.current = this.maximum;
    }

    public isReady():boolean
    {
        return this.current == 0;
    }

    public update():void
    {
        this.current = Math.max(0, this.current - 1);
    }
}

export default Timer;
