/**
 * @file 管理全局的入口文件 - Manager
 * @author sunbai
 */


// console.log('hello toutiao');
import * as utils from './utils';

// webpack 自身支持 treeShaking，虽然是整个文件被引入，但只编译其中一个函数，不要这个函数用到另一个函数
// 做成分离式的独立函数
// 心中没有规范的话，很容易飘忽

import components from './items';

// 编译的时候会找item文件夹下的index，没有的话找main
class Manager {
    constructor($ele){
        this.$ele = $ele;
    }

    init() {
        this.appendData();
        this.detectReachBottom(()=> {
            // 加载一屏数据
            this.appendData();
            // 日志打到server端让他们去做模型训练;
            this.rizhi();
        });
    }

    getData() {
        // 编译产出
        utils.request({
            url: './list'
        })
            .then(res => {
                localStorage.setItem('newsData', JSON.stringify(res));
                return res;
            })
            .catch(err => {
                // || '{}' => 加层防护
                return JSON.parse(localStorage.getItem('newsData') || '{}');
            })
    }
    // 做缓存的话，封装一个getData
    appendData() {
        // console.log('utils:::', utils.parseUrl);
        // this.$ele.innerHTML = 'sunbai'
        this.getData()
            .then(res => {
                // console.log('res', res);
                const items = res.data;
                console.log('components', components);
                items.forEach((item) => {
                    // 小写转成大写，正则总是记不住，^开头 \w是字母，\W是非字母
                    const componentName = item.type
                        .replace(/^\w/g, w => w.toUpperCase());
                    // 反射出来一个组件
                    const Component = components[componentName];
                    const currentComponent = new Component(item);
                    const element = currentComponent.constructoElement();
                    this.$container.append(element);
                });
                // 跑通父类了
                // items.forEach((item) => {
                //     // const component = new Component();
                //     // const componentElement = component.componentElement();
                //     // this.$ele.appendChild(componentElement);
                // });
            })
            .catch(err => {

            })
    }

    // 依赖注入的方式，只有用你的人才知道触底做了什么
    // 一般会封装一个 noop 函数
    detectReachBottom(callback = () => {}) {
        const THERESHOLD = 50;
        // 实时检测是否加载数据（距离文档底部对屏幕底部的高度）：整个屏幕高度（screenHeight）/整个页面高度（offsetHeight）/页面已划过的高度（scrollTop）
        window.onScroll = () => {
            // 文档高度
            const offsetHeight = document.documentElement.offsetHeight;
            // 屏幕高度
            const screenHeight = window.screen.height;
            // 屏幕距离文档顶的高度
            const scrollY = window.scrollY;
            const gap = offsetHeight - (screenHeight + scrollY);
            console.log('gap', gap);
            if (gap < THERESHOLD) {
                callback();
            }
        }
    }

    // 实例渲染整个页面
    static getInstance($ele) {
        return new Manager($ele);
    }
}

const $container = document.getElementById('container');
const manager = Manager.getInstance($container);

manager.init();