// node 将json文件放在浏览器展现，做了个接口，这个接口供小程序调
var http = require('http');
var fs = require('fs');

var app = http.createServer((req, res) =>  {
    fs.readFile(__dirname + '/list/mock.json', 'utf-8', function(err, content) {
        console.log('err', err, content);
        res.write(content);
        res.end();
    });
});

app.listen(9000);