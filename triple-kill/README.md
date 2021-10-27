ES6 && ESNext

- babel

- 块级作用域

es5:
if(true) { 
    var name = '1'
}

console.log('name', name);

<!-- name 1 -->

改变这种种情况就会拿函数作用域包一下, 这样的话外面就访问不到了;
(function(){
    var name = 1;
})()

console.log('name', name);

es6:

if(true) { 
    let name = '1'
}

console.log('name', name);

let 没有变量提升
const 普通变量不能修改，但如果变量是对象的话，里面就可以修改，常量都用大写字母

const person = {
    age: 18
}

person.age = 19; // 有效

console.log('person', person);

<!-- 以上尽量不要这么用 -->


- window.name 的作用： 用户在第一次进入的时候出个大引导，再次进入的时候不出了

- 定义形参的时候

function request(url, timeout = 100, callback = function() {}){
    console.log(arg.length = 1);
}

我们会遇到一个问题

var defaultCallback = function() {
    console.log('exec')
    return 1;
}

function request(url, timeout = 100, callback = defaultCallback()){
    console.log('value', value);
}

request('111', 222);

注意：defaultCallback() 中的括号不会立即执行，也不会有缓存

- 扩展运算符  ... 
<!-- 偏语法类 -->

... 当在[实参]上的时候，作用如下：

function add(a, b, c) {
    console.log(a + b + c);
    return a + b + c;
}

add(1, 2, 3);
或者
add(...[1, 2, 3]);
如果没有扩展运算符，该如何实现一个？
add.apply(null, [1, 2, 3]);

... 当在[行参]上的时候，作用如下：
<!-- 如果我们调用的时候传入的参数不一定 -->
function add(agruments) {
    var result = 0;
    for( var i =0 ; i < agruments.length; i++) {
        result += agruments[i];
    }
}
或者 (如果 ...numbers 前面有一个参数的话，永远代表实参的第一个参数)
function add(...numbers) {
    console.log(numbers)
}

add(1);
add(1, 2);
add(1, 2, 3);


