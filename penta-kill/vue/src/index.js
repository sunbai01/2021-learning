/*
* @file 入口文件
* @autor sunbai
*/

import Vue from 'vue';
import Main from './pages/main.vue';

const vm = new Vue({
    el: '#app',
    render: h => h(Main)
});