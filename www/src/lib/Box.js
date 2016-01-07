////////////////////////////////////////////////////////////////////////////////
// class Box
////////////////////////////////////////////////////////////////////////////////

var TYPE_SOLID = 0;
var TYPE_RAMP_TOP_LEFT = 1;
var TYPE_RAMP_TOP_RIGHT = 2;
var TYPE_RAMP_BOTTOM_LEFT = 3;
var TYPE_RAMP_BOTTOM_RIGHT = 4;

function Box(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
}

Box.prototype.center = function() {
    return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
};

Box.prototype.overlaps = function(other) {
    return other.x < this.x + this.width && other.x + other.width > this.x && other.y < this.y + this.height && other.y + other.height > this.y;
};

Box.prototype.draw = function(c) {
    var d = 0.5 / tileSize;
    c.strokeStyle = 'red';
    c.beginPath();
    if (this.type != TYPE_RAMP_BOTTOM_RIGHT) c.lineTo(this.x + d, this.y + d);
    if (this.type != TYPE_RAMP_BOTTOM_LEFT) c.lineTo(this.x + this.width + d, this.y + d);
    if (this.type != TYPE_RAMP_TOP_LEFT) c.lineTo(this.x + this.width + d, this.y + this.height + d);
    if (this.type != TYPE_RAMP_TOP_RIGHT) c.lineTo(this.x + d, this.y + this.height + d);
    c.closePath();
    c.stroke();
};
