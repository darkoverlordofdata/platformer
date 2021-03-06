////////////////////////////////////////////////////////////////////////////////
// class Missile
////////////////////////////////////////////////////////////////////////////////
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Missile = (function (_super) {
    __extends(Missile, _super);
    function Missile(game, x, y, vx, vy) {
        _super.call(this);
        x += vx < 0 ? -0.3 : 0.3;
        this.v = { x: vx, y: vy };
        this.game = game;
        this.anims = game.anims;
        this.sounds = game.sounds;
        this.box = new Box(x - 0.2, y - 0.2, 0.4, 0.4);
        this.sprite = new Sprite(vx < 0 ? this.anims.missiles.left : this.anims.missiles.right);
        this.puffDelay = 2 + Math.floor(Math.random() * 6);
    }
    Missile.prototype.update = function () {
        // Update the position
        var particles = this.game.particles;
        var entities = this.game.entities;
        var sounds = this.sounds;
        var missiles = this.anims.missiles;
        var box = this.box;
        var expectedX = box.x + this.v.x;
        this.game.world.moveBox(box, this.v.x, this.v.y, false);
        this.sprite.centerOn(box);
        this.sprite.update();
        // Expode if we hit a wall
        if (box.x != expectedX) {
            var i = entities.indexOf(this);
            if (i != -1)
                entities.splice(i, 1);
            particles.push(new Sprite(missiles.boom).centerOn(box));
            sounds.boom.play();
        }
        // Add puff particles behind the missile
        if (--this.puffDelay < 0) {
            this.puffDelay = 2 + Math.floor(Math.random() * 6);
            particles.push(new Sprite(missiles.puff).centerOn(box));
        }
        // Explode and remove entities when we intersect them
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity instanceof Hopper && box.overlaps(entity.box)) {
                particles.push(new Sprite(missiles.boom).centerOn(box));
                entities.splice(entities.indexOf(this), 1);
                entities.splice(i, 1);
                sounds.boom.play();
                break;
            }
        }
    };
    Missile.prototype.draw = function (g) {
        this.sprite.draw(g);
    };
    Missile.SPEED = 0.4;
    return Missile;
})(Entity);
//# sourceMappingURL=Missile.js.map