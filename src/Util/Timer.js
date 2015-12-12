function Timer(maximum)
{
    this.maximum = maximum;
    this.current = maximum;

    this.reset = function()
    {
        this.current = this.maximum;
    };

    this.isReady = function()
    {
        return this.current == 0;
    };

    this.update = function()
    {
        this.current = Math.max(0, this.current - 1);
    };
}

module.exports = Timer;
