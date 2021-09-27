"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractClientCoordFromEvent = void 0;
var isTouchEvent_1 = require("./isTouchEvent");
function extractClientCoordFromEvent(event, out) {
    out.set(0, 0);
    if (isTouchEvent_1.isTouchEvent(event)) {
        var touchEvent = event;
        for (var i = 0; i < touchEvent.touches.length; i++) {
            out.x += touchEvent.touches[i].clientX;
            out.y += touchEvent.touches[i].clientY;
        }
        out.x /= touchEvent.touches.length;
        out.y /= touchEvent.touches.length;
        return out;
    }
    else {
        var mouseEvent = event;
        out.set(mouseEvent.clientX, mouseEvent.clientY);
        return out;
    }
}
exports.extractClientCoordFromEvent = extractClientCoordFromEvent;
