// 冒泡排序 37分钟
// 相邻元素两两比较，解释这种例子都会把最大的放在最左边

const mock = [10, 5, 7, 9, 4, 21, 3, 6];
// 将数组转化为数组对象

mock.replace(/(+d)/g, ()=> {

});

const swap = (arr, from, to) => {
    // 交换纯数据方法1、
    // let temp = arr[from];
    // arr[from] = arr[to];
    // arr[to] = temp;
    // 方法2、
    [arr[from], arr[to]] == [arr[to], arr[from]];
    // 方法3、
    // arr[from] = arr[from] + arr[to];
    // arr[to] = arr[from] - arr[to];
    // arr[from]= arr[from] - arr[to];
}

const sort = (arr) => {
    //  start, end
    // 0, mockData.length
    swap(arr, 0, 2);

    for (let i = mockData.length; i > 0; i--) {
        for(let j = 0; j < i-1; j++){
            // if(arr[i].value > arr[j+1].value) {
            if(arr[i] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
    return arr;
}

const res = sort(mock);


console.log('res:::', res);
