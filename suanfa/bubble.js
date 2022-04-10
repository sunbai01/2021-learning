// 冒泡排序 (37分钟)
// 概念：相邻元素两两比较，解释这种例子都会把最大的放在最左边
// 图解：每循环一次，最大的数在最右边，然后缩小循环范围，和堆排序一样的
// 时间复杂度:O(n方); 空间复杂度：O(1)
// 程序：
// 首先讲下循环,可以有以下两种
// let loopCount = mock.length;
// while(loopCount -- ){

// }

// or

// for (let i=mock.length; i>0; i++) {

// }

// 数据源
const mock = [5, 7, 9, 4, 10, 21, 3, 6];
console.log('mock:::', mock);
// 将数组构造成一个对象型
// '[10, 5, 7, 9, 4, 21, 3, 6]'.replace(/(\d+)/g, '{value: $1}');

// ab互换
const swap = (arr, from, to) => {
    // 交换纯数据方法1、
    // let temp = arr[from];
    // arr[from] = arr[to];
    // arr[to] = temp;
    // 方法2、es6的解构
    [arr[from], arr[to]] = [arr[to], arr[from]];
    // 方法3、
    // arr[from] = arr[from] + arr[to];
    // arr[to] = arr[from] - arr[to];
    // arr[from]= arr[from] - arr[to];
}

// 排序
const sort = arr => {
    // 首先外部一定循环length轮
    for (let i = mock.length; i > 0; i--) {
        // 8length 0-7
        for(let j = 0; j < i-1; j++){
            // if(arr[i].value > arr[j+1].value) {
            if(arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
    return arr;
}

const res = sort(mock);

console.log('res:::', res);
