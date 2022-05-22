# 运维部署
## 线上监控


### 服务监控的五大指标

#### 1、CPU

cpu负载：
cpu使用率：

nodejs 的线程和进程：

进程是线程的容器，

守护进程: 

socket  和 websocket 没啥关系

- socket

概念：网络上的两个程序通过一个双向的通讯实现数据交换，这个连接的一端称为一个套接字（socket），
因此建立网络通讯连接至少需要一对端口号，socket的本质是对 tcp/ip 协议栈的封装，他提供了一个udp 或者 tcp 编程的接口
并不是另一种协议，通过 socket 你可以使用 tcp/ip协议。

api：

socket: 用于创建一个通信的节点；
domain(AF_INET\AF_INET6)
type(SOCK_STREAM\SOCK_DGRAM)
protocol(IPPROTO_TCP/UDP/SCTP)
<!-- int socket(int domain，int type， int protocol) -->

bind:
将生成的文件描述符绑定到需要监听的端口

listen:

connect:

accept:

close:

创建socket套接字有什么用呢？

1、http 或者 websocket 等应用层都是通过 socket 进行通信的；
2、


- node.js 模块

node中的模块，从语言的两种角度来说，存在javascript 和 c++ 两部分，通过 process.binding 来建立关系

openSSL 是基本的密码库，包括 MD5 和 SHA1 和 RSA 等加密算法，构成了node模块中的crypto

cares 模块用于DNS的解析

libuv实现跨平台的异步编程

http_parser 用于http的解析







