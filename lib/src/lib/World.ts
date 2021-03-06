////////////////////////////////////////////////////////////////////////////////
// class World
////////////////////////////////////////////////////////////////////////////////


class World {
    
    width:number;
    height:number;
    boxes:Array<Box>;
    canvas:HTMLCanvasElement;
    
    constructor() {
        this.width = levelData[0].length;
        this.height = levelData.length;
    
        // Load the collision detection
        this.boxes = [];
        for (var i = 0; i < boxData.length; i++) {
            var d = boxData[i];
            this.boxes.push(new Box(d[0], d[1], d[2], d[3], d[4]));
        }
    
        // Load the canvas
        var image:HTMLImageElement = <HTMLImageElement>document.getElementById('tileset');
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * TILE_SIZE;
        this.canvas.height = this.height * TILE_SIZE;
        var c = this.canvas.getContext('2d');
        var n = Math.floor(image.width / TILE_SIZE);
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var tile = levelData[y][x];
                if (tile == -1) continue;
                var u = tile % n;
                var v = (tile - u) / n;
                c.drawImage(image, u * TILE_SIZE, v * TILE_SIZE, TILE_SIZE, TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
    
    draw(c) {
        c.drawImage(this.canvas, 0, 0, this.width, this.height);
    }
    
    moveBox(box, dx, dy, slide) {
        // Move along x axis
        if (dx) {
            for (var i = 0; i < this.boxes.length; i++) {
                var b = this.boxes[i];
                if (b.y + b.height > box.y && box.y + box.height > b.y) {
                    // Special-case ramps
                    var fromRight = (dx < 0 && box.x > b.x && box.x + dx < b.x + b.width);
                    var fromLeft = (dx > 0 && box.x + box.width < b.x + b.width && box.x + box.width + dx > b.x);
                    var aboveBottom = (box.y + box.height <= b.y + b.height);
                    var belowTop = (box.y >= b.y);
                    var skip = true;
                    if (slide) {
                        var tLeft = Math.max(0, Math.min(1, (box.x + dx - b.x) / b.width));
                        var tRight = Math.max(0, Math.min(1, (box.x + box.width + dx - b.x) / b.width));
                        if (b.type == Type.RampBottomLeft && fromRight && aboveBottom) box.y = Math.min(box.y, b.y + b.height * tLeft - box.height);
                        else if (b.type == Type.RampBottomRight && fromLeft && aboveBottom) box.y = Math.min(box.y, b.y + b.height * (1 - tRight) - box.height);
                        else if (b.type == Type.RampTopLeft && fromRight && belowTop) box.y = Math.max(box.y, b.y + b.height * (1 - tLeft));
                        else if (b.type == Type.RampTopRight && fromLeft && belowTop) box.y = Math.max(box.y, b.y + b.height * tRight);
                        else skip = false;
                    } else {
                        var tTop = Math.max(0, Math.min(1, (box.y + dy - b.y) / b.height));
                        var tBottom = Math.max(0, Math.min(1, (box.y + box.height + dy - b.y) / b.height));
                        if (b.type == Type.RampBottomLeft && fromRight && aboveBottom) dx = Math.max(dx, b.x + b.width * tBottom - box.x);
                        else if (b.type == Type.RampBottomRight && fromLeft && aboveBottom) dx = Math.min(dx, b.x + b.width * (1 - tBottom) - box.x - box.width);
                        else if (b.type == Type.RampTopLeft && fromRight && belowTop) dx = Math.max(dx, b.x + b.width * (1 - tTop) - box.x);
                        else if (b.type == Type.RampTopRight && fromLeft && belowTop) dx = Math.min(dx, b.x + b.width * tTop - box.x - box.width);
                        else skip = false;
                    }
                    if (skip) continue;
    
                    // Adjust horizontal distance to avoid collisions
                    if (dx < 0 && box.x >= b.x + b.width && box.x + dx < b.x + b.width) dx = b.x + b.width - box.x;
                    else if (dx > 0 && box.x + box.width <= b.x && box.x + box.width + dx > b.x) dx = b.x - box.x - box.width;
                }
            }
            box.x += dx;
        }
    
        // Move along y axis
        if (dy) {
            var center = box.x + box.width / 2;
            for (var i = 0; i < this.boxes.length; i++) {
                var b = this.boxes[i];
                if (b.x + b.width > box.x && box.x + box.width > b.x) {
                    var top = b.y, bottom = b.y + b.height;
    
                    // Adjust top and bottom based on box type
                    var tLeft = Math.max(0, Math.min(1, (box.x - b.x) / b.width));
                    var tRight = Math.max(0, Math.min(1, (box.x + box.width - b.x) / b.width));
                    if (b.type == Type.RampBottomLeft) top = b.y + b.height * tLeft;
                    else if (b.type == Type.RampBottomRight) top = b.y + b.height * (1 - tRight);
                    else if (b.type == Type.RampTopLeft) bottom = b.y + b.height * (1 - tLeft);
                    else if (b.type == Type.RampTopRight) bottom = b.y + b.height * tRight;
    
                    // Adjust vertical distance to avoid collisions
                    if (dy < 0 && box.y >= bottom && box.y + dy < bottom) dy = bottom - box.y;
                    else if (dy > 0 && box.y + box.height <= top && box.y + box.height + dy > top) dy = top - box.y - box.height;
                }
            }
            box.y += dy;
        }
    }
}
