function Container(src)
{
    this.audio = [
        new Audio(src),
        new Audio(src),
        new Audio(src),
        new Audio(src),
        new Audio(src)
    ];

    this.play = function()
    {
        for (var i = 0; i < this.audio.length; i++) {
            if (this.audio[i].paused) {
                this.audio[i].play();
                return;
            }
        }
    };

    this.pause = function()
    {
        for (var i = 0; i < this.audio.length; i++) {
            this.audio[i].pause();
        }
    };
}

module.exports = Container;
