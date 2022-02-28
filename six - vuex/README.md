# john resig jquery 的创始人创建的是 节流 还是 去抖 呢


<!-- Vuex详解 -->
<!-- 大前端时代 -->

<!-- 数据流管理 -->

<!-- 为什么要vuex？？，vuex是必须要用吗 -->
<!-- 如果不需要用redux，就不要用redux/mbox， 因为需要框架加载-->

<!-- 作用：全局通信，数据持久化，复用数据 -->

<!-- Axjs，最有代表意义的数据流 -->

<!-- 怎样让落地页打开更快，做ssr（server side rendering） -->

<!-- 如果不用ssr，怎么做页面的快速渲染 -->
<!-- 做一些组件，请求数据，塞数据，页面渲染 -->

<!-- sp 单页页面 -->

<!-- 最 low 的面试官会怎么用？ -->
<!-- 不问语法：会就会，不会就不会，问不出这个人的能力是怎么样的？ -->

<!-- 没几个用ts用的好的，ts最多用个深层校验 -->

生产环境
（why）为什么是很重要的，（how）不重要


<!-- 多人协作，更好的管理数据流，为了组织架构更合理清晰 -->

<!-- 重点关注用Vuex有什么收获 -->

<!-- devtools（本来也是个前端），整个数据流都会被追踪 -->

<!-- 一、简单的状态管理起步如何使用 -->
<!-- 二、flux的核心eventBus（这个东西的数据和逻辑永远是单向流动的），这个东西是通过pub/sub模式来做的 -->

<!-- 不同的框架会做不同的处理 -->

<!-- action -> store -> view -->

接下来进入正题：
数据层：（Vuex管理）
<!-- action mucation state -->
<!-- 重点解释这三个名词 -->

dispatch - action（同步/异步）

mutation - state

todo：为什么要有 mutation，不直接 action 去改变 state？？

视图层:(Vue Components)


<!-- 信断点还是信console -->

<!-- vue和react的区别是，vue怎么写都不会太差，react会写出参差不齐的东西 -->

store 里包含state（数据，类似data）和mucation（怎么改变数据的逻辑，类似方法）

e.g.注意这个例子，我们要是这么全局定义了的话，用的时候需要在每个组件里都写那么多的store.state前缀 而且还要import，会很麻烦，这个时候
vue就会做全局store在根组件的注入来解决import的问题，这样就可以让我们子组件以 this 的方式访问 ，我们使用mapstate来解决相同前缀（this.$store.$state）问题
使用的时候这样使用，import {mapState} from 'vuex';

state 对应 mapState：

action 对应 mapAction

mucation 对应 mapMucation

这些map是用来简化代码的


import vuex from 'vuex'

Vue.use(vuex);

const store = new Vuex.Store({
    // 这里的数据只能读不能改，相当于只能通过调用 mucations 里的 increment 来修改;
    state: {
        count: 0
    },
    mucations: {
        increment(state) {
            state.count++
        }
    },
    getters: {

    },
    actions: {

    }
})



如上例子的用法：
<!-- mutation 使用的时候是这样
读取方法
store.commit(increment);  放在某个回调函数中
读取数据
(store.state.count)  放在view 中 --> 


<!--重点： 设计普通框架，普通的类，怎么在js当中设置一个只读属性 -->


<!-- 能在数据层处理的事情，尽量不要放到视图层 -->

<!-- 删除冗余代码，这是第一眼让别人发现low的地方 -->

<!-- getters -->

getters 对象是什么？ 相当于 vue 里的 computed

<!-- 传一大堆参数好，还是传一个对象参数好 -->

todo：getters 和 actions 那块需要再听一听

setimeout ajax 也是异步的

<!-- promise 再强调一遍字面意思：将来要发生但是还没发生的事情 -->

一个设计好不好，需要看他有没有delit，有没有做析构（前端不涉及内存泄露）


eventBus 两条队列：

vue-devtools（成长来说比较重要，数据怎么追踪，时间轴）、trace

