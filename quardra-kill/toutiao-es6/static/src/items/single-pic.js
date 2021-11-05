/**
* @file 单图的组件
* @author sunbai
*/


// 规范：命名文件的时候不要做驼峰，要使用中划线的形式
// 类头字母要大写
import Component from './component' 
export default class SinglePic extends Component{
    constructor(props) {
        // super 指代的就是父类的 constructor 
        super(props);
    }

    render() {
        return '<div>我是单图</div>';
    }
}
