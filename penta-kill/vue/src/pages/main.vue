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
            <component
                v-bind:is="item.type | formatComponentName"
                v-bind:item="item"
            >
            </component>
        </div>
    </div>
</template>

<script>
import * as components from './items';
import {createThrottle} from './items/utils'

const THERESHOLD = 100;


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
    components: convertModule2obj(components),

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

    filters: {
        formatComponentName(componentName) {
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
        
        window.scroll = () => {
            const offsetHeight = document.documentElement.offsetHeight;
            const screenHeight = window.screen.height;
            const scrollY = window.scrollY;
            const gap = offsetHeight - screenHeight - scrollY;
            if (gap < THERESHOLD) {
                this.throttle(()=> {
                    console.log('加载');
                });
            }
        }
    },

    methods: {
        changeName() {
            console.log('emit!!!!');
            this.person = 'xiaowa'
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