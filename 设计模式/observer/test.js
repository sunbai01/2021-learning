// 观察者模式（发布订阅模式）：pub-sub模式
// touch observer

const Observer = require('./observer');

const registerLog = observer => {
    const sendLog = ({name, type}) => {
        console.log('log log');
    }

    observer.addSub(['add', 'refresh'], params => {
        // 主要的逻辑
        sendLog({...params});
    }, {
        detectPrevious: true
    })
    .addSub('add', params => {
        // other
    });
};

const refreshListen = observer => {
    observer.addSub('add', params => {
        // refresh()
    });
}

const tabAction = (observer) => {
    // 发布，告诉所有订阅者，add事件发生了
    observer.notify('add', {
        sum: 5
    });
    // 点击加号跳转页面 + 首屏刷新
    // window.locaton.href = 'xxx';
    // var mylog = log;
    // afterAdd(mylog);
    // refresh('');
}

const start = () => {
    let observer = new Observer();
    // 用户发生了点击
    tabAction(observer);
    registerLog(observer);
    // observer.notify('refresh');
};

start();