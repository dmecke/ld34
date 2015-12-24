import settings from "../../Settings";
import Cell from "./Cell";
import Color from "../../Graphics/Color";

class PlayerCell extends Cell
{
    protected color():Color
    {
        return settings.blue;
    }

    public isForeign():boolean
    {
        return false;
    }
}

export default PlayerCell
