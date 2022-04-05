# hoc 面试题

写map，不要写 if else，这样扩展性强

# react-router

有一版大更新，从 3.0 更新到了 4.0，4.0弱化了路由配置/api的概念，希望能够写成组件嵌套的形式

最近国庆，很多外国网站访问的也不是很舒畅，很多vpn也不能用了。

## 使用：

改path：
path='/path/path/:id' (写了id，才会被match中的params解析)
this.props.history.push('/detail/' + 'xxxx')

拿参数：

this.props.match.params.id

# withRouter

# route.js

1、先看自己配不配
2、再渲染，只要匹配到的都渲染
3、如何只渲染一个呢，switch
4、场景：配404页面，在组件路由最后加一个 route组件，前面没匹配到的，漏下去就好了（注重用户体验），做spa的时候

# react 实战

1、react-router
react-router的基本架构

react-router-native
react-router-dom
还是 react 的思想先进，vue 要记的东西太多了。
todo：switch

2、骨架屏

dangerouslySetInnerHTML = {{_html: html}}

将页面再写一份灰底的,生成一个离线字符串

1、用这个插件 page-skeleton-webpack-plugin
2、webpack里配置：

插件里做了什么呢。访问了下url，把html拿出来，拿他自己的js去生成模板字符串

大量时间去维护，就得不偿失了。

3、ssr的入门

server send render

css-modules-require-hook 处理js中的css

# 面试题

react dom 的 viercul dom 真的比dom 快吗，diff算法的复杂度是多少，是怎么实现的呢

vdom 不一定比 dom 快，在同等级别的情况下，用 react 可能 比 不用的性能差，没有原生快

框架是帮写前端写的不咋地的人规范起来。

todo：
fiber
diff算法


