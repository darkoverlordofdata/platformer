////////////////////////////////////////////////////////////////////////////////
// class Animation
////////////////////////////////////////////////////////////////////////////////
var Animation = (function () {
    function Animation(image, width, height, frames, speed, loop) {
        this.image = image;
        this.width = width / TILE_SIZE;
        this.height = height / TILE_SIZE;
        this.frames = frames;
        this.speed = speed;
        this.loop = loop;
        this.next = null;
    }
    Animation.prototype.draw = function (c, x, y, frame) {
        var offset = this.frames[frame % this.frames.length];
        c.drawImage(this.image, offset.x, offset.y, this.width * TILE_SIZE, this.height * TILE_SIZE, Math.round(x * TILE_SIZE) / TILE_SIZE, Math.round(y * TILE_SIZE) / TILE_SIZE, this.width, this.height);
    };
    return Animation;
})();
//# sourceMappingURL=Animation.js.map