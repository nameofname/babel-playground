"use strict";var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};

var freeze = require('deep-freeze');

var obj = { 
    a: 'b', 
    nerp: 'derp' };



console.log(obj);
console.log(Object.assign({}, { nerp: 'flerpy nerpy doo!' }, obj));
console.log(obj);



console.log(obj);
console.log(_extends({}, obj, { nerp: "shark-o-ball" }));
console.log(obj);