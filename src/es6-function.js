"use strict";

const funkey = (arg) => {
    return "this is your arg : " + arg;
};

// wrap a function in the function -- returns the inner function that uses the argument from the outer function
// wrap a function in the function -- returns the inner function that uses the argument from the outer function
const callIt = (string) => {
    return func => {
        func(string);
    }
};

callIt("florg")(arg => { console.log('inside of here yeah', arg); });


