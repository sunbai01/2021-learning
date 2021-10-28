ES6 && ESNext

- 1、babel

- 2、块级作用域

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

3、
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

4、
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
<!-- ...numbers 会将传入的参数采集成一个数组 -->
function add(...numbers) {
    console.log(numbers)
}

add(1);
add(1, 2);
add(1, 2, 3);

5、
- 箭头函数

function a() {
    return b = () => {
        console.log(this);
        <!-- 箭头函数外部的函数 -->
    }
}

var b = a();

function c() {
    b();
}

一个小工具函数，把一个字符串转成一个正则对象
var regxFy = str => {
    new RegExp(str);
}

在对象中，kv一样的话可以简写，function可以写成如下形式

a: function() {

}

=>

a() {

}

6、
- es6 新增方法

object.assign();

<!-- 不要直接改对象的引用，尽量使用函数式的情况，用新的对象和返回值的形式去承接 -->

旧：

var params = {
    url: 'http://www.taobao.com',
    method: 'get'
}

function requestParamsProcess(params) {
    params.url = params.url + '?q=1';
}

function request() {
    requestParamsProcess(params);
    console.log('params', params);
}

request();

新：

var params = {
    url: 'http://www.taobao.com',
    method: 'get'
}

// 这块有个大的优点就是可单测
function requestParamsProcess(params) {
    var paramsProcess = {};
    // 把一个对象上所有属性，merge到一个新对象上，第一个参数是新对象，第二个参数是旧对象
    object.assign(paramsProcess, params);
    paramsProcess.url = paramsProcess.url + '?q=1';
    return paramsProcess;
}

function request() {
    var processParams = requestParamsProcess(params);
    console.log('processParams', processParams);
}

request();

-------------------------------------
var paramsProcess = {};
object.assign(paramsProcess, params);

可以写成,达到相同的效果

var paramsProcess = {};
var paramsProcess = {
    ...paramsProcess,
    ...params
};

7、
- 解构

var person = {
    name: 'sunbai',
    age: 18
}

已知 person 里有 name ，这里 name1 是别名;此时name 是没有值的
let {name: name1} = person;

// 当 person 里没有 value 的时候，默认值为 true
let {name, value = true} = person;

数组解构
var a = [1, 2, 3];
let [first, second] = a;
console.log('first', first);
console.log('second', second);

<!-- server端 返回的数据结构 -->
var data = {
    hasMore = true,
    data: {
        list: {
            data: {

            }
        }
    }
}

<!-- 取用的时候进行参数解构 -->
<!-- data.data -->
render({data}) {
}

8、
- Set 与 Map

<!-- 数组去重该怎么办？ -->

传一个数组，按值去重并返回一个对象

9、
- 引入了类的概念

class personClass {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log('name', name)
    }
    // 静态变量，通过实例化访问不到，只能通过类名点出来
    static staticMethod() {

    }
}

以上类比于

function personClass() {
    this.name = name;
}

personClass.protoType = {
    constructor,
    sayName() {
        console.log(this.name);
    }
}

personClass.staticMethod = function() {

}

// ? 这里继承没搞懂

- promise

promise 怎么控制流程？ 看下下面例子，然后进行改造；

fuction request(callback) {
    $.ajax({
        callback: function(cb) {
            callback(cb);
        }
    })
}

request(
    () => {}
)

// 如果不想传函数的话，就用promise

fuction request(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve('111');
        },1000);
    });
}

- promise 串联

request()
    <!-- 决议： resolve -->
    .then(function(res) {
        throw Error(1);
        console.log('res:::', res);
        return 222;
    })
    .then(function(res) {
        console.log('res-2', res);
        <!-- return 333; -->
        <!-- 如果链中有一个环节返回一个新的 promise 对象 -->
        return new Promise ((resolve, reject) => {
            resolve(555);
        })
    })
    .then(function(res) {
        console.log('res-3', res);
    })
    // 能捕获到链中某一环的运行错误。但是如果某一环里又套了一个promise，那是捕获不到的，
    .catch(err => {
        console.log('err', err);
    })

总结一下 catch 做了什么，catch 会承接 then 中的错误，跳过catch 与 then 之间的部分，但会执行 catch 之后的代码 
    <!-- try catch -->
    try {
        walk();
    }
    catch (e) {
        console.log('e', e);
    }

- promise.all

普通写法：
function request(params, callback) {
    $.ajax({
        callback
    })
}

function exec() {

}

count = 0;
request('taobao.com', function() {
    count ++;
    if(count == 2) {
        exec();
    } 
});
request('tmall.com', function() {
    count ++;
    if(count == 2) {
        exec();
    } 
});

var a = new Promise(function (resolve, reject) {
    resolve(1);
})

var b = new Promise(function (resolve, reject) {
    resolve(2);
})

var c = new Promise(function (resolve, reject) {
    resolve(3);
})


let d = Promise.all(['a', 'b', 'c']);

d.then(([p1res, p2res, p3res]) => {
    // 所有的都成功才能走到这里
})

-------------------------------------------------

function request(params, callback) {
    return new Promise (() => {
        resolve();
    });
}

var task1 = request('taobao.com');
var task2 = request('tmall.com');

Promise.all([task1, task2])
    .then(function () {
        console.log('两个请求都请求完了')
    });

- promise 的三种状态 ？？ 这里听的不太细

pending fulfilled  rejected

- 手写 promise 


