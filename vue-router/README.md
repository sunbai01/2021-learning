<!-- 18个月技术难度翻一倍 -->

<!-- 架构讲各个模块之间的配合，先画架构图，再写代码 -->

vue-router 和 react-router

<!-- 路由管理器会让系统的复杂度降低，也让代码更干净一点 -->

1、
router-view
router-link

2、
导航守卫（钩子）

3、
hash history 两种模式对vue本质上来讲是没什么区别的

4、写一个vue-router

- 定义一个类
- 类里面有constructor，接收一个参数
- 给这个类上挂install方法
- 这个方法做的事情是创建了一个叫router-view的组件

export default class VueRouter {
    constructor({routes}) {
        this.routes = routes;
        this.history = new History();
        this.history.listen(() => {
            console.log('vmvm', this.vm);
        });
    }

    init(vm) {
        // 将创建的实例传入并记下
        this.vm = vm;
    }
}

VueRouter.install = function (Vue) {
    Vue.component('router-view', {
        render(createElement, {props, children, parent,  data}) {}
    })

    // 对所有的组件都生效
    Vue.mixin({
        beforeCreate() {
            this.$options.router.init(this);
        }
    })
}


接下来我们要实现组件功能，就是写一个 history 来监听 hash 的变化，从而渲染视图

- 定义一个类，可以在上面类的constractor里new这个类并调用其方法
- 类里有一个方法去监听路由
- 当路由变化的时候去执行传入的函数
- 在钩子里记一下当前组件
- 刷新一下组件（$forceUpdate()api, 迫使Vue重新渲染）

class History {
    <!-- 这个函数做的事情是每次路由变化的时候，告诉外面并执行外部传入的函数参数 -->
    listen(callback) {
        window.addEventlistener('hashchange', function() {
            console.log('hash-change', window.location.hash)
            callback && callback(window.location.hash);
        })
    }
}

上面可以重新加载组件了，下面要实现加载哪个组件

- 拿一下 routes 配置
- 我们通过 $option.router 拿到 当前路由
- 拿正则（去掉斜杠和#）比一下
- 实现对应组件，若没匹配到则渲染默认组件

实现上面基本功能后，我们实现一下嵌套路由


