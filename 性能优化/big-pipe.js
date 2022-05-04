const { fs } = require('fs');
var http = require('http');

var backend = () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            const contentJSON = JSON.stringify([
                {title: 'aaa'}
            ]);
            resolve(contentJSON);
        }, 3000)
    })
};

var fileTask = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', function (err, content) {
            resolve(content);
        });
    });
}

var app = http.createServer(function(res, req) {
    res.write('.a{color: #0f0}');
    res.end();
});

app.listen(9001);

