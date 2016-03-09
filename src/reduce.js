"use strict"; 

// testing with reduce : 
const arr = [1,2,3,4,5];
const result = arr.reduce((prev, curr, index, array) => {
    console.log(prev, curr);
    return curr;
});

console.log(result);


// reduce an array to it's lowest value : 
const arr1 = [5,87,33,5,7,8,5,4,33,3,6,78];
const result1 = arr1.reduce((prev, curr) =>{
    return prev < curr ? prev : curr;
}, arr1[0]);

console.log(result1);
