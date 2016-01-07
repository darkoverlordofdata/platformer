////////////////////////////////////////////////////////////////////////////////
// Events
////////////////////////////////////////////////////////////////////////////////
function decodeEvent(e) {
    var key = e.which;
    if (key == 32)
        return 'fire';
    if (key == 37)
        return 'left';
    if (key == 38)
        return 'up';
    if (key == 39)
        return 'right';
    if (key == 40)
        return 'down';
    return null;
}
window.onload = function () {
    var canvas = document.getElementById('screen');
    var c = canvas.getContext('2d');
    c.canvas.width = SCREEN_WIDTH * TILE_SIZE;
    c.canvas.height = SCREEN_HEIGHT * TILE_SIZE;
    c.canvas.style.width = c.canvas.width * WINDOW_SCALE + 'px';
    c.canvas.style.height = c.canvas.height * WINDOW_SCALE + 'px';
    game.setup();
    setInterval(function () {
        game.update();
        game.draw(c);
    }, 1000 / 60);
};
window.onkeydown = function (e) {
    switch (decodeEvent(e)) {
        case 'left':
            game.player.keys.left = true;
            return;
        case 'right':
            game.player.keys.right = true;
            return;
        case 'up':
            game.player.keys.up = true;
            return;
        case 'down':
            game.player.keys.down = true;
            return;
        case 'fire':
            game.player.keys.fire = true;
            return;
    }
};
window.onkeyup = function (e) {
    switch (decodeEvent(e)) {
        case 'left':
            game.player.keys.left = false;
            return;
        case 'right':
            game.player.keys.right = false;
            return;
        case 'up':
            game.player.keys.up = false;
            return;
        case 'down':
            game.player.keys.down = false;
            return;
        case 'fire':
            game.player.keys.fire = false;
            return;
    }
};
//# sourceMappingURL=main.js.map