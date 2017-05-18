"use strict";

var funkey = function funkey(arg) {
    return "this is your arg : " + arg;};




var callIt = function callIt(string) {
    return function (func) {
        func(string);};};



callIt("florg")(function (arg) {console.log('inside of here yeah', arg);});