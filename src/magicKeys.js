"use strict";

const applied = true;
const obj = {
    applied,
    nerp : 'derp'
};

console.log(obj);
console.log(Object.keys(obj));
console.log(Object.keys(obj).reduce((arg, key) => { console.log(arg, key); }));
