<template>
    <div>
        这是登录页面
        <button v-on:click="login">登录</button>
    </div>
</template>
<script type="text/javascript">
export default {
    methods: {
        login() {
           document.cookie = 'uid=123456';
           this.$router.back();
           console.log('nihao');
        }
    },
    beforeRouteEnter() {
        // console.log('beforeRouteEnter');
    }
}
</script>