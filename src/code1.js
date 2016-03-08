const obj = { 
    ronald : 'one', 
    danielle : 'derp'
};
const arr = [1,2,3,4,5];

function f(x, y, z) {
    return x + y + z;
}

const derp = {...obj, fog : 'smoky'}
const nerp = {...arr, fog : 'smoky'}
console.log(derp);
console.log(nerp);
