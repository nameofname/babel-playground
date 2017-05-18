"use strict";

var applied = true;
var obj = { 
    applied: applied, 
    nerp: 'derp' };


console.log(obj);
console.log(Object.keys(obj));
console.log(Object.keys(obj).reduce(function (arg, key) {console.log(arg, key);}));