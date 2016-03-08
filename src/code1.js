const obj = { 
    ronald : 'one', 
    danielle : 'derp'
};
const arr = [1,2,3,4,5];
const arr1 = ['q', 'q', 'p'];
const derp = {...obj, fog : 'smoky'}
const nerp = [...arr, 'fog', 'el-smoko']

//console.log(derp);
//console.log(nerp);
//console.log([...arr, 6,6,6]);


// MOTHERFUCKING.... .. SPREAD OPERATORS BITCH!!?!?!?
console.log([...arr, ...arr1]);
// slice with spread, kind of the same thing as doing CONCAT! 
// important because it does not mutate the original arrays : 
console.log([...arr.slice(), ...arr1.slice()]);
console.log(arr, arr1);;

// modify arr and increment the nth position without mutating arr : 
console.log(arr);
const herp = arr.slice();
herp[1] ++ ;
console.log(herp);
console.log(arr);

