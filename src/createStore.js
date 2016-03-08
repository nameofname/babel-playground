"use strict";

const createStore = (reducer) => {
    let state; 
    let listeners = [];

    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listene);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };
}

const reducer = (state = 0, action) => {
    return state;
};

const s = createStore(reducer);

console.log(s);
