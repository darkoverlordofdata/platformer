////////////////////////////////////////////////////////////////////////////////
// class Player
////////////////////////////////////////////////////////////////////////////////
var Player = (function () {
    function Player() {
        this.sprite = new Sprite(anims.player.standL);
        this.box = new Box(0, 0, 1, 2);
        this.keys = { left: false, right: false, up: false, down: false, fire: false };
        this.v = { x: 0, y: 0 };
        this.facingLeft = false;
        this.onFloor = false;
        this.jumped = false;
        this.fireDelay = 0;
        this.fired = false;
    }
    Player.prototype.update = function () {
        // Update the velocity and position
        var oldOnFloor = this.onFloor, oldVX = this.v.x;
        this.v.x = Player.SPEED * (this.keys.right - this.keys.left);
        if (this.onFloor && this.keys.up && !this.jumped) {
            this.v.y = -Player.JUMP_SPEED;
            this.jumped = true;
        }
        else if (!this.keys.up)
            this.jumped = false;
        this.v.y += GRAVITY;
        var expectedY = this.box.y + this.v.y;
        game.world.moveBox(this.box, this.v.x, this.v.y, true);
        this.onFloor = (this.box.y < expectedY);
        if (this.onFloor)
            this.v.y = Math.min(this.v.y, Player.SPEED / 2);
        else if (this.box.y > expectedY)
            this.v.y = Math.max(this.v.y, 0);
        // Update the sprite
        //this.facingLeft = this.v.x ? this.v.x < 0 : this.facingLeft;
        //var suffix = this.facingLeft  ? 'L' : 'R';
        this.facingLeft = this.v.x ? this.v.x < 0 : this.facingLeft;
        var suffix = this.facingLeft ? 'L' : 'R';
        if (!this.onFloor) {
            this.sprite.setAnim(anims.player['jump' + suffix]);
        }
        else if (this.v.x) {
            this.sprite.setAnim(anims.player['run' + suffix]);
        }
        else if (!oldOnFloor) {
            this.sprite.setAnim(anims.player['land' + suffix]);
        }
        else if (this.onFloor && oldVX && !this.v.x) {
            this.sprite.setAnim(anims.player['stand' + suffix]);
        }
        this.sprite.x = this.box.x - 1;
        this.sprite.y = this.box.y + this.box.height - this.sprite.anim.height;
        this.sprite.update();
        // Fire shots
        this.fireDelay -= 1;
        if (this.keys.fire) {
            if (!this.fired && this.fireDelay < 0) {
                sounds.pew.play();
                game.entities.push(new Missile(this.box.x + this.box.width / 2, this.box.y + 0.65, Missile.SPEED * (1 - 2 * Number(this.facingLeft)), 0));
                this.fireDelay = 20;
                this.fired = true;
            }
        }
        else {
            this.fired = false;
        }
    };
    Player.prototype.draw = function (c) {
        this.sprite.draw(c);
    };
    Player.SPEED = 0.35 / 2;
    Player.JUMP_SPEED = Player.SPEED * 2;
    return Player;
})();
//# sourceMappingURL=Player.js.map