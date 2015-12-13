function Sound(src)
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
}

module.exports = Sound;
