////////////////////////////////////////////////////////////////////////////////
// class Box
////////////////////////////////////////////////////////////////////////////////
var Box = (function () {
    function Box(x, y, width, height, type) {
        if (type === void 0) { type = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
    }
    Box.prototype.center = function () {
        return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    };
    Box.prototype.overlaps = function (other) {
        return other.x < this.x + this.width && other.x + other.width > this.x && other.y < this.y + this.height && other.y + other.height > this.y;
    };
    Box.prototype.draw = function (c) {
        var d = 0.5 / TILE_SIZE;
        c.strokeStyle = 'red';
        c.beginPath();
        if (this.type != Type.RampBottomRight)
            c.lineTo(this.x + d, this.y + d);
        if (this.type != Type.RampBottomLeft)
            c.lineTo(this.x + this.width + d, this.y + d);
        if (this.type != Type.RampTopLeft)
            c.lineTo(this.x + this.width + d, this.y + this.height + d);
        if (this.type != Type.RampTopRight)
            c.lineTo(this.x + d, this.y + this.height + d);
        c.closePath();
        c.stroke();
    };
    return Box;
})();
//# sourceMappingURL=Box.js.map