1、为什么要用 proxy 替代 defineProperty（实际上是问 defineProperty 的局限性）？

vue的数据劫持有两个缺点:
1、无法监听通过索引修改数组的值的变化
2、无法监听object也就是对象的值的变化
所以vue2.x中才会有$set属性的存在

proxy是es6中推出的新api，可以弥补以上两个缺点，所以vue3.x版本用proxy替换object.defineproperty

2、简述下redux做了什么？

redux 是一个 修改 state 的模型，且是单向管理数据流的

createStore
reducer：纯函数，指定应用程序的状态如何随操作变化而变化
dispatch




