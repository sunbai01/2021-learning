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
                    const type = item.type.replace(/^\w/, code => code.toUpperCase())
                    const itemComponent = components[type];
                    return <itemComponent />
                }}
            />
        </div>)
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);
