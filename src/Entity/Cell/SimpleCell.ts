import settings from "./../../Settings";
import Cell from "./Cell";
import Color from "../../Graphics/Color";

class SimpleCell extends Cell
{
    protected color():Color
    {
        return settings.green;
    }
}

export default SimpleCell
