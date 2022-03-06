// 小程序核心逻辑层 - sunbai
(function (global) {
        let wx = {};
        let classMap = {};

        class Logic {

            init() {
                this.uniqIndex=0;
                const firstPageUri = window.appJson.pages[0];
                this.navigateTo(firstPageUri);
            }

            // 生成一个唯一函数
            _generateUniqId() {
                return 'id' + this.uniqIndex++;
            }

            navigateTo(uri) {
                const PageClass = classMap[uri];
                const page = new PageClass(id, uri);
                page.init();

            }
        }

        // 针对每个页面都有page, 且传进来的是个类
        class PageBase {
            constructor(id, uri) {
                this.uri = uri;
                this.id = id;
                this._initData();
                this._render()
                .then(() => {
                    global.__bridge.postMessage(this.id, {
                        type: 'initSet',
                        data: this.data
                    });

                    

                })
                    
            }

            _initData() {
                this.data = JSON.parse(JSON.stringify(this.data || {}));
            }
            
            _render() {
                // uri写死比较好
                global.__bridge.createView(this.id, './view.html')
                    .then(frame => {
                        this.$el = frame;
                    });
            }

            setData() {

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

        const Page = (uri, options) => {
            classMap[uri] = createPageClass(options);
        }

        global.logic = new Logic();
        global.Page = Page;
    }
)(window);