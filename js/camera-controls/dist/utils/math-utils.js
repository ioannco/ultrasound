"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxNumberToInfinity = exports.infinityToMaxNumber = exports.roundToStep = exports.approxEquals = exports.approxZero = void 0;
var EPSILON = 1e-5;
function approxZero(number) {
    return Math.abs(number) < EPSILON;
}
exports.approxZero = approxZero;
function approxEquals(a, b) {
    return approxZero(a - b);
}
exports.approxEquals = approxEquals;
function roundToStep(value, step) {
    return Math.round(value / step) * step;
}
exports.roundToStep = roundToStep;
function infinityToMaxNumber(value) {
    if (isFinite(value))
        return value;
    if (value < 0)
        return -Number.MAX_VALUE;
    return Number.MAX_VALUE;
}
exports.infinityToMaxNumber = infinityToMaxNumber;
function maxNumberToInfinity(value) {
    if (Math.abs(value) < Number.MAX_VALUE)
        return value;
    return value * Infinity;
}
exports.maxNumberToInfinity = maxNumberToInfinity;
