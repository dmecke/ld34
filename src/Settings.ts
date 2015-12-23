import Color from "./Graphics/Color";

var Settings = {
    white: Color.rgb(255, 255, 255),
    grey: Color.rgb(55, 73, 89),
    blue: Color.rgb(4, 97, 182),
    green: Color.rgb(99, 170, 51),
    red: Color.rgb(207, 39, 39),
    yellow: Color.rgb(234, 197, 27),
    purple: Color.rgb(222, 0, 255),

    CELL_TYPE_PLAYER: 1,
    CELL_TYPE_SIMPLE: 2,
    CELL_TYPE_ABSORB: 3,
    CELL_TYPE_DIRECTION: 4,
    CELL_TYPE_ESCAPER: 5
};

export default Settings;
