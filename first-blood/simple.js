// 以下 note 一句废话也不会有

function executionFuncOuter(){
    function executionFuncInner(){
        // executionContext包含
        // scopeChain
        // variableObject
        // this
    }
}
executionFuncOuter();

# scopeChain（作用域链）

如上函数会形成一个栈 // ECMA第六版的规范
|  inner() |
|  outer() |
|  window  |
------------

// 作用域嵌套的时候，会在嵌套中寻找（也就是有关系的作用域内的变量可以相互访问），但不会找到同级的作用域（es6增加了块级作用域），这种链式关系叫做作用域链

# variableObject

// 浏览器内部（内部机制，浏览器里看不到）会先声明变量，后面再去赋值，这种现象叫变量提升(hosting)
// 直接console会define报错，需要 var xx;才会输出undefined

# 闭包

// 一个作用域访另一个作用域中的变量, 不是说不 return 就不是闭包了

// 一般做私有，怎么做私有呢？先举一个不私有的例子

function Person() {
    this._attackValue = 100;
}

Person.prototype = {
    attack: function(body) {
        body.blood = this._attackValue - body.defense;
    }
}  

var person = new Person();
console.log('person', person._attackValue);

// 下面改造为私有：（工厂方法）

function Person() {
    var _attackValue = 100;
    return {
        attack: function(body) {
            body.blood = this._attackValue - body.defense;
        }
    }
}

var person = new Person();
console.log('person', person._attackValue);

// AMD框架定义一个模块，这块没弄明白，到底是_attackValue共享吗，待验证
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


var person1 = new Person();
var person2 = new Person();
var person3 = new Person();


// 以上变形存储变量,只攻击一次
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

// 缓存策略，ajax写的也长，需要fetch一下(?这里需要一句话解释下ajax和fetch的区别)

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

// this 是什么 ？

this的使用场景

场景一:

// 如果不是被属性获取器[]或者. 弄出来的, 指向的是window

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
monster.execution();
person.execution();

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

// 这里的this指向window, 为什么
// 返回了一个show后面的纯函数, 逗号表达式对这个函数执行了执行操作

// 优先级
// new > 显式绑定 > 隐式绑定

// 为什么前端管这种合并的大图叫雪碧图