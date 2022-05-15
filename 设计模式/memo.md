设计模式（23种）
1、发布订阅模式
2、单例模式（函数式确实好用）
function() {

}

class Observer {

}

module.exports = xxx;
const a = () => {
    return {

    }
}

3、算两个点之间的最小花费

var node0 = [
    name: 'node1',
    relations: []
]

var node1 = [
    name: 'node2',
    relations: []
]


var node2 = [
    name: 'node3',
    relations: []
]


var node3 = [
    name: 'node4',
    relations: []
]

<!-- bfs + 动态规划 -->

const search = root => {
    let nodeQueue = [root];
    root.value = 0;

    while (nodeQueue.length) {
        const curNode = nodeQueue.shift();
        for (let dis in curNode.relations) {
            if (+dis + curNode.value < curNode[dis].value) {
                curNode.relations[dis].value = (+dis) + curNode.value;
                nodeQueue.push(curNode.relations[dis]);
            }
        }
    }

};

const start = () => {
    const root = node0;
    search(root);
    console.log('4-min::', );
};



redux 和 vuex 有什么区别？

为什么reducer要设计成纯函数？

拆分函数，前置处理，fetch value 提出来放到前面去处理





