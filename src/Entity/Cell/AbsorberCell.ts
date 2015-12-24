import settings from "../../Settings";
import Cell from "./Cell";
import Color from "../../Graphics/Color";

class AbsorberCell extends Cell
{
    protected color():Color
    {
        return settings.red;
    }

    public massSign():number
    {
        return -1;
    }
}

export default AbsorberCell
