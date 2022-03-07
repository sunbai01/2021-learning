H5的渲染，转场，底层能力都不如原生

hybird和h5的区别

h5 网断了是绝对刷不出来的，但app可以

js-bridge：通过这个用h5页面调动NA能力


客户端下载前端产出包，每次用户点击的时候打开产出包中的一页，最后前端渲染回退给用户，会有一套管理平台去管理前端产出包
去做一些上线的功能

远程、离线、（预加载）远程

业界解决方案：融合解决方案（小程序，公众号）

jsonp 的本质就是在script上挂一段url

api封装

(function(global) {
        var id = 0;
        const invoking = (params) => {
            const cbName = 'cb1';

            window[cbName] = (args) => {
                params.success && params.success(args);
                window[cbName] = null;
            };

            global.webkit.messageHandler.callNative.postMessage({
                params: JSON.stringify(params),
                cb: cbName
            });
        }

        const api = {
            getLocation(params) {
                invoking(params)
            },
            getUserInfo(params) {
                invoking(params)
            }),
            getAppIdSync() {
                return invokingSync()
            }
        };

        global.my = api;
})(this);

my.getLocation({
    success:(args) => {
        console.log('args:::', args);
    }
});

有多少种解决方案让hybrid运行在native上（js如何去调客户端）
z正向
1、ios：
iframe、prompt
// context、messageHandler

2、Android
iframe、prompt
// jsbridge
f反向：

1、ios：
evaluateJavaScript

2、Android
webView.loadUrl('jscode')

大前端 - 融合方向

第一次打开白屏（不涉及缓存）：拆成两个zip包，第一次打开下载首页zip，后面那个包在后台偷偷下载

懒加载：下载包和加载是不一样的，加载核心js

react
- lazy：动态加载

有diff算法罩着你，用户就看不出来

数据持久化：存到本地

玩ssr

