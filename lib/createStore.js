"use strict";









var createStore = function createStore(reducer) {
    var state = undefined;
    var listeners = [];

    var getState = function getState() {return state;};
    var dispatch = function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(function (listener) {return listener();});};

    var subscribe = function subscribe(listener) {
        listeners.push(listener);
        return function () {
            listeners = listeners.filter(function (l) {return l !== listener;});};};



    return { getState: getState, dispatch: dispatch, subscribe: subscribe };};


var reducer = function reducer() {var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];var action = arguments[1];
    return state;};


var s = createStore(reducer);

console.log(s);

var listener1 = function listener1() {
    console.log('listener 1');};


var listener2 = function listener2() {
    console.log('listener 2');};


console.log(s.subscribe(listener1));
console.log(s.subscribe(listener2));