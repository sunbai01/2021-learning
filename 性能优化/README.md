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







