import React, {Component} from 'React';

export default class List extends Component{
    render() {
        // 组件里直接用props
        console.log('props', this.props);
        const {dataSource = [], renderItem} = this.props;
        return (<div>
            {
                dataSource.map(renderItem)
            }
        </div>)
    }
}