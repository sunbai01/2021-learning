// 一个简单的promise
//Promise 接收一个回调函数，回调函数需要传两个方法：resolve, reject
let promise = new Promise((resolve, reject) => {
    // resolve控制then什么时候执行
    setTimeout(()=> {
        console.log('resolve');
        resolve(111)
    }, 3000);
})
.then(function(res) {
    console.log('res', res);
})

// 知识点:promise里面是同步的，只有then是异步的
--------------------------------------------------------

// 如何手写一个promise
(function(global) {
    // 定义一个promise的类
    function Promise(processor) {
        // 会在创建的时候执行一下processor
        // 定义一个状态为pending，pending的时候不执行任何函数
        this._status = 'pending';

        processor(
            // resolve 函数，如果resolve被包在setTimeout里的话，then就会先执行，回调先挂上去，resolve 执行时执行回调，逻辑通
            // 但如果resolve 没包延时，先执行的话，会报错，因为此时 then 里面的 onFulFilled 还没挂上去，无法执行 this.onFulFilled
            res => {
                this._status = 'fulfilled';
                this._resolve(res);
            },
            // reject 函数
            () => {
                this._status = 'rejected';
            }
        );
    }
    Promise.prototype = {
        // 用于链式调用
        _taskCallback: function(value, processor, next) {
            // 上一个函数的返回值是下一个 then 的接收值
            var preResult = onFullfilled(this.currentValue);
            nextResolve(preResult);
        },
        // 这个promise起码有个 then 方法
        // 如果resolve了，执行then里面的方法
        then: function(onFulFilled) {
            // 记一下参数
            this.onFulFilled = onFulFilled;
            var nextResolve = null;
            var nextReject = null;
            // then 里面返回需要是一个 promise
            // 外面怎么调用  Promise 里的 resolve，不提供Promise.resolve 这种形式
            // 为了可以一个resolve两个then
            this.next = new Promise((resolve, reject) => {
                nextResolve = resolve;
                nextReject = reject;
            });

            // 调试方法1
            // this.next.name = 'sunbai';
            // 调试方法2
            // window.nextResolve = nextResolve;

            // 如果先执行了resolve函数的话
            if (this._status === 'fulfilled') {
                onFulFilled(this.currentValue)
            }
            return this.next;
        },
        // 私有函数
        _resolve: function _resolve(res){
            this._status = 'fulfilled';
            this.currentValue = res;
            // 这样会防止报错，挂了就执行，没挂就到 then 里面执行
            if (this.onFulFilled) {
                // 这样的意思是执行一下 then 函数里的回调，也就是 then 函数
                this.onFulFilled(this.currentValue);
            }
        }
    };

    // 基本的构造做完了，接下来要实现一下整个过程 1:13 - 1:53
    global.Promise = Promise;
})(window);