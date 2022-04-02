/**
* @file entry file
* @author sunbai
*/

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './list';

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
        return (<div className="container">
            <List
                datasource ={ this.state.list }
                renderItem = {item => {
                    console.log('item', item);
                    return <div>111</div>
                }}
            />
        </div>)
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);
