////////////////////////////////////////////////////////////////////////////////
// class Player
////////////////////////////////////////////////////////////////////////////////


class Player extends Entity {

    static SPEED = 0.35 / 2;
    static JUMP_SPEED = Player.SPEED * 2;

    sprite:Sprite;
    box:Box;
    keys:any;
    v:any;
    facingLeft:boolean;
    onFloor:boolean;
    jumped:boolean;
    fireDelay:number;
    fired:boolean;
    game:Game;
    anims:Animations;
    sounds:Sounds;

    constructor(game:Game) {
        super();
        this.game = game;
        this.anims = game.anims;
        this.sounds = game.sounds;
        this.sprite = new Sprite(this.anims.player.standL);
        this.box = new Box(0, 0, 1, 2);
        this.keys = { left: false, right: false, up: false, down: false, fire: false };
        this.v = { x: 0, y: 0 };
        this.facingLeft = false;
        this.onFloor = false;
        this.jumped = false;
        this.fireDelay = 0;
        this.fired = false;
    }
    
    update() {

        var v = this.v;
        var keys = this.keys;
        var box = this.box;
        var sprite = this.sprite;

        // Update the velocity and position
        var oldOnFloor = this.onFloor, oldVX = v.x;
        v.x = Player.SPEED * (keys.right - keys.left);
        if (this.onFloor && keys.up && !this.jumped) {
            v.y = -Player.JUMP_SPEED;
            this.jumped = true;
        }
        else if (!keys.up) this.jumped = false;
        v.y += GRAVITY;
        var expectedY = box.y + v.y;
        this.game.world.moveBox(box, v.x, v.y, true);
        this.onFloor = (box.y < expectedY);
        if (this.onFloor) v.y = Math.min(v.y, Player.SPEED / 2);
        else if (box.y > expectedY) v.y = Math.max(v.y, 0);
    
        // Update the sprite
        this.facingLeft = v.x ? v.x < 0 : this.facingLeft;
        var suffix = this.facingLeft  ? 'L' : 'R';

        if (!this.onFloor) {
            sprite.setAnim(this.anims.player['jump' + suffix]);
        } else if (v.x) {
            sprite.setAnim(this.anims.player['run' + suffix]);
        } else if (!oldOnFloor) {
            sprite.setAnim(this.anims.player['land' + suffix]);
        } else if (this.onFloor && oldVX && !v.x) {
            sprite.setAnim(this.anims.player['stand' + suffix]);
        }
        sprite.x = box.x - 1;
        sprite.y = box.y + box.height - sprite.anim.height;
        sprite.update();
    
        // Fire shots
        this.fireDelay -= 1;
        if (keys.fire) {
            if (!this.fired && this.fireDelay < 0) {
                this.sounds.pew.play();
                this.game.entities.push(new Missile(this.game, box.x + box.width / 2, box.y + 0.65, Missile.SPEED * (1 - 2 * Number(this.facingLeft)), 0));
                this.fireDelay = 20;
                this.fired = true;
            }
        } else {
            this.fired = false;
        }
    }
    
    draw(g) {
        this.sprite.draw(g);
    }

}
