import Game from "./Game";

abstract class GameScreen
{
    public game:Game;
    public isActive:boolean = false;

    constructor(game:Game)
    {
        this.game = game;
    }

    abstract update():void;

    abstract render():void;

    public activate():void
    {
        this.isActive = true;
    }

    public deactivate():void
    {
        this.isActive = false;
    }
}

export default GameScreen;
