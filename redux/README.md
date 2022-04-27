# redux

说下 redux: 用于数据流管理，类似于一种状态机，不只用于react项目，也可以用于vue，不确定要不要用redux就不要用。
react 16增加了hooks

dispatch 其实就是触发一次action，redux调用reducer对action进行特判然后用相应函数去处理页面上的state

为什么要用redux，系统比较大，交互比较多，readucer拆分比较多，
<!-- 做的事情 -->
1、创建了一个store，接收reducer，state两个参数；
2、调用 dispatch 方法（间接的调用了reducer）
3、获取当前的新的 state

核心是createStore这个api，返回值有dispatch和getState这两个方法

简单介绍一下middleware：
首先介绍一下集体打点的问题，也就是需要中途拦截api，这种方式叫monkey,我们不推荐使用，框架的hack方式，因为api名字改变了，整体就不生效了

再介绍一下中间件的官方api：applyMiddleware

看源码有什么用呢？
1、提高程序员素质，使用层拉不开差距，提高核心竞争力 2、性能优化 3、写代码的时候风格会靠近

<!-- 状态机的库 -->

<!-- 观察者模式（发布订阅器） -->

<!-- 解除监听 -->


<!-- 设计顶层的架构 store （list、alltab、tab） -->

# react-redux 

react-redux  其实就是一种订阅 subscribe + set/getState 的封装

<!-- provider 和 connect 是 react-redux 中的概念 -->
## provider 传函数，如果函数被下掉了呢，你永远不知道错在哪里


Provider 本来就是连接器，所以是适配 react redux 的

<!-- middle ware （中间件）=》 enhancer -->
<!-- 自己写一套中间件 -->

<!-- thunk 是 react redux的中间件 -->

thunk做的事情是 将开发者的 dispatch 交由开发者的 function 去处理，然后再传给 react 的 dispatch

## connect =》 高阶组件

子子孙孙都可以拿到 store


子孙组件之间的值怎么传？

父：
<comName name="111">

子：
this.props.name

redux 状态机，用户发生行为要触发页面发生变化的时候，新思路是整个页面用一个状态进行管理，不要组件层层透传。
直接页面刷新一次就可以

如何实现上面这种方式呢？ 
1、入口组件用provider组件包裹，并传入redux上的store数据，
2、connect方法包裹组件，接收两个参数,返回一个函数，可以执行传一个参数 
mapstateProps接收现有的state，进行一层过滤，返回新的props (food: state.food) 
mapdispatchProps接收 函数去改state
3、使用store上的数据，使用store上的dispatch去更改state

提到的名词：rsjx 

<!-- 实现一下react-redux -->
<!-- 实现难点在于怎么让孙子元素都拿到而不是一级一级透传 -->
<!-- createContext这个api -->
```js
const {Provider, connect} = (fuction() {
    const ReduxContext = React.createContext(null);
    const ReduxProvider = ReduxContext.Provider;

    class Provider extends Component {
        constructor(props) {
            super(props);
            const {store} = props;
            this.state = {store};
        }
        render(){
            return <ReactProvider value={this.state}>{
                this.props.children
            }</ReactProvider>
        }
    }
    // connect做的事情是说接收两个参数，然后去 store + getState()（用mapStateToProps包裹） 和 store + dispatch(action) （用mapStateToProps包裹）拿，merge后传给返回的组件
    const connect = (mapStateToProps, mapDispatchToProps) => {
        return (ConnectComponent) => {
            // 获取所有的props，与最终merge过的props
            // 刷新视图，订阅了一下，然后setstate（这个是从react.useState（这个可以直接刷新页面）中拿到的），期间涉及新旧props的对比（ownPropsEquel）。如果没变化，则不要setstate
            // 大数算法
            const {store} = React.useContext(ReduxContext);
            console.log('{store}', store.dispatch);
            return function ConnectComponent (props) {
                return <div onClick={()=>{
                    console.log('dispatch')
                    store.dispatch(
                        type: '',
                        food: 'hanbao'
                    })}}>connect</div>;
                    console.log('dispatch', store.getState());
            }
        }
    }

    return  {
        Provider,
        connect
    }
})();

```
