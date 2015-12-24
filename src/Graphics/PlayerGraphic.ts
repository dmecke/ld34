import Circle from "./Circle";
import Vector from "../Math/Vector";
import settings from "./../Settings";
import PulsatingCircle from "./PulsatingCircle";

class PlayerGraphic
{
    private border:PulsatingCircle = new PulsatingCircle();

    public draw(position:Vector, innerRadius:number, outerRadius:number):void
    {
        this.drawPlayer(position, innerRadius);
        this.drawPlayer(position, outerRadius);

        this.border
            .at(position)
            .withRadius(outerRadius + 1)
            .withStrokeStyle(settings.white)
            .draw();
    }

    private drawPlayer(position:Vector, radius:number):void
    {
        new Circle()
            .at(position)
            .withRadius(radius)
            .withStrokeStyle(settings.blue)
            .withFillStyle(settings.blue.alpha(0.2))
            .withLineWidth(2)
            .draw();
    }
}

export default PlayerGraphic;
