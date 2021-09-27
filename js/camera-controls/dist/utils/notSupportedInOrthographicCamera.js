"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notSupportedInOrthographicCamera = void 0;
function notSupportedInOrthographicCamera(camera, message) {
    if (!camera.isPerspectiveCamera) {
        console.warn(message + " is not supported in OrthographicCamera");
        return true;
    }
    return false;
}
exports.notSupportedInOrthographicCamera = notSupportedInOrthographicCamera;
