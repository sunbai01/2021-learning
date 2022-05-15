// 1，5，8，4
// 1，3，5，0
// 5，3，8，0

const fs = require('fs');


// 下面这种方式不适用于data.txt数据量比较大的情况
// fs.readFile('./data.txt', 'utf-8', (err, data)=> {
//     const sort = data => {
//         console.log('data', data.sort((a,b) => {
//             return a-b;
//         }));
//     };

//     sort(JSON.parse('[' + data + ']'));
// });

// ------------------修改分割线------------------

var readerStream = fs.createReadStream('./data.txt');

let data = '';
let topFive = [];
var chunkStr = '';
fs.stat('./data.txt', function(err, stats) {
    const counts = stats.size / 10000000;
    const counted = 0;

    readerStream.on('data', function(chunk) {
        const arr = [].concat(topFive);
        const topFive = arr.push(chunk).sort().slice(0, 5);
        arr = null;
        chunkStr += chunk;
        if (chunkStr > 10000000) {
            var writeStream = fs.createWriteStream('./data-' + counted + '.txt');
            const arr = JSON.parse('[' + chunkStr + ']').sort((a,b) => {
                a-b;
            })
            writeStream.write(JSON.stringify(arr));
            writeStream.end();
            chunkStr = '';
        }
        counted++;
    });

    var winnerSet = [];
    var sortedList = [];
    readerStream.on('end', function() {
        // 此处拥有counts个排好序的文件
        for (var i = 0; i<= counted; i++) {
            var readerStream = fs.createReadStream('./data-' + i + '.txt');
            readerStream.on('data', '100', function(chunk) {
                // 100k作为一个分割符
                winnerSet.push(JSON.parse('[' + chunk + ']'));
            });
            // 全部都为0的时候就一直循环
            while (!winnerSet.any(set => {
                set.length === 0;
            })) {
                for(var i = 0;i < counted; i++) {
                    winnerSet.find();
                }
                sortedList.push(innerSet[i].shift());
            }
        }
        
    });
}) 