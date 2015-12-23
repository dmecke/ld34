import Circle from "./Circle";
import Vector from "../Math/Vector";
import settings from "./../Settings";
import PositionCheck from "../Util/PositionCheck";

class PlayerGraphic
{
    private alpha:number = 0.5;
    private alphaFlag:boolean = true;

    public draw(position:Vector, innerRadius:number, outerRadius:number, dimensions:Vector):void
    {
        this.updateTransparency();

        this.drawPlayer(position, innerRadius, dimensions);
        this.drawPlayer(position, outerRadius, dimensions);

        new Circle()
            .at(position)
            .withRadius(outerRadius + 1)
            .withStrokeStyle(settings.white.alpha(this.alpha))
            .draw();
    }

    private updateTransparency():void
    {
        if (this.alphaFlag) {
            this.alpha += 0.005;
        } else {
            this.alpha -= 0.005;
        }

        if (this.alpha >= 0.8 || this.alpha <= 0.2) {
            this.alphaFlag = !this.alphaFlag;
        }
    }

    private drawPlayer(position:Vector, radius:number, dimensions:Vector):void
    {
        var check = new PositionCheck(position, radius, dimensions);

        this.drawElement(position, radius);
        if (check.isOutOfLeftBorder()) {
            this.drawElement(new Vector(dimensions.x() + position.x(), position.y()), radius);
        }
        if (check.isOutOfTopBorder()) {
            this.drawElement(new Vector(position.x(), dimensions.y() + position.y()), radius);
        }
        if (check.isOutOfRightBorder()) {
            this.drawElement(new Vector(position.x() - dimensions.x(), position.y()), radius);
        }
        if (check.isOutOfBottomBorder()) {
            this.drawElement(new Vector(position.x(), position.y() - dimensions.y()), radius);
        }

        if (check.isOutOfTopLeftCorner()) {
            this.drawElement(new Vector(dimensions.x() + position.x(), dimensions.y() + position.y()), radius);
        }
        if (check.isOutOfBottomLeftCorner()) {
            this.drawElement(new Vector(dimensions.x() + position.x(), position.y() - dimensions.y()), radius);
        }
        if (check.isOutOfTopRightCorner()) {
            this.drawElement(new Vector(position.x() - dimensions.x(), dimensions.y() + position.y()), radius);
        }
        if (check.isOutOfBottomRightCorner()) {
            this.drawElement(new Vector(position.x() - dimensions.x(), position.y() - dimensions.y()), radius);
        }
    }

    private drawElement(position:Vector, radius:number):void
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
