const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
    res.setHeader('foo', 'test');
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    res.write('<!doctype>');
    res.end(`<html></html>`)
});

server.listen(3000, () => {
    console.log('server is on', server.address());
    var req = http.request({ host: '127.0.0.1', port: 3000});
    req.on('response', res => {
        res.on('data', chunk => {
            console.log('data from server', chunk.toString());
        })
        res.on('end', ()=> {
            server.close();
        });
    })
    req.end();
});
