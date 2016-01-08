
////////////////////////////////////////////////////////////////////////////////
// Singleton game
////////////////////////////////////////////////////////////////////////////////

// Holds the game itself
class Game {

  world:World;
  anims:Animations;
  sounds:Sounds;
  player:Player;
  entities:Array<Entity>;
  particles:Array<Sprite>;
  bg:HTMLImageElement;

  initialize() {
    this.anims = new Animations();
    this.sounds = new Sounds();
    this.anims.initialize();
    this.world = new World();
    this.player = new Player(this);
    this.player.box.x = 107.5;
    this.player.box.y = 21;
    this.entities = [this.player];
    this.particles = [];
    this.bg = <HTMLImageElement>document.getElementById('bg');

    // Expand screen regions by the screen size
    for (var i = 0; i < screenData.length; i++) {
      var screen = screenData[i];
      screen[0] *= SCREEN_WIDTH;
      screen[1] *= SCREEN_HEIGHT;
      screen[2] *= SCREEN_WIDTH;
      screen[3] *= SCREEN_HEIGHT;
    }

    // Add a few enemies to start off
    this.entities.push(new Hopper(this, 69, 22));
    this.entities.push(new Hopper(this, 75, 22));
    this.entities.push(new Hopper(this, 81, 22));
  }

  update() {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].isDone) this.particles.splice(i--, 1);
    }
  }

  draw(c) {
    var w = c.canvas.width / 2 / TILE_SIZE;
    var h = c.canvas.height / 2 / TILE_SIZE;
    var center = this.player.box.center();

    // Find all screens overlapping with the player
    var screens = [], box = this.player.box;
    box = new Box(box.x - 1, box.y, box.width + 2, box.height);
    for (var i = 0; i < screenData.length; i++) {
      var screen = screenData[i];
      if (screen[0] + screen[2] > box.x && screen[0] < box.x + box.width && screen[1] + screen[3] > box.y && screen[1] < box.y + box.height) {
        screens.push(screen);
      }
    }

    // Constrain the camera center to a weighted average of the center constrained in each screen
    if (screens.length) {
      var cx = 0, cy = 0;
      for (var i = 0; i < screens.length; i++) {
        var screen:Array<number> = screens[i];
        var percent = (Math.min(screen[0] + screen[2], box.x + box.width) - Math.max(screen[0], box.x)) * (
          Math.min(screen[1] + screen[3], box.y + box.height) - Math.max(screen[1], box.y)) / (box.width * box.height);
        cx += Math.max(screen[0] + w, Math.min(center.x, screen[0] + screen[2] - w)) * percent;
        cy += Math.max(screen[1] + h, Math.min(center.y, screen[1] + screen[3] - h)) * percent;
      }
      center.x = cx;
      center.y = cy;
    }

    // Clear the screen and set up the camera
    c.save();
    c.translate(c.canvas.width / 2, c.canvas.height / 2);
    c.lineWidth = 1 / TILE_SIZE;
    c.scale(TILE_SIZE, TILE_SIZE);
    c.translate(-Math.round(center.x * TILE_SIZE) / TILE_SIZE, -Math.round(center.y * TILE_SIZE) / TILE_SIZE);

    // Draw a tiled background
    var bgW = this.bg.width / TILE_SIZE, bgH = this.bg.height / TILE_SIZE;
    var parallaxX = center.x / 2, parallaxY = center.y / 2;
    var xmin = parallaxX + Math.floor((center.x - parallaxX - w) / bgW) * bgW;
    var ymin = parallaxY + Math.floor((center.y - parallaxY - h) / bgH) * bgH;
    var xmax = parallaxX + Math.floor((center.x - parallaxX + w) / bgW) * bgW;
    var ymax = parallaxY + Math.floor((center.y - parallaxY + h) / bgH) * bgH;
    for (var x = xmin; x < xmax + 0.001; x += bgW) {
      for (var y = ymin; y < ymax + 0.001; y += bgH) {
        c.drawImage(this.bg, x, y, bgW, bgH);
      }
    }

    // Draw sprites
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].draw(c);
    }
    this.world.draw(c);
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(c);
    }

    // Debug drawing
    if (DRAW_DEBUG) {
      for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].box.draw(c);
      }
      for (var i = 0; i < this.world.boxes.length; i++) {
        this.world.boxes[i].draw(c);
      }
    }
    c.restore();
  }
}

