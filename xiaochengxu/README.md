# 小程序工程化

## 改造接口

Monkey patch

const originRequest = wx.request;
wx.request = () => {
    return Promise();
}

wx.request({
    url: 'xx',
    success() {

    },
    fail() {

    }
})

=> 改造成以下promise的形式

api.request({
    url:'xxx'
})
.then()


怎么做？

var api = new Proxy(
    wx,
    {
        get(target, key) {
            <!-- wx[request] -->
            if(typeof target[key] === 'function') {
                return function(...args){
                    return new Promise((resolve, reject) => {
                        target[key](...args)
                    })    
                }            
            }
        }
    }
)

<!-- axios
fetch
jquery -->

<!-- UE 一般会给二倍图或者三倍图 -->

webpack 和 gulp 是编译工具

cli 打开微信开发者工具

gulp + 小程序

H5，潮流趋势是往小程序上走

小程序做单测

处理器

taro/mpx

less/sass