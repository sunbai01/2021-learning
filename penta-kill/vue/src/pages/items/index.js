/**
* @file 所有 item 的统一出口
* @author sunbai
*/


// 以后加组件在这里就可以
// 通过反射的模式就可以少写组件声明
// 动态组件
export {default as MultiplePic} from './multiple-pic.vue';
export {default as SinglePic} from './single-pic.vue';
// 不用全局引，这里做一个按需引入
// export {default as Agriculture} from './agriculture.vue';