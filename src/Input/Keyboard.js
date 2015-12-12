function Keyboard()
{
    this.keys = [];

    this.KEY_ENTER = 13;
    this.KEY_SPACE = 32;
    this.KEY_LEFT = 37;
    this.KEY_UP = 38;
    this.KEY_RIGHT = 39;
    this.KEY_DOWN = 40;
    this.KEY_A = 65;
    this.KEY_D = 68;
    this.KEY_S = 83;
    this.KEY_W = 87;

    this.addKey = function(keyCode)
    {
        if (-1 == this.keys.indexOf(keyCode)) {
            this.keys.push(keyCode);
        }
    };

    this.removeKey = function(keyCode)
    {
        var index = this.keys.indexOf(keyCode);
        if (index != -1) {
            this.keys.splice(index, 1);
        }
    };

    this.isUp = function()
    {
        if (-1 != this.keys.indexOf(this.KEY_UP)) {
            return true;
        }

        return -1 != this.keys.indexOf(this.KEY_W);
    };

    this.isDown = function()
    {
        if (-1 != this.keys.indexOf(this.KEY_DOWN)) {
            return true;
        }

        return -1 != this.keys.indexOf(this.KEY_S);
    };

    this.isLeft = function()
    {
        if (-1 != this.keys.indexOf(this.KEY_LEFT)) {
            return true;
        }

        return -1 != this.keys.indexOf(this.KEY_A);
    };

    this.isRight = function()
    {
        if (-1 != this.keys.indexOf(this.KEY_RIGHT)) {
            return true;
        }

        return -1 != this.keys.indexOf(this.KEY_D);
    };
}

module.exports = new Keyboard();
