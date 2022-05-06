// dfs 深度优先遍历

            1

  2         3       4

5   6

// 遍历结果可能有如下两种
125634（深度）

123456（广度）

// 以上可以具象为

                      document 

    div                  h1              h2
  
  span  a[id=1]         a[id=2]


// 做的事情是遍历一棵树下想要的某一元素节点，用bfs怎么做

// 八皇后问题

// 思路：
// 1、函数体的构造
// 2、判断x，y，斜线方向有没有冲突
    // 2.1 x方向
    // 2.2 y方向
    // 2.3 斜线方向
// 3、这里有一个极限值是说看超不超过8，超过return
// 4、判断情况的话，需要将之前符合情况的棋子再次置为0，然后放置棋子

const getChessboard = (size = 8) => {
    let chessBoard = [];
    for (let i = 0; i < size; i++) {
        chessBoard.push(Array(8).fill(0));
    }

    return chessBoard;
}

const judge = (chessBoard, x, y) => {
    const len = chessBoard.length;
    for (let i = 0; i< len; i++) {
        const rowHasClash = chessBoard[x][i] === 1;
        const colHasClash = chessBoard[i][y] === 1;
        const directions = [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
        ]
        // 四向斜线有没有冲突
        const slashHasClash = directions.some(([xMark, yMark]) => {
            const newX = x + xMark * (i + 1);
            const newY = y + yMark * (i + 1);
            return chessBoard[newX] && chessBoard[newX][newY] === 1;
        })
        if ( rowHasClash || colHasClash || slashHasClash) {
            return false;
        }
    }
    return true;
}

let count = 0;
const drop = (chessBoard, depth, maxDepth) => {
    if(depth > maxDepth) {
        count++;
        return;
    }
    for (let i = 0; i < maxDepth; i++ ) {
        if(judge(chessBoard,depth, i)) {
            chessBoard[depth][i] = 1;
            drop(chessBoard, depth + 1, maxDepth);
            chessBoard[depth][i] = 0;
        }
    }
}

const start = () => {
    const chessboard = getChessboard(3);
    drop(chessboard, 0, chessboard.length);
    console.log('count：：：', count);
}

start();



