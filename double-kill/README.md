面向对象与继承

- 类、封装、继承、多态
- 构造函数、实例、对象字面量
- 命名空间
- 内置对象、宿主对象、本地对象

# 面向对象的设计模式：https://blog.csdn.net/qq_41308489/article/details/115678064

var monster = {}; 一个字面量的定义

1、工厂模式：创建一个对象，最后return这个对象

function body() {
    var o = {};
    o._bloodVolume = 100;
    <!-- 无论是数组还是数字，monster 和 monster2 都不会互相改 -->
    o._attackVolume = 100;  
    return o;
}

var monster = body();
var monster2 = body();

(与下面的一样，他没有new关键字而已)

2、构造函数模式 <!-- 用这个构造函数 new 出了一个新对象 -->

function Body() {
    this._bloodVolum = 100;
    <!-- 无论是数组还是数字，monster 和 monster2 都不会互相改 -->
    this._attackVolum = 500;
    <!-- var say = function() {
        console.log('hi');
    } -->
    this.say = function() {
        console.log('hi');
    }
}

var monster = new Body();

<!-- new做了什么事情呢 -->

<!-- 创建一个新对象 -->
var newObj = {};
<!-- 将构造函数中的作用域指向该对象 -->
var bindedBody = Body.bind(newObj);
<!-- 执行构造函数中的代码 -->
bindedBody();
<!-- 返回新对象 -->
var monster = newObj;

<!-- 对象之前不会互相干扰，但是方法共用的时候这样写不简洁 -->


3、原型模式

<!-- 这种情况可以共享Body这个构造函数里的值，也就是 monster 和 monster2 都是实例，改实例中的谁另一个都会跟着改，？？？QA3:那么这个东西有什么用呢？？？ -->

NEW!

创建一个函数，函数内必有 prototype，创建函数的时候，同时会创建一个对象，对象内有一个属性叫constructor
他和 prototype 互相指

对象的 _proto_ 也指向 prototype

<!-- 实例对象的__proto__（这个学名叫原型）就是构造函数的prototype（每个构造函数都会有一个protoType属性） -->

<!-- 其实 实例对象的[[protoType]]属性也指向构造函数的protoType，这样就能访问构造函数中的属性了 -->

原型链：先在__proto__上找，找不到去构造函数的protoType上找

function Body() {}

Body.prototype._bloodVolum = 100;
<!-- 如果这是数组，则 monster 和 monster2 的_bloodVolum会互相改，如果是数字则不会 -->
Body.prototype._attackVolum = 500;

var monster = new Body();
var monster2 = new Body();

<!-- 缺点：大家在共享一个变量 -->

4、组合模式，属性都挂在this中，方法挂在prototype中

function Person() {
    this._attackVolum = 100;
}

Person.prototype = {
    attack(body) {
        body.bloodVolum -= this._attackVolum - body.defenseVolume;
    }
}

<!-- 最常用的模式 -->

上面的代码在es6中的写法是

<!-- class => es6中类的语法糖 -->
class Person {
    constructor() {
        this._attackVolum = 100;
    }

    attack(body) {
        body.bloodVolum -= this._attackVolum - body.defenseVolume;
    }
}

<!-- babel（高端语法 match 低端浏览器） 怎么转化上面代码呢 -->

将class 解析成 function，然后用defineProperties循环挂在实例对象上

# 继承：

在原有对象的基础上稍作修改，得到一个新对象，并且不影响原有对象

## 方法1：原型链继承

### 会改的情况

function Body() {
    <!-- 变化是这里 -->
    this.volumes = {
        _bloodVolum: 100,
        _attackVolum: 500   
    }
}

Body.prototype.attack = function(body) {
    this.volumes._bloodVolum -= body.getAttackVolum() - this.volumes._attackVolum;
}

<!-- 子类 -->
function Monster() {};

<!-- 重点是这句，子类的 prototype 直接连在父类上 -->
Monster.prototype = new Body();

var monster = new Monster();
var monster2 = new Monster();

monster._bloodVolum = 999

<!-- 这样的话，改Monster1，Monster2也会改(这种情况只限于属性是对象的时候)，这种情况是不可接受的 -->
<!-- 为什么会改呢，因为两个子实例都没有定义_bloodVolum，他们会去Monster上找，找不到，都再去Body上找，Body上有且指向同一个，所以会互相改 -->
### 不会改的情况
<!-- 父类 -->
function Body() {
    this._bloodVolum = 100;
    this._attackVolum = 500;
}

Body.prototype.attack = function(body) {
    this.volumes._bloodVolum -= body.getAttackVolum() - this._attackVolum;
}

<!-- 子类 -->
function Monster() {};

<!-- 重点是这句，子类的 prototype 直接连在父类上 -->
Monster.prototype = new Body();

var monster = new Monster();
var monster2 = new Monster();

monster._bloodVolum = 999  

// 是因为这个语句是给monster这个实例上的赋值语句，在本身挂了个_bloodVolum,所以不用去 Body上找了,这种方式的修改在实例间不联动
// 而上面那种方式联动是因为 对象有两个属性操作符 => monster.Volumes._bloodVolum,浏览器看到这句话的时候会想拿_bloodVolum，先要拿到【monster.Volumes】，monster.Volumes在monster上没有，所以需要去Monster上找，而monster._bloodVolum，要想拿到_bloodVolum，需要找到monster，还没到Monster那一步呢,属性屏蔽规则

## 方法2：原型链 + 构造函数 继承

function Body(name) {
    this._bloodVolume = 1000;
    this._attackVolum = 500;
    this.name = name;
}
Body.protoType.attack = function(body) {
    this._bloodVolume -= body.getAttackVolume() - this._defenseVolume;
}

<!-- 此时 Monster 上就会复刻 Body 上的所有属性，属性的冒充 -->
function Monster(name) {
    Body.call(this, name);
};

Monster.prototype = new Body();

var monster = new Monster(name);
var monster2 = new Monster(name);


这种方式也不好的一点是：使用方不知道该new啥，因为传参不知道传啥，需要先有一个样例

## 方法4: 寄生组合继承（Object.create）

Object.create做了什么

1、创建了一个对象 var a = Object.create()
2、把传的第一个参数挂在对象的proto上{name: 'sunbai'}
3、第二个参数merge到创建的新对象里
{age: {value: 2}}
4、a.name a.age均可以此方式访问


e.g.

function Body() {
    this._bloodVolume = 1000;
    this._attackVolum = 500;
}
Body.protoType.attack = function(body) {
    this._bloodVolume -= body.getAttackVolume() - this._defenseVolume;
}

function Monster() {
    this.name = 'sunbai';
    Body.call(this);
}

<!-- 这样是不行的，因为会将父类子类会一起改
Monster.protoType = Body.protoType; 要写成如下 -->

Monster.protoType = Object.create(Body.protoType);

var monster = new Monster();

<!-- Monster.protoType.say -->

## 方法5：es6 继承

// 父类

class Body {
    constructor() {
        this._bloodVolume = 1000;
        this._attackVolume = 1000;
    }

    attacked(body) {
        this._bloodVolume -= body.gethanshuming() - this._attackVolume;
    }

}

// 子类继承用 extends 

class Monster extends Body {
    constructor() {
        super();
    }

    // 重写方法
    attacked() {
        this._bloodVolume -=1;
    }
}






