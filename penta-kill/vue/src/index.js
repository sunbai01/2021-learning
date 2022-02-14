/*
* @file 入口文件
* @autor sunbai
*/

import Vue from 'vue';
import Main from './pages/main.vue';
import * as utils from './utils';

// 用函数描述元素的创建过程
var component = {
    render: function(createElement) {
        return createElement('div', {
            attrs: [''],
            props: []
        }, [
            createElement('h1', 'wenzi')
        ])
    }
}

// const vm = new Vue({
//     el: '#app',
//     render: h => h(Main)
// });

const vm = new Vue({
    el: '#app',
    render: h => h(component)
});
