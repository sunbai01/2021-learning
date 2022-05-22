// 创建 socket 服务器
const net = require('net');
let clients = 0;

const server = net.createServer(client => {
    clients++;
    let clientId = clients;
    console.log('client connect::', clientId);

    client.on('end', ()=>{
        // 输出 clientId
        console.log('clientId', clientId);
    })
    client.write('welcome client' +  clientId + '\r\n');
    client.pipe(client); // 把客户端数据返回给客户端
});

server.listen(8000, ()=> {
    console.log('server started on port 8000');
});

// net服务：一个server 和多个client