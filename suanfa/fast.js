// 快速排序: 1、选一个元素 2、大于放在左边，小于放在右边


// 1、选定一个数字，定义两个空数组
// 2、比他大，比他小的分别push到两个数组里
// 3、这时两个数组还是无序的，接下来还要做的事情是给两个数组按照上面的方法进行排序
// 4、concat两个数组

let fastSort = (arr) => {
    if(arr.length < 1) return arr;
    // 取中间值的下标
    let zhizhen = Math.floor((arr.length -1)/2);
    let val = arr[zhizhen];
    let left = [];
    let right = [];
    // 取到中间值，arr此时变为新数组
    arr.splice(zhizhen, 1);
    arr.forEach(e => {
        e < val ? left.push(e):right.push(e);
    });
    // [1,2,3].concat([4,5], [7,8]) =>  [1, 2, 3, 4, 5, 7, 8]
    return (fastSort(left).concat([val], fastSort(right)));
}

console.log(fastSort([5, 7, 9, 4, 10, 21, 3, 6]))

// 有没有更好的优化方案呢，这个有点浪费空间

const quickSort = (arr, start, end) => {
    // 先写结束条件，再写主逻辑
    if (start >= end) {
        return;
    }
    let startIndex = start;
    let endIndex = end;
    let pivot = arr[start];
    
    while (startIndex < endIndex) {
        while(startIndex < endIndex && arr[endIndex] > pivot) {
            endIndex--;
        }
        if (startIndex < endIndex) {
            arr[startIndex] = arr[endIndex];
            arr[endIndex] = pivot;
            startIndex++;
        }

        while (startIndex < endIndex && arr[startIndex] <= pivot) {
            startIndex++;
        }

        if (startIndex < endIndex) {
            arr[endIndex] = arr[startIndex];
            arr[startIndex] = pivot;
            endIndex--;
        }
    }

    arr[startIndex] = pivot;

    quickSort(arr, start, startIndex - 1 );
    quickSort(arr, startIndex + 1, end);
    return arr;
}

const sort = arr => {
    return quickSort(arr, 0, arr.length - 1);
}
const res = sort([5, 7, 9, 4, 10, 21, 3, 6])
