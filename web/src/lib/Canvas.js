var Canvas = (function () {
    function Canvas() {
        var _this = this;
        this.now = 0;
        this.last = 0;
        this.delta = 0;
        this.update = function () {
            _this.now = Canvas.timestamp();
            _this.delta = _this.delta + Math.min(1, (_this.now - _this.last) / 1000);
            while (_this.delta > STEP) {
                _this.delta = _this.delta - STEP;
                _this.game.update();
            }
            _this.game.draw(_this.context);
            _this.last = _this.now;
            requestAnimationFrame(_this.update);
        };
        this.onkeydown = function (e) {
            switch (Canvas.decodeEvent(e)) {
                case 'left':
                    _this.game.player.keys.left = true;
                    return;
                case 'right':
                    _this.game.player.keys.right = true;
                    return;
                case 'up':
                    _this.game.player.keys.up = true;
                    return;
                case 'down':
                    _this.game.player.keys.down = true;
                    return;
                case 'fire':
                    _this.game.player.keys.fire = true;
                    return;
            }
        };
        this.onkeyup = function (e) {
            switch (Canvas.decodeEvent(e)) {
                case 'left':
                    _this.game.player.keys.left = false;
                    return;
                case 'right':
                    _this.game.player.keys.right = false;
                    return;
                case 'up':
                    _this.game.player.keys.up = false;
                    return;
                case 'down':
                    _this.game.player.keys.down = false;
                    return;
                case 'fire':
                    _this.game.player.keys.fire = false;
                    return;
            }
        };
        var canvas = document.getElementById('screen');
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
    Canvas.decodeEvent = function (e) {
        switch (e.which) {
            case 32: return 'fire';
            case 37: return 'left';
            case 38: return 'up';
            case 39: return 'right';
            case 40: return 'down';
        }
        return '';
    };
    Canvas.timestamp = function () {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    };
    return Canvas;
})();
new Canvas();
//# sourceMappingURL=Canvas.js.map