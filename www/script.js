var drawDebug = false;

////////////////////////////////////////////////////////////////////////////////
// Level data
////////////////////////////////////////////////////////////////////////////////

var tileSize = 16;
var windowScale = 2;
var screenWidth = 16;
var screenHeight = 12;

function calcFrames(originX, originY, width, height, nx, n) {
  var frames = [];
  for (var y = 0, i = 0; i < n; y++) {
    for (var x = 0; x < nx && i < n; x++, i++) {
      frames.push({ x: originX + width * x, y: originY + height * y });
    }
  }
  return frames;
}





////////////////////////////////////////////////////////////////////////////////
// Singleton anim
////////////////////////////////////////////////////////////////////////////////

// Common storage for all animations used in the game
var anims = {
  setup: function() {
    var player = document.getElementById('samus');
    this.player = {
      runL: new Animation(player, 50, 50, calcFrames(150, 450, -50, 50, 4, 10), 3, true),
      runR: new Animation(player, 50, 50, calcFrames(200, 450, 50, 50, 4, 10), 3, true),
      standL: new Animation(player, 50, 50, calcFrames(0, 100, 50, 50, 1, 1), 3, false),
      standR: new Animation(player, 50, 50, calcFrames(350, 100, 50, 50, 1, 1), 3, false),
      jumpL: new Animation(player, 50, 50, calcFrames(550, 50, -50, 50, 4, 4), 3, false),
      jumpR: new Animation(player, 50, 50, calcFrames(600, 50, 50, 50, 4, 4), 3, false),
      landL: new Animation(player, 50, 50, calcFrames(550, 100, -50, 50, 4, 4), 3, false),
      landR: new Animation(player, 50, 50, calcFrames(600, 100, 50, 50, 4, 4), 3, false)
    };
    this.player.landL.next = this.player.standL;
    this.player.landR.next = this.player.standR;

    var missiles = document.getElementById('missiles');
    this.missiles = {
      left: new Animation(missiles, 25, 9, calcFrames(136, 75, 25, 9, 2, 2), 6, true),
      right: new Animation(missiles, 25, 9, calcFrames(136, 84, 25, 9, 2, 2), 6, true),
      puff: new Animation(missiles, 10, 10, calcFrames(122, 140, 10, 10, 9, 9), 3, false),
      boom: new Animation(missiles, 32, 32, calcFrames(75, 168, 32, 32, 5, 5), 3, false)
    };

    var enemies = document.getElementById('enemies');
    this.enemies = {
      hopper: {
        up: new Animation(enemies, 37, 35, calcFrames(234, 855, 37, 35, 3, 3), 6, false),
        down: new Animation(enemies, 37, 35, calcFrames(308, 855, -37, 35, 3, 3), 6, false)
      }
    };
  }
};

// Common storage for all sounds used in the game
var sounds = {
  boom: new Sound('boom.wav', 3),
  pew: new Sound('pew.wav', 3)
};

////////////////////////////////////////////////////////////////////////////////
// Singleton game
////////////////////////////////////////////////////////////////////////////////

// Holds the game itself
var game = {
  setup: function() {
    anims.setup();
    this.world = new World();
    this.player = new Player();
    this.player.box.x = 107.5;
    this.player.box.y = 21;
    this.entities = [this.player];
    this.particles = [];
    this.bg = document.getElementById('bg');

    // Expand screen regions by the screen size
    for (var i = 0; i < screenData.length; i++) {
      var screen = screenData[i];
      screen[0] *= screenWidth;
      screen[1] *= screenHeight;
      screen[2] *= screenWidth;
      screen[3] *= screenHeight;
    }

    // Add a few enemies to start off
    this.entities.push(new Hopper(69, 22));
    this.entities.push(new Hopper(75, 22));
    this.entities.push(new Hopper(81, 22));
  },

  update: function() {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      if (this.particles[i].isDone) this.particles.splice(i--, 1);
    }
  },

  draw: function(c) {
    var w = c.canvas.width / 2 / tileSize;
    var h = c.canvas.height / 2 / tileSize;
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
        var screen = screens[i];
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
    c.lineWidth = 1 / tileSize;
    c.scale(tileSize, tileSize);
    c.translate(-Math.round(center.x * tileSize) / tileSize, -Math.round(center.y * tileSize) / tileSize);

    // Draw a tiled background
    var bgW = this.bg.width / tileSize, bgH = this.bg.height / tileSize;
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
    if (drawDebug) {
      for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].box.draw(c);
      }
      for (var i = 0; i < this.world.boxes.length; i++) {
        this.world.boxes[i].draw(c);
      }
    }
    c.restore();
  }
};

////////////////////////////////////////////////////////////////////////////////
// Event loop
////////////////////////////////////////////////////////////////////////////////

window.onload = function() {
  var c = document.getElementById('screen').getContext('2d');
  c.canvas.width = screenWidth * tileSize;
  c.canvas.height = screenHeight * tileSize;
  c.canvas.style.width = c.canvas.width * windowScale + 'px';
  c.canvas.style.height = c.canvas.height * windowScale + 'px';
  game.setup();
  setInterval(function() {
    game.update();
    game.draw(c);
  }, 1000 / 60);
};

function actionForEvent(e) {
  var key = e.which;
  if (key == 32) return 'fire';
  if (key == 37) return 'left';
  if (key == 38) return 'up';
  if (key == 39) return 'right';
  if (key == 40) return 'down';
  return null;
}

window.onkeydown = function(e) {
  var action = actionForEvent(e);
  if (action == 'left') game.player.keys.left = true;
  if (action == 'right') game.player.keys.right = true;
  if (action == 'up') game.player.keys.up = true;
  if (action == 'down') game.player.keys.down = true;
  if (action == 'fire') game.player.keys.fire = true;
};

window.onkeyup = function(e) {
  var action = actionForEvent(e);
  if (action == 'left') game.player.keys.left = false;
  if (action == 'right') game.player.keys.right = false;
  if (action == 'up') game.player.keys.up = false;
  if (action == 'down') game.player.keys.down = false;
  if (action == 'fire') game.player.keys.fire = false;
};
