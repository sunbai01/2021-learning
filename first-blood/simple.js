// 以下 note 一句废话也不会有
(下面主要讲了三个知识点：闭包，作用域，执行上下文)
// 一个函数
function executionFuncOuter(){
    function executionFuncInner(){
        // executionContext(执行上下文)包含
        // scopeChain
        // variableObject（涉及变量提升 hoisting）
        // this
    }
}
executionFuncOuter();

# scopeChain（作用域链）

如上函数会形成一个执行栈 // ECMA第六版的规范，会在定义栈向上找，但不会在执行栈向上找
|  inner() |
|  outer() |
|  window  |
------------

// 会在定义栈向上找变量，但不会在执行栈向上找：这句话很重要

# variableObject

// 浏览器内部（内部机制，浏览器里看不到）会先声明变量，后面再去赋值，这种现象叫变量提升(hoisting)
// 直接console一个a会define报错，需要在 var a = 1;前console一个a，才会输出undefined

# 作用域

// js中有全局作用域，函数作用域，es6又增加了块级作用域

# 闭包

// 一个作用域访另一个作用域中的变量, 不是说不 return 就不是闭包了
e.g

function outer() {
    var person = 'sunbai';
    function inner() {
        console.log('person', person)
    }
    inner();
}
outer();

// 改造 => 

function outer() {
    var person = 'sunbai';
    return function inner() {
        console.log('person', person)
    }
}
var inner = outer();
inner();

## 闭包的应用场景：
// 1、一般封装私有变量（AMD的框架都常用），怎么做私有呢？先举一个不私有的例子
// 普通定义类的方式
function Person() {
    // 这个属性挂在了对象上
    this._attackValue = 100;
}

Person.prototype = {
    attack: function (body) {
        body.blood = this._attackValue - body.defense;
    }
}  

var person = new Person();
console.log('person', person._attackValue); // 100

// 下面改造为私有：（工厂方法重新来做这个事情）
// 这是定义了一个类
function Person() {
    var _attackValue = 100;
    // 返回一个新对象
    return {
        attack: function(body) {
            body.blood = this._attackValue - body.defense;
        }
    }
}

var person = new Person();
console.log('person', person._attackValue); // undefined

// AMD框架定义一个模块
define(function () {
    var _attackValue = 100;
    // 这不算私有变量，这个叫做静态私有变量
    // 定义一个类
    function Person() {};
    Person.prototype = {
        attack: function (body) {
            body.blood = _attackValue - body.defense;
            _attackValue -= 10;
            // 小tip：a = a - 10 => a -= 10
        }
    };
    return Person;
})

var Person = require('Person');

// 不共享
var person1 = new Person();
var person2 = new Person();
var person3 = new Person();


// 2、存储变量（只攻击一次）
define(function () {
    var flag = false;
    // 定义一个类
    function Person() {};
    Person.prototype = {
        attack: function(body) {
            if(flag) {
                return;
            }
            flag = true;
        }
    }
    return Person;
})

var person = new Person();

button.addEventListener('click', function() {
    person.attack();
})

// 3、缓存策略，ajax写的也长，需要fetch一下(?这里需要一句话解释下ajax和fetch的区别)

function getListDataManager() {
    let localData = null;

    return  {
        getData() {
            if(localData) {
                // 为了类型统一
                return Promise.resolve(localData);
            }
            return fetch('xxx')
                .then(data => localData = data.json());
        }
    }
}

// 用的时候，在一个函数中永远返回同一个类型
const listDataManager = getListDataManager();
listDataManager.getData()
    .then(res => {
        console.log('res--');
    });

// mpVue -> vue的源码
// wepy
// mpx

// 通过游戏讲面向对象

# this

1、 this 是什么 ？


2、this的使用场景

场景一:

// 如果不是被属性获取器 []或者. 弄出来的, 指向的是window

场景二:

// 一个对象里面有属性和方法
function execution() {
    // 很方便，都不用做if else 特判
    console.log(this.name)
}

var person = {
    name: 'sunbai',
    execution: execution
}

var monster = {
    name: 'wangyang',
    execution: execution
}
monster.execution(); // wangyang
person.execution(); // sunbai

场景三:

function Person(name) {
    this.name = name;
    console.log(this);
}

var person = new Person('sunbai');

// 如果是new出来的话，指向的就是那个new出来的对象

场景四:

// 特殊情况 apply call bind会强行改写this的指向

function execution() {
    console.log(this.name);
    var inner = () => {
        console.log('this.name', this.name);
    }
    inner();
}

var person = {
    name: 'sunbai',
    execution: execution
}

var monster = {
    name: 'wangyang',
    execution: execution
}

person.execution.call(monster, arg1, arg2, arg3);
person.execution.apply(monster, [arg1, arg2, arg3]);
var bindedExecution = person.execution.bind(monster);
bindedExecution()

// 这样会把 本身 person 的指向 换到 monster上

场景五:

// 箭头函数，如上举例


function execution() {
    console.log(this.name);
    return () => {
        console.log('this.name', this.name);
    }
}

var person = {
    name: 'sunbai',
    execution: execution
}

var monster = {
    inner: person.execution()
}

monster.inner();

// 这个 this 的指向是 person

// 逗号表达式，执行前一项，返回后一项，e.g.
// 1、
var a = (0,1)
a => 1

// 2、
function aaa() {}
aaa()
return 1

// =>

((function a(){})(), 1)


var obj = {
    show: function() {
        console.log('this', this);
    }
};

(0, obj.show)();

// 这里的this指向window而不是obj, 为什么？
// 因为返回了一个show后面的纯函数, 逗号表达式对这个函数执行了执行操作

// 优先级
// new > 显式绑定 > 隐式绑定

// 前端管这种合并的大图叫雪碧图