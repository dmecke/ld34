import settings from "../../Settings";
import Level from "../../Level";
import Vector from "../../Math/Vector";
import Cell from "./Cell";
import PlayerCell from "./PlayerCell";
import SimpleCell from "./SimpleCell";
import AbsorberCell from "./AbsorberCell";
import DirectionCell from "./DirectionCell";
import EscaperCell from "./EscaperCell";

class Factory
{
    public static create(type:number, level:Level, position:Vector, velocity:Vector, mass:number):Cell
    {
        switch (type) {
            case settings.CELL_TYPE_PLAYER:
                return new PlayerCell(level, position, velocity, mass);

            case settings.CELL_TYPE_SIMPLE:
                return new SimpleCell(level, position, velocity, mass);

            case settings.CELL_TYPE_ABSORB:
                return new AbsorberCell(level, position, velocity, mass);

            case settings.CELL_TYPE_DIRECTION:
                return new DirectionCell(level, position, velocity, mass);

            case settings.CELL_TYPE_ESCAPER:
                return new EscaperCell(level, position, velocity, mass);
        }
    }
}

export default Factory
