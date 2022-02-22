/*
* @file fake router文件
* @autor sunbai
*/

export default class VueRouter {

    constructor(option) {
        this.routes = option.routes;
        this.history = new History();
        this.history.listen(newHash => {
            console.log('vm', this.vm);
            this.vm.$forceUpdate();
            console.log('newHash', newHash);
        })
    }

    push(path) {
        this.history.push(path);
    }
    // 静态方法
    static install(Vue, options) {

        Vue.mixin({
            created() {
                // 证明外部传入了这个实例
                if (this.$options.router) {
                    // 如果有router，就把自己挂在传入的router身上（为什么要挂，把我给router，方便他急事的时候要用），反向的依赖注入
                    this.$options.router.vm = this ;
                    this.$router  = this.$options.router;
                }
                else {
                    this.$router = this.$parent.$router;
                }
            }
        })

        // 这个组件
        Vue.component('router-view', {
            // 加这个才能刷新
            functional: true,
            // 创建一个div
            render(createElement, {props, children, parent}) {
                console.log('$parent', this.$parent.$options);
                const router = this.$parent.$options.router;
                const currentHash = location.hash;
                const currentRoute = matcher(currentHash, router.routes);
                // router.history.listen(newHash => {
                //     console.log('newHash', newHash);
                // })
                // 拿到当前路径下应该对应的compontent
                return createElement(currentRoute.component);
            }
        });

        Vue.component('router-link', {
            render(createElement) {
                return createElement('span', {
                    on: {
                        click: this.clicking
                    }
                }, this.$slots.default);
            },

            methods: {
                clicking() {
                    window.history.back();
                    // this.$parent.$route.back();
                }
            }
        })
    }
}

const matcher = (path, routesConfig) => {
    return   routesConfig.find(route => {
        // 拿掉 # 值,获取正确路由
        return route.path === currentHash.replace(/^#/, '');
    });
}

class History {
    // 做一个工具函数
    listen(callback) {
        // 监听 hash 改变 刷 view
        window.addEventListener('hashchange', () => {
            callback && callback(window.location.hash);
        });
    }

    push(path) {
        window.location.hash = '#' + path;
    }
}