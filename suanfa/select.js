// 选择排序: 遍历数组，一直选最大值出来
// 复杂度 O(n²)

const mockData = [5, 7, 9, 4, 10, 21, 3, 6];

const sort = arr => {

    let sortedArr = []; 
    for(let i = 0, len = arr.length; i < len; i++) {
        // 最小值
        // let maxValue = Math.pow(2, 64) * -1;
        let maxValue = -Infinity;
        let maxIndex = 0;
        for(let j = 0, len = arr.length; j < len; j++) {
            if (maxValue < arr[j]) {
                maxValue = arr[j];
                maxIndex = j;
            }
        }
        sortedArr.push(maxValue)
        arr[maxIndex] = -Infinity;
    }
};

const res = sort(mockData);

console.log('res', res);