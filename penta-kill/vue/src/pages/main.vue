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
            <single-pic v-bind:item="item" v-if="item.type === 'singlePic'"></single-pic>
            <multiplePic v-bind="item.data" v-else-if="item.type === 'multiplePic'"></multiplePic>
            <agriculture v-else v-bind="item.data"></agriculture>
        </div>
    </div>
</template>

<script>
import multiplePic from './items/multiple-pic.vue';
import singlePic from './items/single-pic.vue';
import Agriculture from './items/agriculture.vue';


export default {
  components: { singlePic },
    // 小程序框架, 不这么做的原因是会改引用
    // data: {
    //     // 如果是这样的话
    //     person: 'sunbai'
    // },
    // components 声明的方式
    components: [
        multiplePic,
        singlePic,
        Agriculture
    ],
    data() {
        return {
            person: 'sunbai',
            list: []
        };
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
        }
    }
}
</script>
SinglePic