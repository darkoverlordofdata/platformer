////////////////////////////////////////////////////////////////////////////////
// class Sound
////////////////////////////////////////////////////////////////////////////////
var Sound = (function () {
    function Sound(path, copies) {
        this.elems = [];
        this.index = 0;
        for (var i = 0; i < copies; i++) {
            this.elems.push(new Audio(path));
        }
    }
    Sound.prototype.play = function () {
        if (window['chrome'])
            this.elems[this.index].load();
        this.elems[this.index].play();
        this.index = (this.index + 1) % this.elems.length;
    };
    return Sound;
})();
//# sourceMappingURL=Sound.js.map