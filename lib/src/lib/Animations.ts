////////////////////////////////////////////////////////////////////////////////
// Singleton anim
////////////////////////////////////////////////////////////////////////////////

// Common storage for all animations used in the game
class Animations {
    
    player:any;
    missiles:any;
    enemies:any;
    
    initialize() {
        var player = document.getElementById('samus');
        this.player = {
            runL: new Animation(player, 50, 50, this.calcFrames(150, 450, -50, 50, 4, 10), 3, true),
            runR: new Animation(player, 50, 50, this.calcFrames(200, 450, 50, 50, 4, 10), 3, true),
            standL: new Animation(player, 50, 50, this.calcFrames(0, 100, 50, 50, 1, 1), 3, false),
            standR: new Animation(player, 50, 50, this.calcFrames(350, 100, 50, 50, 1, 1), 3, false),
            jumpL: new Animation(player, 50, 50, this.calcFrames(550, 50, -50, 50, 4, 4), 3, false),
            jumpR: new Animation(player, 50, 50, this.calcFrames(600, 50, 50, 50, 4, 4), 3, false),
            landL: new Animation(player, 50, 50, this.calcFrames(550, 100, -50, 50, 4, 4), 3, false),
            landR: new Animation(player, 50, 50, this.calcFrames(600, 100, 50, 50, 4, 4), 3, false)
        };
        this.player.landL.next = this.player.standL;
        this.player.landR.next = this.player.standR;

        var missiles = document.getElementById('missiles');
        this.missiles = {
            left: new Animation(missiles, 25, 9, this.calcFrames(136, 75, 25, 9, 2, 2), 6, true),
            right: new Animation(missiles, 25, 9, this.calcFrames(136, 84, 25, 9, 2, 2), 6, true),
            puff: new Animation(missiles, 10, 10, this.calcFrames(122, 140, 10, 10, 9, 9), 3, false),
            boom: new Animation(missiles, 32, 32, this.calcFrames(75, 168, 32, 32, 5, 5), 3, false)
        };

        var enemies = document.getElementById('enemies');
        this.enemies = {
            hopper: {
                up: new Animation(enemies, 37, 35, this.calcFrames(234, 855, 37, 35, 3, 3), 6, false),
                down: new Animation(enemies, 37, 35, this.calcFrames(308, 855, -37, 35, 3, 3), 6, false)
            }
        };
    }
    
    private calcFrames(originX, originY, width, height, nx, n) {
    var frames = [];
    for (var y = 0, i = 0; i < n; y++) {
        for (var x = 0; x < nx && i < n; x++, i++) {
            frames.push({ x: originX + width * x, y: originY + height * y });
        }
    }
    return frames;
}


}

