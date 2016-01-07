var DRAW_DEBUG = false;
var TILE_SIZE = 16;
var WINDOW_SCALE = 2;
var SCREEN_WIDTH = 16;
var SCREEN_HEIGHT = 12;
var GRAVITY = 0.025 / 2;
var Type;
(function (Type) {
    Type[Type["Solid"] = 0] = "Solid";
    Type[Type["RampTopLeft"] = 1] = "RampTopLeft";
    Type[Type["RampTopRight"] = 2] = "RampTopRight";
    Type[Type["RampBottomLeft"] = 3] = "RampBottomLeft";
    Type[Type["RampBottomRight"] = 4] = "RampBottomRight";
})(Type || (Type = {}));
//# sourceMappingURL=prolog.js.map