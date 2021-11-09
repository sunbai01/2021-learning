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
            <div v-if="item.type === singlePic" class="item single-pic">
                <div class="content">
                    <span>
                        {{item.data.title}}
                    </span>
                </div>
                <img v-bind:src="item.data.imgList[0]" />
            </div>
            <div v-else class="item multile-pic">
                <div class="content">
                    <span>
                        {{item.data.title}}
                    </span>
                </div>
            </div>
            </div class="image-list">
                <img
                    v-for="imagePath in item.data.imageList"
                    v-bind:src="imagePath"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // 小程序框架, 不这么做的原因是会改引用
    // data: {
    //     // 如果是这样的话
    //     person: 'sunbai'
    // },
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
