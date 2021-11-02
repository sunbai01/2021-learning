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