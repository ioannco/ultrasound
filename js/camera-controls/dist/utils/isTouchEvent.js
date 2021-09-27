"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTouchEvent = void 0;
function isTouchEvent(event) {
    return 'TouchEvent' in window && event instanceof TouchEvent;
}
exports.isTouchEvent = isTouchEvent;
