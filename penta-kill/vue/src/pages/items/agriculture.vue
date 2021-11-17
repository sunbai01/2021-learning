<template>
     <div class="item agriculture">
        农业！查猪价
    </div>
    <div>
        <label>输入地区：</label>
        <input type="text" v-on:input="onInput"/>
        <span>地区为: {{area}}</span>
        <button v-on:click="changePosition"></button>
        <span>猪价为: {{price}}</span>
    </div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            area: '北京',
            price: '暂无'  
        };
    },
    create() {
        // 既然地区和价格是联动的，不用在每个地方都用queryPigPrice，业务中不要这么做，做到只与数据强相关
        // 是下面watch关键字的api形式，api的形式可以动态watch
        this.$watch('area', area => {
            this.queryPigPrice(area)
        });
    },
    // 监听一个属性
    watch: {
        area(newArea, area) {
            this.queryPigPrice(newArea);
        }
    },
    methods: {
        // 思想记一下，语法背一下就行
        changePosition() {
            this.area = "深圳";
        },
        onInput(e) {
            this.area = e.data;
        },
        queryPigPrice(area) {
            fetch('/price?area=', +area)
                .then(res => {
                    res.json()
                })
                .then(
                    priceRes => {
                        console.log('priceRes', priceRes);
                    }
                )
        }
    }
}
</script>