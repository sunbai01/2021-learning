// 小程序核心逻辑层 - sunbai
(function (global) {
        let wx = {};
        // url、id和iframe的对应对象
        let classMap = {};
        // Logic = 逻辑
        class Logic {

            init() {
                this.uniqIndex=0;
                // 获取首页路径
                const firstPageUri = window.appJson.pages[0];
                // 打开首页
                this.navigateTo(firstPageUri);
            }

            // 生成一个唯一函数
            _generateUniqId() {
                return 'id' + this.uniqIndex++;
            }

            // 封装一个navigateTo：每次调用推进来一个iframe
            navigateTo(uri) {
                const PageClass = classMap[uri];
                const page = new PageClass(this._generateUniqId(), uri);
            }
        }

        // 针对每个页面都有 page, 且传进来的是个对象类，让其继承我们的 PageBase
        class PageBase {
    
            constructor(id, uri) {
                this.uri = uri;
                this.id = id;
                // 创建页面的时候创建一个视图层
                this._initData();
                // 基类调 render 方法，render方法里createView
                this._render()
                    // render完再给自己的视图层postMessage
                    .then(() => {
                        global.__bridge.postMessage(this.id, {
                            type: 'initSet',
                            data: this.data
                        });
                    })
            }

            // 私有函数
            _initData() {
                this.data = JSON.parse(JSON.stringify(this.data || {}));
            }

            _render() {
                // uri写死比较好
                global.__bridge.createView(this.id, this.uri)
                    .then(frame => {
                        this.$el = frame;
                    });
            }

            setData() {
                // 再发一次消息，视图层再收一次
                global.__bridge.postMessage(this.id, {
                    type: 'setData',
                    data: this.data
                });
            }
        }

        const createPageClass = options => {
            class Page extends PageBase {
                constructor(...args) {
                    super(...args);
                }
            }
            Object.assign(Page.prototype, options);
            return Page;
        }

        // 这里对应开发者写的Page({}), 这里的page方便调用
        const Page = (uri, options) => {
            classMap[uri] = createPageClass(options);
        }

        // 通过调用这两个执行上述所有逻辑
        global.logic = new Logic();
        global.Page = Page;
    }
)(window);