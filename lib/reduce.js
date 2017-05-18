"use strict";


var arr = [1, 2, 3, 4, 5];
var result = arr.reduce(function (prev, curr, index, array) {
    console.log(prev, curr);
    return curr;});


console.log(result);



var arr1 = [5, 87, 33, 5, 7, 8, 5, 4, 33, 3, 6, 78];
var result1 = arr1.reduce(function (prev, curr) {
    return prev < curr ? prev : curr;}, 
arr1[0]);

console.log(result1);