import React, {Component} from 'React';
import store from '../../store';

export default class Agriculture extends Component{
    render() {
        return (<div>
            农业
            <button onClick="this.supplement">增加猪价项</button>
            <Echarts></Echarts>
        </div>)
    }

    supplement() {
        store.dispatch({
            type: 'PUSH_LIST',
            data: [{
                data: {
                    articleUrl: 'xxx',
                    id: 'xxx'
                }
            }]
        })
    }
}