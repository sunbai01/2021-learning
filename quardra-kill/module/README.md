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

- esModule

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

export.default {
    name: 11
}

export const age = 12;

var a = require('./a');
console.log('aaa:::', a.default, a.age);

