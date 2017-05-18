"use strict";

const loggo = (str) => {
    console.log(`this is the loggo guy, ${str}`);
};

export { loggo };

export default (str) => {
    console.log(`this is the default fn, ${str}`);
};
