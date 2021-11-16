<template>
     <div class="item agriculture">
        农业！查猪价
    </div>
    <div>
        <label>输入地区：</label>
        <input type="text" v-on:input="onInput"/>
        <span>地区为: {{area}}</span>
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
        this.$watch('area', area => {
            this.queryPigPrice(area)
        });
    },
    methods: {
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