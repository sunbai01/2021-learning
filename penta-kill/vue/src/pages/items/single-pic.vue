<template>
    <div class="item single-pic" v-on:click="onChange">
        <div class="content">
            <span>
                {{title}}
            </span>
            <span>创作时间为：{{articleDate}}</span>
        </div>
        <img v-bind:src="imageUrl" />
    </div>
</template>

<script>
export default {
    props: [title, imgList],
    // 将props 或者data里的值拿出来算一下
    computed: {
        // 不依赖其他数据，依赖分析
        articleDate() {
            return new Date() + this.title;
        },
        // 依赖了其他数据
        imageUrl() {
            return this.imgList[0];
        }
    },
    create() {

    },
    methods: {
        onChange() {
            this.title = 'sss';
        },
        // 直接用的话，会随时变，不缓存，想想，这样其实不利于我们点击事件 + 写时间
        shuchuData() {
            return new Date();
        }
    }
}
</script>
