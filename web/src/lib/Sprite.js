////////////////////////////////////////////////////////////////////////////////
// class Sprite
////////////////////////////////////////////////////////////////////////////////
var Sprite = (function () {
    function Sprite(anim) {
        this.x = 0;
        this.y = 0;
        this.anim = anim || null;
        this.frame = 0;
        this.countdown = 0;
        this.isDone = false;
    }
    Sprite.prototype.update = function () {
        if (++this.countdown >= this.anim.speed) {
            this.countdown = 0;
            if (++this.frame >= this.anim.frames.length) {
                this.frame = 0;
                if (this.anim.next) {
                    this.anim = this.anim.next;
                }
                else if (!this.anim.loop) {
                    this.frame = this.anim.frames.length - 1;
                    this.isDone = true;
                }
            }
        }
    };
    Sprite.prototype.draw = function (c) {
        this.anim.draw(c, this.x, this.y, this.frame);
    };
    Sprite.prototype.setAnim = function (anim) {
        if (this.anim != anim) {
            this.anim = anim;
            this.frame = 0;
            this.countdown = 0;
            this.isDone = false;
        }
    };
    Sprite.prototype.centerOn = function (box) {
        this.x = box.x + (box.width - this.anim.width) / 2;
        this.y = box.y + (box.height - this.anim.height) / 2;
        return this;
    };
    return Sprite;
})();
//# sourceMappingURL=Sprite.js.map