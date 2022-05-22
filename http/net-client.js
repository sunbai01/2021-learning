// 创建 socket 客户端
const net = require('net');

const client = net.connect(8000);

client.on('data', data => {
    console.log(data.toString());
})

client.on('end', () => {
    console.log('client disconnected');
})
