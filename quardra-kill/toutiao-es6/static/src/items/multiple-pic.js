/**
* @file 多图的组件
* @author sunbai
*/


import Component from './component' 
export default class MultiplePic extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props;
        const imageList = data.imageList.map(imageUrl => {
            return `<img src=${imageUrl} />`;
        }).join('');

        const title = data.title;
        
        var name = 'sunbai';
        // 单引号都没办法换行；所以使用模板字符串的概念
        // return '<div>我是多图</div>';
        return `
            ${data.title}
            <div>
                ${imageList}
            </div>
        `;
    }
}


// 科普什么用 map, 什么时候用 forEach 和 reduce
// forEach：单纯做循环
item = [1,2,3,4]
item.forEach(item => {
    console.log('item', item);
})

// map 【处理完】返回一个【新数组】，