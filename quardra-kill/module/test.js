// require模式是一个单例

// var a = require('./a');
// var b = require('./b');

// console.log('a:', a.getName());

// AMD 模式是这样的
// define 函数
define(
    // 'module name', 
    // ['yilai1', 'yilai2'], 
    function(m1, m2) {
        return module;
    }
    // => 
    // function(m1, m2) {
    //     class items {

    //     }

    //     return items;
    // }
)