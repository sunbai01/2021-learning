// bfs （broad） 广度优先遍历

// 题干：有一个迷宫，有很多1障碍，0是可走的路，王子是（2），公主是（3），求王子救出公主最少需要多少步，
// 并将路线输出出来


// 思路：
// 1、影分身，每到达一个点，上下左右都试一下（涟漪走开），看有没有碰到公主，碰到就赢了
// 而不是像dfs一样一路走到黑，再退回来。
const getMaze = () => {
    return [
        [2, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 3, 0]
    ];
};

const createPoint = ({x, y, stepCount}) => {
    return {x, y, stepCount};
}

const judge = (maze, {x, y}) => {
    return (x>=0)&& (y >=0) 
        && (x< maze.length) && (y< maze[0].length)
        && (maze[x][y] !== 1);
}

const run = (maze, maru) => {

    const maruPoint = maru;
    let stepsQueue = [maruPoint];

    const steps = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ];

    while (stepsQueue.length) {
        const curPoint = stepsQueue.shift();
        for (let i in steps )  {
            const [vectorX, vectorY] = step[i];
            const newX = curPoint.x + vectorX;
            const newY = curPoint.y + vectorY;
            if (judge(maze, {x: newX, y: newY})) {

                const newPoint = createPoint({ 
                    x: newX,
                    y: newY,
                    stepCount: curPoint.stepCount + 1,
                    prevPoint: curPoint
                });

                if (maze[newPoint.x][newPoint.y] == 3) {
                    console.log('找到公主啦')
                }
                maze[newPoint.x, newPoint.y] = 1;
                stepsQueue.push(newPoint);
            }
        }
    }
};

const start = () => {
   let maze = getMaze();
   run(maze, { x : 0, y: 0});
};

start();

