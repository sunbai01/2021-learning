- 手写 promise

promise.js

- 代理和反射

实现一个代理：

Object.defineProperty();

var obj = {};
Object.defineProperty(obj, 'name', {
    get() {
        console.log('getting');
        return '111';
    }
});

obj.name // 111

Vue如何做到修改数据后，视图就变化了的

let target = {
    isTarget: 1;
};

let proxy = new Proxy(target, {
    get() {
        return '111';
    };
    set(tarpTarget, key, value, receiver) {
        console.log('修改方法', tarpTarget, key, value, receiver);
        tarpTarget[key] = value;
    }
})

proxy.msg = 'sunbai';
console.log('proxy.msg', proxy.msg);
console.log('target.msg', target.msg);

proxy做的事情是拦截一个对象，做钩子


- async、await

async 表明后面的程序可能有异步过程,可以当做promise用

await 只能在 async 后面函数里使用，且只会阻塞async函数进程，不会阻塞主进程

- async

<!-- 这是一个 async 的函数 -->

function request(){
    setTimeout(function(){
        console.log('request');
    }, 1000);
}

async function a() {
    request();
    console.log('aaa');
}
a(); // aaa request

<!-- 需求：1秒钟之后打印一个111 -->
(new Promise((resolve, reject) => {
    setTimeout(function(){
        console.log('request');
        resolve(111);
    }, 1000);
}))
    .then(res => {
        console.log('res', res); // request 111
    })

<!-- 同样的代码用async会怎样写呢 -->

function request(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve('111');
        }, 1000);
    });
}

async function a() {
    // await 相当于是同步的写法
    var res = await request();
    console.log('res', res);
    console.log('aaa');
}
a();

console.log('end')

<!-- 输出 end 111 aaa -->

1、async有什么用呢？ 直接当做promise用，只是写法不同，功能是一样的
async function a() {
    return 222;
}

a().then(res => {
    console.log('res', res);
})

2、使用 await 的同步写法

async function a() {
    try{
        var taobaoRes = await request('http://xxxx');
        var tmallRes = await request('http://xxxx');
    }
    catch(e) {
        
    }
    console.log('res', res);
    return 222;
}

a();

// 为什么await作为错误捕获确实是利器呢？

request('http')
    .then(res => {
        return request('http')
            .catch()
            console.log('res', res);
    })
    .then(function() {

    })

3、promise.then 是异步的，本身不是异步的，这里很重要

new Promise ((resolve, reject) => {
    console.log('111')
    resolve();
})
    .then (function() {
        console.log('222')
    })
console.log('333')

// 111 333 222


- 拿fetch举例，怎么改造一个Promise对象呢?

非http协议的url（file://xxx），需要起一个端口

fetch('xxx')
    .then(res => {
        console.log('res:::', res);
    })

=>

async function a() {
    var taobaoRes = await fetch('xxx')
    .then(res => res.json())
    console.log('taobaoRes', taobaoRes);
    return 222;
}

a();

- 装饰器 decorator(设计模式)

function memoize(target, key, descriptor){

}

class Foo {
    @memoize;
    getFooById(id) {
        // 
    }
}

有什么用呢？
解决多处使用相同代码的问题

语法：首先装饰器是一个函数


【代理，async、await，装饰器，手写 promise】
