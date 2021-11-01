// 手写一个promise
(function(global) {
    function Promise(processor){
        this._status = 'pending';

        processor(
            res => {
                this._status = 'fulfilled';
                this._resolve(res);
            },
            () => {
                this._status = 'rejected';
            }
        );
    }
    Promise.prototype = {
        then: function(onFulFilled) {
            this.onFulFilled = onFulFilled;
            if (this._status === 'fulfilled') {
                onFullfilled(this.currentValue);
            }
        },
        _resolve: function _resolve(res){
            this._status = 'fulfilled';
            this.currentValue = res;
            if (this.onFulFilled) {
                this.onFulFilled(this.currentValue);
            }
        }
    };

    // 基本的构造做完了，接下来要实现一下整个过程 1:13 - 1:53
    global.Promise = Promise;
})(window);