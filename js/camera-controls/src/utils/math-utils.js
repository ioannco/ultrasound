const EPSILON = 1e-5;
export function approxZero(number) {
    return Math.abs(number) < EPSILON;
}
export function approxEquals(a, b) {
    return approxZero(a - b);
}
export function roundToStep(value, step) {
    return Math.round(value / step) * step;
}
export function infinityToMaxNumber(value) {
    if (isFinite(value))
        return value;
    if (value < 0)
        return -Number.MAX_VALUE;
    return Number.MAX_VALUE;
}
export function maxNumberToInfinity(value) {
    if (Math.abs(value) < Number.MAX_VALUE)
        return value;
    return value * Infinity;
}
//# sourceMappingURL=math-utils.js.map