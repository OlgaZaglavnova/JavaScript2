// function func() {
//    const arr = [1, 2, 3];
//    arr[0] = 0;
//    console.log(arr);
//    const a = 1;
//    const b = `${1}`;
//    console.log(a, b)
// }
//
// func();


const arr = ['foo', 'bar', 'test'];

/*
const a = arr[0];
const b = arr[1]; */

const [a, b] = arr;
console.log(a, b);

const obj = {
   d: 'first',
   c: ['test1', 'test2']
};

const { d, c: [test1, test2]} = obj;

console.log(d, test1, test2);

const func = function (num) {
   return num + 1;
};

const myFunc = a => b => b();

myFunc()

myFunc(2); // 3


const obj1 = {
   foo: 'bar',
   objFunc: function () {
      console.log(this.foo);
   },
   objFuncArrow: () => {
      console.log(this);
   }
};

obj1.objFunc();
obj1.objFuncArrow();


const name = 'Ivan';
const age = '25';

const str = 'Name: ' + name + '. Age: ' + age;
console.log(str);

const str1 = `"Name": ${name}. 

'Age': ${age}`;
console.log(str1);


