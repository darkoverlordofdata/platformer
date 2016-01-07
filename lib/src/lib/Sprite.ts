////////////////////////////////////////////////////////////////////////////////
// class Sprite
////////////////////////////////////////////////////////////////////////////////

class Sprite {

    x:number;
    y:number;
    anim:any;
    frame:number;
    countdown:number;
    isDone:boolean;

    constructor(anim) {
        this.x = 0;
        this.y = 0;
        this.anim = anim || null;
        this.frame = 0;
        this.countdown = 0;
        this.isDone = false;
    }
    
    update() {
        if (++this.countdown >= this.anim.speed) {
            this.countdown = 0;
            if (++this.frame >= this.anim.frames.length) {
                this.frame = 0;
                if (this.anim.next) {
                    this.anim = this.anim.next;
                } else if (!this.anim.loop) {
                    this.frame = this.anim.frames.length - 1;
                    this.isDone = true;
                }
            }
        }
    }
    
    draw(c) {
        this.anim.draw(c, this.x, this.y, this.frame);
    }
    
    setAnim(anim) {
        if (this.anim != anim) {
            this.anim = anim;
            this.frame = 0;
            this.countdown = 0;
            this.isDone = false;
        }
    }
    
    centerOn(box) {
        this.x = box.x + (box.width - this.anim.width) / 2;
        this.y = box.y + (box.height - this.anim.height) / 2;
        return this;
    }
}