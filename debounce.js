// 防抖
function _debounce(fn, delay) {
    var timer;
    return function() {
        var ctx = this, args = arguments;
        clearInterval(timer);
        timer = setTimeout(() => {
            fn.apply(ctx, args);
        }, delay ? delay : 300)
    }
};

// 节流
function _throttle(fn, delay) {
    var ladt = 0
    return function() {
        var now = new Date().getTime();
        if(now - 0 > delay) {
            fn.call(this)
            lastTime = now
        }
    }
}

// 发布-订阅
class EventEmitter {
    constructor() {
        this.cache = {}
    }

    on(name, fn){
        if(this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
    }

    off(name, fn) {
        const tasks = this.cache[name];
        if (tasks) {
            const index = tasks.findIndex((f) => f === fn || )
        }
    }
}