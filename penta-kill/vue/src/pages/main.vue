<template>
    <!-- <div>
        main
    </div> -->
    <!-- 改数据界面跟着动 -->
    <!-- 这个指令做的是将函数和事件绑在一起 -->
    <!-- <div 
        v-on:click="changeName" -->
        <!-- title: "{{num}}" -->
        <!-- 不允许表达式直接放在属性里的可以这么写(语法层面，记一下就可以) -->
        <!-- v-bind:title="num"
    >
        {{person}}
    </div> -->
    <!-- <img v-bind:src="" /> -->

    <div>
        <!-- 具名插槽 -->
        <tab>
            <template v-slot:header>
                <span>推荐</span>
                <span>热点</span>
                <span>农业</span>
            </template>
            <!-- 说下异步组件 -->
            
            <!-- 动态组件 -->
            <template v-slot:content>
                <!-- 由此可见指令里面不用{{}} -->
                <div v-for="(item, key) in list">
                    <!-- 单图多图交叉循环 -->
                    <!-- 这里可以用中划线来代替帕斯卡（比驼峰多了个首字母大写）的形式 -->
                    <!-- v-bind:item="item" 可以写成 v-bind="item.data", 消除难看的数据结构, 子组件就是imageList + title -->

                    <!-- <single-pic v-bind:item="item" v-if="item.type === 'singlePic'"></single-pic> -->
                    <!-- 动态组件写法，只有is后面跟的内容是不一样的 -->
                    <!-- <component is="single-pic"></component> -->
                    <!-- <multiplePic v-bind="item.data" v-else-if="item.type === 'multiplePic'"></multiplePic>
                    <agriculture v-else v-bind="item.data"></agriculture> -->

                    <!-- 我们使用动态组件来进行重构压缩 -->
                    <!-- 动态组件的定义：根据is的值决定哪个组件来渲染，components只是占位,is后面的值可以是变量 -->
                    <component
                        v-bind:is="item.type | formatComponentName"
                        v-bind:item="item"
                    >
                    </component>
                </div>
            </template>
        </tab>
    </div>
</template>

<script>
import * as components from './items';
import tab from './items/tab.vue';
import {createThrottle} from './items/utils';

// 转换时候用
const convertModule2obj = moduleObj => {
    let result = {};
    for (let moduleName in moduleObj) {
        result[moduleName] = moduleObj[moduleName];
    }
    return result;
}

console.log(convertModule2obj(components));

export default {
  components: { singlePic },
    // 小程序框架, 不这么做的原因是会改引用
    // data: {
    //     // 如果是这样的话
    //     person: 'sunbai'
    // },
    // components 声明的方式

    // 外部按需引入的promise方式，这样方便做预加载
    // function idle() {
    //     let promise = import('../pages/items/agriculture');
    // }
    // idle();

    components: {
        ...convertModule2obj(components),
        tab,
        // 规定格式，返回的必须是一个对象,这里的import也是一个promise，
        // 这里的import 必须是一个方法，要不然就会自执行，起不到动态加载的效果了
        agriculture:() => ({
            component: import('../pages/items/agriculture')
        })

        // 这样也可以写在外面，作为一个promise
        .then(res => {
            console.log(res);
            return res;
        })
    },

    beforeMount() {
        this.createThrottle();
    },

    data() {
        return {
            person: 'sunbai',
            list: [],
            throttle: createThrottle(3000)
        };
    },
    // convert 
    filters: {
        formatComponentName(componentName) {
            // 开头的第一个字符转换成大写
            return componentName.replace(/^\w/g, name => {
                name.toUpperCase()
            })
        }
    },

    created() {
        fetch('/list')
            .then(res => {
                res.json()
            })
            .then(({data}) => {
                this.list = data;
                console.log('data:::', data);
            });
    },

    methods: {
        changeName() {
            console.log('emit!!!!');
            this.person = 'xiaowa'
        },
        onReachBottom() {
            console.log('加载');
        }
    }
}
</script>

// css 的各种隔离方式
// 加了scoped 会发现这些 dom 元素上加了一串 hash属性， data-v-hash
// webpack 的 css-loader 组件对css modules 的支持最好
<style scoped>
@import './index.css';
.item {

}
</style>

// 开发一个插件和mimin