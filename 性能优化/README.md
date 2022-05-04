- 指标：
1) 白屏时间
    用户从点击开始，到能看到页面有展现内容为止
    老式统计方法：记录一个time (+new Data()) - serverGetTime，放在head下面，body上面
    新式统计方法：
        performance.timing.domLoading - performance.timing.navigationStart

2) 首屏时间
定义：用户看到了设备首屏幕，全部渲染完成（包括图片的下载）（首屏中最后一个元素闪动）
统计方式：
    老式：监听页面所有的 image 的 onLoad(), 查看image Dom，offset.top + height < clientHeight,
    所有image中，在首屏且最晚回来的时间点，就是首屏时间点。
    var imageLoadTimes = []
    onload = onloadtime = () => {
        imageLoadTimes.push()
        <!-- 遍历找最大值 -->
    }
    新式：
    performance.timing.xxx（页面所有的资源加载时间） - performance.timing.navigationStart

3) 用户可操作时间
    定义：用户可以进行事件输入的事件（inputactive）
    统计方式：
        老式：DomReady - 
        新式：
        window.performance.timing.domInteractive - performance.timing.navigationStart
4) 页面总下载(不太影响核心指标)
    onload - serverGetTime

5）80分位，90分位

80% 个人，网站平均访问时间为 1s，但是总是有快有慢，0.1s，0.2s，1s，3s，提升尾部用户的指标，不一定会对
平均时长有所优化
也就是 第80%个用户

- 字段解析

performance.timing.navigationStart // 跳转开始

performance.timing.domainlookupend/start // 域名查询ip地址结束时间

performance.timing.connectstart/end // tcp握手链接时间

performance.timing.secureConnectionStart // https

performance.timing.requestStart //  request 时间

performance.timing.responseStart/end //  response 时间

performance.timing.domLoading // 浏览器开始解析dom

- 性能优化思路

正着查：看代码捋

倒着查：录屏查事件

<link href="" rel="stylesheet">

link 写在head下body上，link会阻塞下面dom的渲染吗？
会阻塞渲染，css没加载，全局都炸

原理：head中有css 标签，会加载完后再向下执行，挺着不执行，防止二次重绘
所以会有一些css转内联这种手段去转内联

浏览器会等script代码执行，所以还是会导致白屏（因为怕js里改dom），这个时候应该怎么办呢？
强行转化为异步，可以改这种情况

一个站点下，有并行发6个请求的限制：
<!-- 1、打散域名的方式：多域名访问同一个资源  -->

big-pipe（性能优化的王牌）: 
<!-- 抛出合作的底牌，减少白屏时间 -->
Transfer-Encoding: chunked
// 如果header有这个字段，表明这个请求是分波加载的，分波渲染
// big-pipe的原理：借助了http协议 + 分片
// 逆置，先加载死的数据，然后叠加个性化的数据









todo： script 的 defer or async 他俩的区别





