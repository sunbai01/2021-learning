// node 将json文件放在浏览器展现，做了个接口，这个接口供小程序调
var http = require('http');
var fs = require('fs');
var path = require('path');
const rootDir = `xxxx`;

var app = http.createServer((req, res) =>  {

    // 写一个静态文件
    const filePath = path.resolve(rootDir, req.url);
    console.log('ppp', filePath)
    fs.readFile(filePath, utf-8, (err, content)=> {
        if(err) {
            res.write();
            res.end();
            return;
        }
        res.write(content);
        res.end();
    })
    // 登录模式
    // if(/login/.test(req.url)){
    //     const code = /code=([^&]*)/.exec(req.url)[1];
    //     console.log('code', code);
    //     http.get(
    //         `http://api.weixin.qq.com/sns/jscode2session?appid=32412&secret=rwerweufhwe`,
    //         function (resHandler) {
    //             console.log(resHandler);
    //             var str = '';
    //             resHandler.on('data', (chunk)=> {
    //                 str += chunk;
    //             }),
    //             resHandler.on('end', function () {
    //                 res.write(JSON.stringify({
    //                     errMsg: JSON.stringify(code)
    //                 }));
    //                 res.end();
    //             });
    //         }
    //     );
    //     fs.readFile(__dirname + '/list/mock.json', 'utf-8', function(err, content) {
    //         console.log('err', err, content);
    //         res.write(content);
    //         res.end();
    //     });
    // }
    // else {
    //     const result = {

    //     }
    // }
});

app.listen(9000);