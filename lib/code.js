'use strict';var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var obj = { 
    ronald: 'one', 
    danielle: 'derp' };

var arr = [1, 2, 3, 4, 5];

function f(x, y, z) {
    return x + y + z;}


var derp = _extends({}, obj, { fog: 'smoky' });
var nerp = _extends({}, arr, { fog: 'smoky' });
console.log(derp);
console.log(nerp);