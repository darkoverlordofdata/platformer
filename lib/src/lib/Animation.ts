////////////////////////////////////////////////////////////////////////////////
// class Animation
////////////////////////////////////////////////////////////////////////////////


class Animation {

  image:Object;
  width:number;
  height:number;
  frames:Array<any>;
  speed:number;
  loop:number;
  next:boolean;

  constructor(image, width, height, frames, speed, loop) {
    this.image = image;
    this.width = width / TILE_SIZE;
    this.height = height / TILE_SIZE;
    this.frames = frames;
    this.speed = speed;
    this.loop = loop;
    this.next = null;
  }
  draw(c, x, y, frame) {
    var offset = this.frames[frame % this.frames.length];
    c.drawImage(this.image, offset.x, offset.y, this.width * TILE_SIZE, this.height * TILE_SIZE, Math.round(x * TILE_SIZE) / TILE_SIZE, Math.round(y * TILE_SIZE) / TILE_SIZE, this.width, this.height);
  }

}

