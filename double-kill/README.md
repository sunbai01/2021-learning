面向对象与继承

- 类、封装、继承、多态
- 构造函数、实例、对象字面量
- 命名空间
- 内置对象、宿主对象、本地对象

面向对象：

var monster = {}; 一个字面量的定义

1、工厂模式：

function body() {
    var o = {};
    o._bloodVolume = 100;
    o._attackVolume = 100;  
    return o;
}

var monster = body();
var monster2 = body();

(与下面的一样，他没有new关键字而已)

2、构造函数方法 <!-- 用这个构造函数 new 出了一个新对象 -->

function Body() {
    this._bloodVolum = 100;
    this._attackVolum = 500;
    var say = function() {
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


<!-- 这种情况可以共享Body这个构造函数里的值，也就是 monster 和 monster2 都是实例，改实例中的谁另一个都会跟着改，那么这个东西有什么用呢? -->


function Body() {}

<!-- 我们每个函数都会有一个protoType属性 -->
<!-- 原型是挂在构造函数上的 -->
<!-- body 的 protoType 指向对象上，对象的constructor指到了body上，互相指 -->

其实 对象有一个属性叫[[protoType]]指向构造函数的protoType，所以就能访问构造函数中的属性了
而且对象中有一个 _proto_（这个学名叫原型）, 其实就是函数中的 protoType

Body.protoType._bloodVolum = 100;
Body.protoType._attackVolum = 500;

var monster = new Body();
var monster2 = new Body();


<!-- 这里new做了什么呢 -->

3、组合模式
一般函数挂出去到proto上，因为函数一般不会被修改，只会被调用

es6：
class sunbai {
    constructor() {

    }
}

<!-- babel 转化高端语法 match 低端浏览器 -->

所以原型链就是对象找不到的属性，往 proto 上找，再找不到再往上找


继承：

在原有对象的基础上稍作修改，得到一个新对象，并且不影响原有对象

方法1：原型链继承

function Body() {
    this._bloodVolum = 100;
    this._attackVolum = 500;
}

Body.prototype.attack = function(body) {
    this.volumes._bloodVolum -= body.getAttackVolum() - this._attackVolum;
}

function Monster() {};

Monster.prototype = new Body();
<!-- 子类的 prototype 直接连在父类上 -->
var monster = new Monster();
var monster2 = new Monster();

monster._bloodVolum = 999  // 是因为这个语句是给monster这个实例上的赋值语句，在本身挂了个_bloodVolum,所以不用去 Body上找了，所以这种方式的修改在实例间不联动，而对象时联动是因为 对象有两个属性操作符 => monster.Volumes._bloodVolum,浏览器看到这句话的时候会想拿_bloodVolum，先要拿到【monster.Volumes】，monster.Volumes在monster上没有，所以需要去Monster上找，而monster._bloodVolum，要想拿到_bloodVolum，需要找到monster，还没到Monster那一步呢,属性屏蔽规则

<!-- 这样的话，改Monster1，Monster2也会改(这种情况只限于属性是对象的时候)，这种情况是不可接受的 -->

<!-- 属性没有受影响 -->

Monster.prototype.attack = function(body) {
    this.volumes._bloodVolum -= 1;
}


方法2：原型链 + 构造函数 继承

function Body() {
    this._bloodVolume = 1000;
    this._attackVolum = 500;
}
Body.protoType.attack = function(body) {
    this._bloodVolume -= body.getAttackVolume() - this._defenseVolume;
}

function Monster() {
    Body.call(this);
    <!-- 此时 Monster 上就会复刻 Body 上的所有属性，属性的冒充 -->
};

Monster.prototype = new Body();

var monster = new Monster();

monster

方法3: 寄生组合继承（Object.create）

Object.create做了什么

1、创建了一个对象
2、把传的第一个参数挂在对象的proto上
3、第二个参数merge到创建的新对象里
{age: {value: 2}}
4、





