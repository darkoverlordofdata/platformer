////////////////////////////////////////////////////////////////////////////////
// class Sound
////////////////////////////////////////////////////////////////////////////////

class Sound {

    elems:Array<any>;
    index:number;

    constructor(path, copies) {
        this.elems = [];
        this.index = 0;
        for (var i = 0; i < copies; i++) {
            this.elems.push(new Audio(path));
        }
    }

    play() {
        if (window['chrome']) this.elems[this.index].load();
        this.elems[this.index].play();
        this.index = (this.index + 1) % this.elems.length;
    }

}
