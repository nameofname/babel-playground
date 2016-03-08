"use strict";
/*
I AM PERPLEXED!!! In the video where it shows how to make the create store metohd, the Redux creator 
states that instead of implementing an unsubscribe method, you just return a function from the 
subscribe method that removes a listener. 
https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch

BUT WHY!!?!?!? Seems like a really weird API to me. 
*/

const createStore = (reducer) => {
    let state; 
    let listeners = [];

    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    return { getState, dispatch, subscribe };
}

const reducer = (state = 0, action) => {
    return state;
};

const s = createStore(reducer);

console.log(s);

const listener1 = () => {
    console.log('listener 1');
};

const listener2 = () => {
    console.log('listener 2');
};

console.log(s.subscribe(listener1));
console.log(s.subscribe(listener2));

