## 模块化

- commonJS

// 常见方式隔离命名

// function a() {
//     var name = 'yuanxin'
// }

// function b() {
//     var name = 'wangyang'
// }


module.exports = {
    name: 1
};
// 或者
exports.name = 1;

// 因为相当于内核帮你声明了这么一个语句
// var exports = module.exports = {name: 1};

// 但是不能写成

exports = {
    name: 1
};
// 这样的话相当于 module.exports 没有动，所以导不出去

- AMD

更适合于异步加载

导出：
var mmm = {}
module.exports = mmm;

引用：
var newObj = require('./a.js')

// 此时 newObj == mmm

- CMD

toString 匹配 require 个数，然后预先加载

- es6 Module

导出：
const a = {}
export a;

引入：
import {a} from a;

* 注意这里名字要相同

=>

导出：
export default {
    name: 1
};

引入：
import b from './a';

* 这里名字可以重新起

如果 export default 要和 require 连用的话,引入的时候要这么写，

// es6 抛出
export.default {
    name: 11
}

export const age = 12;

// es5 调用
var a = require('./a');


知识点：

// es5 抛出
module.exports.default = {

}

// es6 调用
import a from a;
---------------------------------------------

私有变量：Symbol做私有变量

var _symbol = Symbol();
this[_symbol] = 'xxx';

- 浏览器模型

DOM 事件模型 和 事件流

阻止冒泡行为：stopPropagation() 和 stopImmediatePropagation()【少用】
或者 remove 插件里绑定的click 事件

阻止默认行为:（使用场景：可以使原有点击出弹窗没反应，然后覆盖一个自己的上去）
e.preventDefault();

先选中这个元素然后 $0 ,控制台会出现这个元素
- 

sessionStorage localStorage cookie 之间

localStorage 比较能存，其实最主要的区别不是存储大小

cookie 会被携带到服务端，可以存放服务端和前端共同维护的信息，负责前后端的来回交互

localStorage 是持久化的本地存储，sessionStorage会话级别的存储（要求在同一浏览器窗口才能互相读取）

什么时候存 cookie 什么时候存localstorge

http是无状态的协议，

toC做兼容
toB不用做兼容












