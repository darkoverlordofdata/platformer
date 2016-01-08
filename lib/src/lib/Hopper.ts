////////////////////////////////////////////////////////////////////////////////
// class Hopper
////////////////////////////////////////////////////////////////////////////////

class Hopper extends Entity {

    sprite:Sprite;
    box:Box;
    v:any;
    waitOnFloor:number;
    onFloor:boolean;
    game:Game;
    anims:Animations;

    constructor(game, x, y) {
        super();
        this.game = game;
        this.anims = game.anims;
        this.sprite = new Sprite(this.anims.enemies.hopper.down);
        this.box = new Box(x - 1, y - 0.75, 2, 1.5);
        this.v = { x: 0, y: 0 };
        this.waitOnFloor = 0;
        this.onFloor = false;
    }

    update() {

        var sprite = this.sprite;
        var box = this.box;
        var v = this.v;

        // Hop around randomly
        v.y += GRAVITY;
        var expectedY = box.y + v.y;
        this.game.world.moveBox(box, v.x, v.y, true);
        this.onFloor = (box.y < expectedY);
        if (this.onFloor) {
            v.y = Math.min(v.y, 0);
            if (v.y == 0) {
                sprite.setAnim(this.anims.enemies.hopper.down);
                v.x = 0;
            }
            if (this.waitOnFloor == 0) {
                this.waitOnFloor = 50 + Math.floor(50 * Math.random());
            } else if (--this.waitOnFloor == 0) {
                v.x = Math.random() < 0.5 ? -0.1 : 0.1;
                v.y = -0.25;
                sprite.setAnim(this.anims.enemies.hopper.up);
            }
        } else {
            if (box.y > expectedY) v.y = 0;
            this.waitOnFloor = 0;
        }

        // Update the sprite
        sprite.x = box.x + (box.width - sprite.anim.width) / 2;
        sprite.y = box.y + box.height - sprite.anim.height;
        sprite.update();
    }

    draw(g) {
        this.sprite.draw(g);
    }
}
