react 高级（头条 react系少一些，vue多一些）

## context

## 高阶组件

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

## propTypes

## hook

## 异步组件





