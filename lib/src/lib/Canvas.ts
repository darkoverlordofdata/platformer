class Canvas {

  context:CanvasRenderingContext2D;
  game:Game;
  now:number = 0;
  last:number = 0;
  delta:number = 0;

  constructor() {
    var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('screen');
    this.context = canvas.getContext('2d');
    canvas.width = SCREEN_WIDTH * TILE_SIZE;
    canvas.height = SCREEN_HEIGHT * TILE_SIZE;
    canvas.style.width = canvas.width * WINDOW_SCALE + 'px';
    canvas.style.height = canvas.height * WINDOW_SCALE + 'px';
    this.game = new Game();
    this.game.initialize();

    window.addEventListener('keydown', this.onkeydown, false);
    window.addEventListener('keyup', this.onkeyup, false);
    this.last = Canvas.timestamp();
    requestAnimationFrame(this.update);
  }

  update = () => {
    this.now = Canvas.timestamp();
    this.delta = this.delta + Math.min(1, (this.now - this.last) / 1000);
    while(this.delta > STEP) {
      this.delta = this.delta - STEP;
      this.game.update();
    }
    this.game.draw(this.context);
    this.last = this.now;
    requestAnimationFrame(this.update);
  };

  onkeydown = (e) => {
    switch (Canvas.decodeEvent(e)) {
      case 'left':  this.game.player.keys.left = true;return;
      case 'right': this.game.player.keys.right = true;return;
      case 'up':    this.game.player.keys.up = true;return;
      case 'down':  this.game.player.keys.down = true;return;
      case 'fire':  this.game.player.keys.fire = true;return;
    }
  };

  onkeyup = (e) => {
    switch (Canvas.decodeEvent(e)) {
      case 'left':  this.game.player.keys.left = false;return;
      case 'right': this.game.player.keys.right = false;return;
      case 'up':    this.game.player.keys.up = false;return;
      case 'down':  this.game.player.keys.down = false;return;
      case 'fire':  this.game.player.keys.fire = false;return;
    }
  };

  static decodeEvent(e) {
    switch (e.which) {
      case 32:return 'fire';
      case 37:return 'left';
      case 38:return 'up';
      case 39:return 'right';
      case 40:return 'down';
    }
    return '';
  }

  static timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

}

new Canvas();
