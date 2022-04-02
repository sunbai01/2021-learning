react 高级（头条 react系少一些，vue多一些）


# 高阶组件

## hoc：传一个组件进去，返回一个新组件

如果有一天的一个请求，在每个组价的外层div上包裹一个新增class属性，我们会怎么做，我们会给这个组件包一层hoc
另一种方式是我们使用 decrator 的形式做这件事情（组件之间共用一套外包装）
@itemfy @tagfy => 这个是从上往下执行的，在元素外面的外面依次包装
=> 等价于 tagfy(itemfy(component))

应用场景：hoverClass

总结：

在做系统架构的时候，用这种设计模式: hoc + 装饰器 => 套小壳子和一些复用方法

## fragments

使用

<React.Fragment>
代替div的根元素
</React.Fragment>


## context(完成跨越式的传变量)

主组件传递数据到孙子组件

使用：
1、在 tab-context 中 定义 React.createContext
2、在主组件中使用tab-context.provider value props 想传输的数据
3、在下下层组件中直接this.context 访问数据

## propTypes

## hook

函数式组件
useState

// setPrice 类似于 setState
const [price, setPrice] = useState(0);

为什么定义成数组不定义成对象呢？因为对象的话，他不知道key要叫什么，所以做了一个后置的状态，把权利放给你，你爱叫什么叫什么


useEffect 每次组件在渲染的时候都会被调用
可以返回一个函数

useEffect(() => {
    // 监听
    console.log('start')

    return () => {
        // 取消监听
        console.log('done')
    }
})


使用场景：渲染的时候监听点什么，销毁的时候去取消监听
## 异步组件（react侧叫他代码分割）

用法：原组件套 React.lazy, 引入的地方套 suspense 接受 fallback 一个 props
场景：+ 跳转到 setting 页面
