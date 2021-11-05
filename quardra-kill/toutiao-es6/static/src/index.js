/**
 * @file 管理全局的入口文件 - Manager
 * @author sunbai
 */


// console.log('hello toutiao');
import * as utils from './utils';
// webpack 自身支持 treeShaking
import components from './items';

// 编译的时候会找item文件夹下的index，没有的话找main
class Manager {
    constructor($ele){
        this.$ele = $ele;
    }

    init() {
        this.appendData();
        this.detectLoadData();
    }

    appendData() {
        // console.log('utils:::', utils.parseUrl);
        // this.$ele.innerHTML = 'sunbai'
        utils.request({
            url: './list',

        })
            .then(res => {
                // console.log('res', res);
                const items = res.data;
                console.log('components', components);
                items.forEach((item) => {
                    // 小写转成大写，正则总是记不住
                    const componentName = item.type.replace(/^\w/g, w => w.toUpperCase());
                    // 反射出来一个组件
                    const Component = component[componentName];
                    const currentComponent = new Component(item);
                    const element = currentComponent.constructoElement();
                    this.$container.append(element);
                })
                // 跑通父类了
                // items.forEach((item) => {
                //     // const component = new Component();
                //     // const componentElement = component.componentElement();
                //     // this.$ele.appendChild(componentElement);
                // });
            });
    }

    detectLoadData() {
        window.onScroll = () => {
            // 文档高度
            const offsetHeight = document.documentElement.offsetHeight;
            // 屏幕高度
            const screenHeight = window.screen.height;
            // 屏幕距离文档顶的高度
            const scrollY = window.scrollY;
            const gap = offsetHeight - (screenHeight + scrollY);
            console.log('gap', gap);
            if (gap < 50) {
                // 加载一屏数据
                this.appendData();
            }
        }
    }

    static getInstance($ele) {
        return new Manager($ele);
    }
}

const $container = document.getElementById('container');
const manager = Manager.getInstance($container);

manager.init();