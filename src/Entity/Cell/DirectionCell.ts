import settings from "../../Settings";
import Cell from "./Cell";
import Color from "../../Graphics/Color";
import Vector from "../../Math/Vector";

class DirectionCell extends Cell
{
    protected color():Color
    {
        return settings.yellow;
    }

    public update():void
    {
        if (Math.random() < 0.005) {
            this.velocity = new Vector(Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3);
        }

        super.update();
    }
}

export default DirectionCell
