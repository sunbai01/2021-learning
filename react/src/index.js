/**
* @file entry file
* @author sunbai
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './list';
import * as components from './components';
import TabContext from './tab-context';

const SettingCompontent = () => import('./setting');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state= {
            list: []
        },
        this.getList()
            .then(({data}) => {
                // console.log('res', res);
                this.setState({
                    list: data
                })
            })
    }

    getList() {
        return fetch('xxx')
            .then(res => {
                res.json()
            })
    }

    render() {
        console.log('props:::', this.props.list);
        return (<div className="container">
            <TabContext.Provider value={ALL_TAB}>
                <Tab tabs={TABS}></Tab>
                <List
                    datasource ={ this.state.list }
                    renderItem = {item => {
                        console.log('item', item);
                        const type = item.type.replace(/^\w/, code => code.toUpperCase())
                        const itemComponent = components[type];
                        return <itemComponent />
                    }}
                />
            </TabContext.Provider>
        </div>)
    }

    // 监听页面滚动
    reactiveList() {
        console.log('log')
        this.getList();
        window.onscroll = () => {
            this.getList();
        }
    }

    bindscroll() {

    }

    skip() {

    }
}

// 用了 connect， store 上无论发生了什么变化，都会以 props 的方式传递到组件上
// 俗语：组件上拿 store 上数据的方式
// 就是 subscriptbe 后把 state 放到 context 里面
const App = connect(
    function mapStateToProps (state) {
        console.log('lala', state);
        return {

        }
    },
    function mapDispatchToProps (dispatch) {
        return {
            listUpdate: data => {
                dispatch({
                    type: 'push_list',
                    data
                })
            }
        };
    }
)(Main);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
