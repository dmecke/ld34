import settings from "../../Settings";
import Cell from "./Cell";
import Color from "../../Graphics/Color";

class EscaperCell extends Cell
{
    protected color():Color
    {
        return settings.purple;
    }

    public update():void
    {
        var toPlayer = this.position.subtract(this.level.player.position);
        if (toPlayer.length() < 100) {
            this.velocity = toPlayer.normalize().multiply(this.velocity.length());
        }

        super.update();
    }
}

export default EscaperCell
