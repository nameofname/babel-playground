"use strict"; 

const freeze = require('deep-freeze');

const obj = {
    a : 'b',
    nerp : 'derp'
};

// object assign does not mutate the original array : 
console.log(obj);
console.log(Object.assign({}, {nerp : 'flerpy nerpy doo!'}, obj));
console.log(obj);

// it's the same as using es6 spread operator for objects 
// (not available right now with base babel use stage-2)
console.log(obj);
console.log({...obj, nerp : "shark-o-ball"});
console.log(obj);

// TODO : try it with deep freeze?
