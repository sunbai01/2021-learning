<template>
     <div class="item agriculture">
        农业！查猪价
    </div>
    <div>
        <label>输入地区：</label>
        <input type="text" v-on:input="onInput"/>
        <span>地区为: {{area}}</span>
        <button v-on:click="changePosition"></button>
        <span>猪价为: {{price | addCount}}</span>
    </div>
</template>

<script>

const THERESHOLD = 50;
// 去抖：debounce
const createDebounce = (delay = 1000) => {
    let timmer = null;
    return function debounce(fn) {
        // 打断
        clearTimeout(timmer);
        // 重新计时
        timmer = setTimeout(() => {
            fn && fn();
        }, delay);
    }; 
}


export default {
    props: [],
    data() {
        return {
            area: '北京',
            price: '暂无',
            debounce: createDebounce(3000)
        };
    },
    create() {
        this.createDebounce();
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
    // 语法和场景，用来format
    filters: {
        addCount(price) {
            return price + '元'
        }
    },
    methods: {
        // 思想记一下，语法背一下就行
        changePosition() {
            this.area = "深圳";
        },
        onInput(e) {
            const debounce = this.debounce;
            this.debounce(()=>{
                this.area = e.data;
            }, 5000);
        },
        queryPigPrice(area) {
            fetch('/price?area=', +area)
                .then(res => {
                    res.json()
                })
                .then(
                    priceRes => {
                        console.log('priceRes', priceRes.infos[0].price);
                        // 如果我们的价格是要 加个 中文固定元素，最好的方式是不要写在业务逻辑中，要写在业务视图中，但如果这种重复的元素很多，最好的方式是要
                        // 用 filters
                        this.price = priceRes.infos[0].price;
                    }
                )
        }
    }
}
</script>