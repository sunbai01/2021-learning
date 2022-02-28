// 完成了一个插件，这个插件有个命令是叫publish
// 本地创建，本地npm install 看看有什么效果

var fs = require('fsExtra');
module.export = api => {
    api.configureWebpack(webpackConfig => {
        webpackConfig.mode = 'development'
    });
    api.registerCommand('publish', args => {
        // 拷贝 dist 文件夹下的东西到 online 文件夹下
        const webpackConfig = api.resolveWebpackConfig();
        console.log('haha', webpackConfig);
        const distDir = webpackConfig.output.path;
        fs.copy(
            distDir,
            '路径'
        )
    });
}

// qa部署到机器上的情况，不如用这种方式做一个命令封装一下

// Object.defineProperty();
