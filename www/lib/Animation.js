////////////////////////////////////////////////////////////////////////////////
// class Animation
////////////////////////////////////////////////////////////////////////////////

function Animation(image, width, height, frames, speed, loop) {
    this.image = image;
    this.width = width / tileSize;
    this.height = height / tileSize;
    this.frames = frames;
    this.speed = speed;
    this.loop = loop;
    this.next = null;
}

Animation.prototype.draw = function(c, x, y, frame) {
    var offset = this.frames[frame % this.frames.length];
    c.drawImage(this.image, offset.x, offset.y, this.width * tileSize, this.height * tileSize, Math.round(x * tileSize) / tileSize, Math.round(y * tileSize) / tileSize, this.width, this.height);
};
