bfs or dfs问题的话

dfs方法论范式：基本点是栈，或者可以称之为递归
const dfs = (待遍历的数，递归深度) => {
    if (递归深度 || 找到了结果) {
        // 终结点！
    }
    
    for(走掉当次的所有可能性) {
        这次的可能性坐实（将走过的路标成1）
        dfs();
        这次完成后，还原，走下一个兄弟节点的可能性
    }
}

使用场景：创建dom树就是一个很明显的dfs



bfs方法论范式：基本点是队列， push shift 一层一层的入队列，进一层的时候将上一层的弹出去
const bfs = () => {
    // 创建一个队列，一个初始的点
    while(判断队列是否为空) {
        从队列头弹出一个当前层要处理的节点

        for(以此节点找出所有可以触达的节点) {
            if(满足条件) {
                创建新的节点
                新节点的某些值（count），要在上一节点的基础上 + 1
                新节点进入队列
                if(碰到可以结束的条件) {
                    结束，输出你的某些值（count）
                    return;
                }
            }
        }

    }
}

tips：
图论，数论，几何学，博弈论
数论：rsa算法 => 欧拉，jcd


```js
题干：手里有n根树枝，n根树枝一样长，且长度为d，闲来无事，将n根树枝随意切了一下，切完之后有m根棍子，
此时石老板忘记了n和d都是多少，求d最小的可能性

// 看不出来的bfs
const search = (sticks, originStickLen, curStickLen, visited) => {

    if (visited.every(item =>{
        item === 1
    })) {
        return true;
    }

    for (let i = 0; len=sticks.length; i<len; i++) {
        visited[i]  = 1
        if (curStickLen + sticks[i] < originStickLen) {
            if(search(sticks, originStickLen, curStickLen + sticks[i], visited)) {
                return true;
            }
            else if( curStickLen + sticks[i] === originStickLen) {
                if(search(sticks, originStickLen, 0, visited)) {
                    return true;
                }
            }

        }
        visited[i]  = 0;
    }
    return false;
}

const start = () => {
    // 4根长度为6的棍  or 1根长度为24的棍，显然 4根长度为6的棍 是我们需要的答案
    let sticks = [5, 2, 1, 5, 2, 1, 5, 2, 1];
    let sum = eval(sticks.join(' + '));

    for (let originStickLen = 0; originStickLen < sum; originStickLen ++) { 
        let visited = Array(sticks.length).fill(0);
        if(search(sticks, originStickLen, 0, visited)){
            console.log('originStickLen:::', originStickLen);
        };
    }
}

start();
```

dfs & bfs 的区别是：
    bfs的传播性质，bfs找到最短路， 是快的
    dfs 遍历所有的情况，产出最优的排列组合，内存消耗上是占有优势的

当遇到一个问题，当需要遍历所有决策情况的时候

