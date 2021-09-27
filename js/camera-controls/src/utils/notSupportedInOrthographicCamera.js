export function notSupportedInOrthographicCamera(camera, message) {
    if (!camera.isPerspectiveCamera) {
        console.warn(`${message} is not supported in OrthographicCamera`);
        return true;
    }
    return false;
}
//# sourceMappingURL=notSupportedInOrthographicCamera.js.map