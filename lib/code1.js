'use strict';var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}var obj = { 
    ronald: 'one', 
    danielle: 'derp' };

var arr = [1, 2, 3, 4, 5];
var arr1 = ['q', 'q', 'p'];
var derp = _extends({}, obj, { fog: 'smoky' });
var nerp = [].concat(arr, ['fog', 'el-smoko']);







console.log([].concat(arr, arr1));


console.log([].concat(_toConsumableArray(arr.slice()), _toConsumableArray(arr1.slice())));
console.log(arr, arr1);;


console.log(arr);
var herp = arr.slice();
herp[1]++;
console.log(herp);
console.log(arr);