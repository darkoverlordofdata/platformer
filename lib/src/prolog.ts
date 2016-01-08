const DRAW_DEBUG = false;
const TILE_SIZE = 16;
const WINDOW_SCALE = 2;
const SCREEN_WIDTH = 16;
const SCREEN_HEIGHT = 12;
const GRAVITY = 0.025 / 2;
const STEP = 1/60;


enum Type {
  Solid,
  RampTopLeft,
  RampTopRight,
  RampBottomLeft,
  RampBottomRight
}
