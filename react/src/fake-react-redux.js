/**
 * @author
 * @file Provider 和  connect 源码
 */

import React, {Component} from 'react';

const createContext = () => {
    return React.createContext(null);
}

const ReduxContext = createContext();

export class Provider extends Component{
    render() {
        const store = this.props.store;
        return (<ReduxContext.Provider value={store}>
            {this.props.children}
        </ReduxContext.Provider>);
    }
}

// 第一层返回一个函数

/*
* 连接器方法，接受映射方法，返回HOC
* @params {Function} [mapStateToProps] - 映射store上的state到props
* @params {Function} [mapDispatchToProps] - 映射store上的dispatch到props
* @params {React.Component} [ConnectComponent] - 需要HOC装饰的组件
* @return {React.Component} - 装饰后的方法
*/
export const connect = (mapStateToProps, mapDispatchToProps) => {
    return ConnectComponent => {
        return class extends Component {

            constructor(props) {
                super(props);
                this.state = {
                    store: null
                }
            }

            comoponentDidMount() {
                const store = this.context;
                store.subscribe(() => {
                    console.log()
                });
            }

            static contextType = ReduxContext;

            computeProps(store) {
                const stateProps = mapStateToProps(store.getState());
                const eventProps = mapDispatchToProps((...args) => {
                    store.dispatch(...args);
                });

                return {...stateProps, ...eventProps};
            }

            render() {
                console.log('contextType', this.context);
                const mergedProps = this.computeProps(this.context)
                return (<ConnectComponent {...mergedProps}/>);
            }
        }
    }
};
