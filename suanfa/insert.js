// 插入排序
// 10，7，4，9，5

// 比如放7，找一个合适的位置插进去

const mockData = [5, 7, 9, 4, 10, 21, 3, 6];

const append = (arr, to, from) => {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
};

const sort = arr => {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < i; j++) {
            if(arr[j] > arr[i]) {
                append(arr, j - 1, i);
                break;
            }
            else if(j === 0) {
                append(arr, j, i);
            }
        }
    }

    return arr;
};

const res = sort(mockData);

console.log('res', res);




