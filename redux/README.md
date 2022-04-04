# redux

<!-- 状态机的库 -->

<!-- 观察者模式（发布订阅器） -->

<!-- 解除监听 -->


<!-- 设计顶层的架构 store （list、alltab、tab） -->


provider 传函数，如果函数被下掉了呢，你永远不知道错在哪里

react - redux 其实就是一种订阅 subscribe + set/getState 的封装

Provider 本来就是连接器，所以是适配 react redux 的

<!-- middle ware （中间件）=》 enhancer -->
<!-- 自己写一套中间件 -->

<!-- thunk 是 react redux的中间件 -->

thunk做的事情是 将开发者的 dispatch 交由开发者的 function 去处理，然后再传给 react 的 dispatch

