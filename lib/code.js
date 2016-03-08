var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};const obj = { 
    ronald: 'one', 
    danielle: 'derp' };

const arr = [1, 2, 3, 4, 5];

function f(x, y, z) {
    return x + y + z;}


const derp = _extends({}, obj, { fog: 'smoky' });
const nerp = _extends({}, arr, { fog: 'smoky' });
console.log(derp);
console.log(nerp);