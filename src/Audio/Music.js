function Music()
{
    this.musicMenu = new Audio('music/menu.mp3');
    this.musicLevels = [
        new Audio('music/0.mp3'),
        new Audio('music/1.mp3'),
        new Audio('music/2.mp3'),
        new Audio('music/3.mp3'),
        new Audio('music/4.mp3'),
        new Audio('music/5.mp3')
    ];
    this.enabled = true;

    this.toggle = function()
    {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.pauseMenu();
        }
        if (this.enabled) {
            this.playMenu();
        }
    };

    this.playMenu = function()
    {
        if (!this.enabled) {
            return;
        }

        this.musicMenu.loop = true;
        this.musicMenu.play();
    };

    this.playLevel = function(level)
    {
        if (!this.enabled) {
            return;
        }

        var index = level % 6;

        this.musicLevels[index].loop = true;
        this.musicLevels[index].play();
    };

    this.pauseMenu = function()
    {
        this.musicMenu.pause();
    };

    this.pauseLevel = function(level)
    {
        var index = level % 6;

        this.musicLevels[index].pause();
    };
}

module.exports = Music;
