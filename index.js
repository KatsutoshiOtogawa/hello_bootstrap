//@ts-check

console.log('pop');

// interfaceなどの問題で型を指定する必要がある場合は下のようにする。
/** @type {HTMLInputElement} */
const exampleInputEmail1 = (document.querySelector("#exampleInputEmail1"));

console.log(exampleInputEmail1);
exampleInputEmail1.value = "34";
