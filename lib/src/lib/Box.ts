////////////////////////////////////////////////////////////////////////////////
// class Box
////////////////////////////////////////////////////////////////////////////////

class Box {

    x:number;
    y:number;
    width:number;
    height:number;
    type:number;

    constructor(x, y, width, height, type=0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }

    center() {
        return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    }

    overlaps(other) {
        return other.x < this.x + this.width && other.x + other.width > this.x && other.y < this.y + this.height && other.y + other.height > this.y;
    }

    draw(c) {
        var d = 0.5 / TILE_SIZE;
        c.strokeStyle = 'red';
        c.beginPath();
        if (this.type != Type.RampBottomRight) c.lineTo(this.x + d, this.y + d);
        if (this.type != Type.RampBottomLeft) c.lineTo(this.x + this.width + d, this.y + d);
        if (this.type != Type.RampTopLeft) c.lineTo(this.x + this.width + d, this.y + this.height + d);
        if (this.type != Type.RampTopRight) c.lineTo(this.x + d, this.y + this.height + d);
        c.closePath();
        c.stroke();
    }
}
