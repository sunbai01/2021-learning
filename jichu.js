// 数组

var arr = [1,2,3,4,5];
var newArr = [];
// 接收一个回调函数
arr.map((value, index) => {
    console.log('值：索引:::', value, index);
    newArr.push(value);
});
console.log('newArr', newArr);

// 上面的map可以改成forEach，但是map建议最好用 return 的方式，不要用push
// foreach多用于简简单单的遍历，和for() 对比，有什么是for循环可以做到但foreach做不到的呢：终止，foreach停不了
// 用foreach和for循环可以做find的poliyfile



// 这样比较简单，如果数组里是对象，不建议用map，会改原数组，这种时候用foreach更合适一点

// filter 返回会强转成布尔值 ，true返回符合条件的数组，false返回一个空数组，返回值不是结果，外面新定义的变量是

var arr = [1, 2 ,3 ,4 ,5];
var result = arr.filter((item, index) => {
    return item > 3;
})
console.log(result); // [4, 5]

// find （找到某一项），从前往后找，返回第一次符合条件的结果，可替代find的方法有filter[0]、indexOf
var arr = [1,2 ,3 ,4 ,5];
var index = arr.indexOf(3);
var result = arr.slice(index, index +1);
console.log(result)
// 以上可以找到并输出3

// 分析一下find和filter[0]的性能优化
遍历一次n长度的数组，算法复杂度是O(n)

// every 和 some的适用场景

// 如果有return，外面有变量承接

// every 是不是每一项都满足条件

// some 是不是有一项满足条件

// 使用的比较少, 建议用find

// for...of
// for (value of arr) {
//     console.log('value', value);
// }

// reduce

var arr = [1,2,'3',4,5,6,'7',8,9];
// 第一个参数：上一次的返回值; 第二个参数：当前项;
let result = arr.reduce((preResult, curItem) => {
    return  preResult + curItem
})

console.log('result', result);

// 统计不同元素出现的次数

var arr = [1,2,3,4,5,6,1,4,9]

let result = arr.reduce(
    (pre, cur) => {
        pre[cur] = pre[cur] === undefined ? 0 : pre[cur] + 1;
        return pre
    },{})

console.log('result:::', result);

// 对象
// for in

for(let i in obj) {
    console.log(i) // 输出key obj[i]
}

// Object.keys()  输出一个对象的key，形式是一个数组

// Object.value()

找出一个对象中所有大于2的项

var obj = {
    a: 1,
    b: 2
}

Object.values(obj).filter(
    item => item > 2
);

// 一般连用的几率大一些