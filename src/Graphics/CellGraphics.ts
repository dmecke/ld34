import settings from "../Settings";
import Vector from "../Math/Vector";
import Circle from "./Circle";
import PositionCheck from "../Util/PositionCheck";
import Color from "./Color";

class CellGraphics
{
    private transparency:number = 0.5;
    private transparencyFlag:boolean = true;

    public draw(position:Vector, radius:number, color:Color, dimensions:Vector):void
    {
        this.updateTransparency();

        var check = new PositionCheck(position, radius, dimensions);

        this.drawElement(position, radius, color);
        if (check.isOutOfLeftBorder()) {
            this.drawElement(new Vector(dimensions.x() + position.x(), position.y()), radius, color);
        }
        if (check.isOutOfTopBorder()) {
            this.drawElement(new Vector(position.x(), dimensions.y() + position.y()), radius, color);
        }
        if (check.isOutOfRightBorder()) {
            this.drawElement(new Vector(position.x() - dimensions.x(), position.y()), radius, color);
        }
        if (check.isOutOfBottomBorder()) {
            this.drawElement(new Vector(position.x(), position.y() - dimensions.y()), radius, color);
        }

        if (check.isOutOfTopLeftCorner()) {
            this.drawElement(new Vector(dimensions.x() + position.x(), dimensions.y() + position.y()), radius, color);
        }
        if (check.isOutOfBottomLeftCorner()) {
            this.drawElement(new Vector(dimensions.x() + position.x(), position.y() - dimensions.y()), radius, color);
        }
        if (check.isOutOfTopRightCorner()) {
            this.drawElement(new Vector(position.x() - dimensions.x(), dimensions.y() + position.y()), radius, color);
        }
        if (check.isOutOfBottomRightCorner()) {
            this.drawElement(new Vector(position.x() - dimensions.x(), position.y() - dimensions.y()), radius, color);
        }
    }

    private drawElement(position:Vector, radius:number, color:Color):void
    {
        new Circle()
            .at(position)
            .withRadius(radius)
            .withStrokeStyle(color)
            .withFillStyle(color.alpha(0.3))
            .withLineWidth(3)
            .draw();
        new Circle()
            .at(position)
            .withRadius(radius + 1)
            .withStrokeStyle(settings.white.alpha(this.transparency))
            .draw();
    }

    private updateTransparency():void
    {
        if (this.transparencyFlag) {
            this.transparency += 0.005;
        } else {
            this.transparency -= 0.005;
        }

        if (this.transparency >= 0.8 || this.transparency <= 0.2) {
            this.transparencyFlag = !this.transparencyFlag;
        }
    }
}

export default CellGraphics
