为什么选择网易？

第一：离家近
第二：有道这块业务是我感兴趣的，利用大数据技术提供移动互联网应用的子公司，有道云笔记类似于编辑器吧，toB的平台
很好奇这块能力怎么做的，不用于基于业务的B端平台， 这种技术应该每个公司都需要，具备一定的通用性


字节面试题: 1、红灯三秒亮一次，绿灯两秒亮一次，黄灯一秒亮一次；如何让三个灯不断交替重复亮灯？

function red() {
    console.log("red");
}
function green() {
    console.log("green");
}
function yellow() {
    console.log("yellow");
}

const sleep = (time, fn) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            fn(); //哪个灯亮
            resolve();
        }, time);
    });
};

var xunhuan = () = > {
    Promise.resolve()
}
.then(() => {
    sleep(3000, red())
})
.then(() => {
    sleep(3000, green())
})
.then(() => {
    sleep(3000, yellow())
})
.then(() => {
    xunhuan()
})


开课吧/猿辅导面试题：
1、如何封装一个ajax？
1、new XMLHttpRequest()
2、open('get', '1.txt', true)
3、send()
4、onReadystateChange，判断status
5、close

2、get请求的缓存？

将参数里的cache设置为false。它的工作原理是在GET请求参数中附加时间戳"_={timestamp}"

微软面试题：
rxjs 和 promise有点像，明确和了解几个概念：响应式编程，流，观察者模式，迭代器模式

蓝湖面试题：
1、如何设计防止超时引起的并发

2、守护进程如何做到的？

a. forever模块
    forever start xx.js
b. 使用PM2
    npm install pm2 -g
    forever start xx.js
c.StrongLoop-PM
    npm install -g strongloop
    cd <my-app>
    slc start
