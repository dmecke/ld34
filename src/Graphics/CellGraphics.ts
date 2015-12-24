import settings from "../Settings";
import Vector from "../Math/Vector";
import Circle from "./Circle";
import Color from "./Color";
import PulsatingCircle from "./PulsatingCircle";

class CellGraphics
{
    private border:PulsatingCircle = new PulsatingCircle();

    public draw(position:Vector, radius:number, color:Color):void
    {
        new Circle()
            .at(position)
            .withRadius(radius)
            .withStrokeStyle(color)
            .withFillStyle(color.alpha(0.3))
            .withLineWidth(3)
            .draw();
        this.border
            .at(position)
            .withRadius(radius + 1)
            .withStrokeStyle(settings.white)
            .draw();
    }
}

export default CellGraphics
