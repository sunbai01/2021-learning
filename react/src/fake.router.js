/**
 * @author
 * @file 
 */

import React, {Component} from 'React';

const createLocation = (path, state) => {
    // 写 router 一定要解析 path
    let pathInfo = /^([^\?]*?)(\?[^#]*?)?(\#.*?)?$/.exec(path);
    return {
        pathname: pathInfo[1],
        search: pathInfo[2],
        hash: pathInfo[3],
        state
    }
}

let eventEmitter = {
    listener: [],
    notify(...args) {
        this.listener.forEach(listener => {
            listener(...args)
        })
    },
    listen(func) {
        this.listener.push(func);
    }
};

const getDOMLocation = state => {
    let window$location = window.location;
    let pathname = window.location.pathname;
    let search = window.location.search;
    let hash = window.location.hash;
    return createLocation(`${pathname}${search}${hash}`, state)
}

// 监听路由的工具函数
const createBrowerHistory = () => {

    const listen = (func) => {
        eventEmitter.listen(func);
    }

    const DOMListen = (func) => {
        window.addEventListener('popState', func);
    };

    DOMListen(event => {
        // 有location变化的时候
        let action = 'POP';
        let location = getDOMLocation(event.state);
        // 推动界面变化，设置新的状态
        setState({
            action,
            location
        })
    })

    const push = (path, state) => {
        let location = createLocation(path, state);
        window.history.pushState({
            state
        }, null, path);

        let action = 'PUSH';
        // 推动界面变化，设置新的状态
        setState({
            action,
            location
        })
    };

    const setState = (nextState) => {
        // 催动界面，变化，设置新状态
        Object.assign(history, nextState);
        // 触发外部的监听器
        eventEmitter.notify();
    };

    return {
        push,
        listen
    };
}

// 作用： 包了一下开发者app
export class BrowserRouter extends Component {
    constructor() {

    }
    render() {

    }
}



export class Switch extends Component {

}

// 架构思路：1、fragment包裹传入的component 或者 fragment，this.context 和 this.props
// 2、做一个 matcher 函数，比较 pathname 和 location 是否相等，相等则动态渲染组件

export class Route extends Component {
     
}

// 加了个 a 标签 而已
export class Link extends Component {
    static contextType = RouterContext;

    render() {
        this.context
        return 
    }

    navigateTo() {

    }
     
}

