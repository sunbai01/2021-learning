// 手写一个promise
(function(global) {
    function Promise(processor){
        this._status = 'pending';

        processor(
            function resolve(){
                this._status = 'fulfilled';
            },
            function reject(){
                this._status = 'rejected';
            }
        );
    }
    Promise.prototype = {
        then: function() {

        }
    };
    // 基本的构造做完了，接下来要实现一下整个过程
    global.Promise = Promise;
})(window);