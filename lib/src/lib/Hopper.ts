////////////////////////////////////////////////////////////////////////////////
// class Hopper
////////////////////////////////////////////////////////////////////////////////

class Hopper {

    sprite:Sprite;
    box:Box;
    v:any;
    waitOnFloor:number;
    onFloor:boolean;

    constructor(x, y) {
        this.sprite = new Sprite(anims.enemies.hopper.down);
        this.box = new Box(x - 1, y - 0.75, 2, 1.5);
        this.v = { x: 0, y: 0 };
        this.waitOnFloor = 0;
        this.onFloor = false;
    }

    update() {
        // Hop around randomly
        this.v.y += GRAVITY;
        var expectedY = this.box.y + this.v.y;
        game.world.moveBox(this.box, this.v.x, this.v.y, true);
        this.onFloor = (this.box.y < expectedY);
        if (this.onFloor) {
            this.v.y = Math.min(this.v.y, 0);
            if (this.v.y == 0) {
                this.sprite.setAnim(anims.enemies.hopper.down);
                this.v.x = 0;
            }
            if (this.waitOnFloor == 0) {
                this.waitOnFloor = 50 + Math.floor(50 * Math.random());
            } else if (--this.waitOnFloor == 0) {
                this.v.x = Math.random() < 0.5 ? -0.1 : 0.1;
                this.v.y = -0.25;
                this.sprite.setAnim(anims.enemies.hopper.up);
            }
        } else {
            if (this.box.y > expectedY) this.v.y = 0;
            this.waitOnFloor = 0;
        }

        // Update the sprite
        this.sprite.x = this.box.x + (this.box.width - this.sprite.anim.width) / 2;
        this.sprite.y = this.box.y + this.box.height - this.sprite.anim.height;
        this.sprite.update();
    }

    draw(c) {
        this.sprite.draw(c);
    }
}
