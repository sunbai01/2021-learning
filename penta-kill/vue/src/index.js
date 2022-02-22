/*
* @file 入口文件
* @autor sunbai
*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueRouter from './vue-fake-router';
import Main from './pages/main.vue';
import {utils} from './utils';
import echarts from 'echarts';

Vue.use('VueRouter');
// 配置文件
const routes = [
    {
        path: '/page',
        component: Main
    },
    {
        path: '/setting',
        component: Setting
    },
    {
        // :id这种匹配符意思是后面可以加id，不要写死
        path: '/detail/:id',
        component: Detail,
        // id可以当做props传给Detail组件，这样的设计方便路由间传递数据
        props: true,
        // 这样定义好之后，需要到Detail组件里去定义一次 router-view 组件
        children: [
            {
                path: 'video',
                component: Video
            },
            {
                path: 'text',
                component: Text
            }
        ]
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

// 不好的调试方法：
// window.router = router;


// 用函数描述元素的创建过程
// vue 和 css 会被编译成js，一切都是js
var component = {
    render: function(createElement) {
        return createElement('div', {
            attrs: [''],
            props: []
        }, [
            createElement('h1', 'wenzi')
        ])
    }
}

// const vm = new Vue({
//     el: '#app',
//     render: h => h(Main)
// });

const THERESHOLD = 100;
const vm = new Vue({

    el: '#app',

    router,

    // render: h => h(component)
    render(createElement) {
        return createElement('router-view');
    }
});

// 在业务方法中用的时候需要将 window.location.hash = '#/setting' 改为
// this.$router.push('/setting'); (跳转API)
// 或者整体用 <router-link to="/page"> 组件

// 一个东西全局用：
// 1、mixin的方式：mixin的时候需要知道挂在哪，挂在method上还是data上得整一下子
Vue.mixin({
    methods: utils
})
// 2、插件的方式，插件对象中必须包含一个install方法，才可以用
Vue.use('插件名/plugin');
let plugin = {
    install: Vue => {
        Vue.mixin({
            // data() {
            //     // 隐式
            //     return {
            //         // 下划线开头的不能当变量名
            //         throttle: createThrottle(3000)
            //     }
            // },

            // 试着做一个指令到echarts的转换，
            // 就比如Vue的框架如果想引入小型库（echarts/jQuery），需要用指令去触碰dom
            create() {
                // 残存的函数，这也是一个通用的方法
                // 为了防止所有组件的create里都引入这个函数，需要做特判
                if (typeof(this.onReachBottom) === 'function') {
                    let throttle = createThrottle(3000);
                    window.addEventListen('scroll', () => {
                        const offsetHeight = document.documentElement.offsetHeight;
                        const screenHeight = window.screen.height;
                        const scrollY = window.scrollY;
                        const gap = offsetHeight - screenHeight - scrollY;
                        if (gap < THERESHOLD) {
                            // console.log('excute');
                            this.throttle(()=> {
                                this.onReachBottom && this.onReachBottom();
                            });
                        }
                    })
                }
            },
            methods: {
                utils
            }
        }),

        Vue.component('echarts', {
            render(createElement) {
                return createElement(
                    'div',
                    {   
                        attrs: {
                            id: this.randomId
                        },
                        style: {
                            width: '100px',
                            height: '100px'
                        },
                        directives: [
                            {
                                name: 'echarts'
                            }
                        ]
                    }
                )
            },

            mounted() {
                // 这样写就能画出一个图表，这里注意要写宽高；
                // const echartsHandler = echarts.init(this.$el);
                var options = {

                };
                this.echartsHandler.setOption(options);
            },

            computed: {
                randomId(){
                    return 'echarts-' + Math.floor(Math.random() * 10);
                }
            },
            
            methods: {
                // 这样没操作dom，但实时上却操作了dom的形成
                revieverEchartsHandler(handler) {
                    this.echartsHandler = handler;
                }
            }
        }),
        // 以上或者可以用vue指令（里面包含很多生命周期），使用：在组件中加 v-echarts 
        Vue.directive('echarts', {
            inserted(el, binding, vnode) {
                const echartsHandler = echarts.init(el);
                vnode.context.revieverEchartsHandler && vnode.context.revieverEchartsHandler(echartsHandler);
            }
        })
    }
}
