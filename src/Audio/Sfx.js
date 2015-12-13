Container = require('./Container.js');

function Sfx()
{
    this.audioAccelerate = new Container('sfx/accelerate.m4a');
    this.audioAbsorb = new Container('sfx/absorb.m4a');
    this.enabled = true;

    this.toggle = function()
    {
        this.enabled = !this.enabled;
        window.localStorage.setItem('disable_sfx', !this.enabled);
    };

    this.absorb = function()
    {
        if (!this.enabled) {
            return;
        }

        this.audioAbsorb.play();
    };

    this.accelerate = function()
    {
        if (!this.enabled) {
            return;
        }

        this.audioAccelerate.play();
    };
}

module.exports = Sfx;
