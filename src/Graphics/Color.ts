class Color
{
    private red:number;
    private green:number;
    private blue:number;
    private alphaChannel:number;

    constructor(red:number, green:number, blue:number, alpha:number)
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alphaChannel = alpha;
    }

    public static rgb(red:number, green:number, blue:number):Color
    {
        return new Color(red, green, blue, 1);
    }

    public static rgba(red:number, green:number, blue:number, alpha:number):Color
    {
        return new Color(red, green, blue, alpha)
    }

    public static hex(code:string):Color
    {
        var chars = code.split('');
        var red = parseInt(chars[0], 16);
        var green = parseInt(chars[1], 16);
        var blue = parseInt(chars[2], 16);

        return Color.rgb(red, green, blue);
    }

    public alpha(alpha:number):Color
    {
        return Color.rgba(this.red, this.green, this.blue, alpha);
    }

    public toString():string
    {
        return 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + this.alphaChannel + ')';
    }
}

export default Color;
