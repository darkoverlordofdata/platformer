////////////////////////////////////////////////////////////////////////////////
// class Missile
////////////////////////////////////////////////////////////////////////////////

class Missile {
    
    static SPEED = 0.4;

    v:any;
    box:Box;
    sprite:Sprite;
    puffDelay:number;

    constructor(x, y, vx, vy) {
        x += vx < 0 ? -0.3 : 0.3;
        this.v = { x: vx, y: vy };
        this.box = new Box(x - 0.2, y - 0.2, 0.4, 0.4);
        this.sprite = new Sprite(vx < 0 ? anims.missiles.left : anims.missiles.right);
        this.puffDelay = 2 + Math.floor(Math.random() * 6);
    }
    
    update() {
        // Update the position
        var expectedX = this.box.x + this.v.x;
        game.world.moveBox(this.box, this.v.x, this.v.y, false);
        this.sprite.centerOn(this.box);
        this.sprite.update();
    
        // Expode if we hit a wall
        if (this.box.x != expectedX) {
            var i = game.entities.indexOf(this);
            if (i != -1) game.entities.splice(i, 1);
            game.particles.push(new Sprite(anims.missiles.boom).centerOn(this.box));
            sounds.boom.play();
        }
    
        // Add puff particles behind the missile
        if (--this.puffDelay < 0) {
            this.puffDelay = 2 + Math.floor(Math.random() * 6);
            game.particles.push(new Sprite(anims.missiles.puff).centerOn(this.box));
        }
    
        // Explode and remove entities when we intersect them
        for (var i = 0; i < game.entities.length; i++) {
            var entity = game.entities[i];
            if (entity instanceof Hopper && this.box.overlaps(entity.box)) {
                game.particles.push(new Sprite(anims.missiles.boom).centerOn(this.box));
                game.entities.splice(game.entities.indexOf(this), 1);
                game.entities.splice(i, 1);
                sounds.boom.play();
                break;
            }
        }
    }
    
    draw(c) {
        this.sprite.draw(c);
    }
}
