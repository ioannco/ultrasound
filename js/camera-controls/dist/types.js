"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTION = void 0;
var ACTION;
(function (ACTION) {
    ACTION[ACTION["NONE"] = 0] = "NONE";
    ACTION[ACTION["ROTATE"] = 1] = "ROTATE";
    ACTION[ACTION["TRUCK"] = 2] = "TRUCK";
    ACTION[ACTION["DOLLY"] = 3] = "DOLLY";
    ACTION[ACTION["ZOOM"] = 4] = "ZOOM";
    ACTION[ACTION["TOUCH_ROTATE"] = 5] = "TOUCH_ROTATE";
    ACTION[ACTION["TOUCH_TRUCK"] = 6] = "TOUCH_TRUCK";
    ACTION[ACTION["TOUCH_DOLLY"] = 7] = "TOUCH_DOLLY";
    ACTION[ACTION["TOUCH_ZOOM"] = 8] = "TOUCH_ZOOM";
    ACTION[ACTION["TOUCH_DOLLY_TRUCK"] = 9] = "TOUCH_DOLLY_TRUCK";
    ACTION[ACTION["TOUCH_ZOOM_TRUCK"] = 10] = "TOUCH_ZOOM_TRUCK";
})(ACTION = exports.ACTION || (exports.ACTION = {}));
