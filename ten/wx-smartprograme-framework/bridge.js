// 小程序核心逻辑层 - sunbai
class Bridge {
    // 创建了一个小 iframe
    createView(id) {
        return new Promise(resolve => {
            let frame = document.createElement('iframe');
            frame.src = './view.html';
            frame.id = id;
            frame.className = 'view';
            frame.onload = () => resolve(frame);
            document.body.appendChild(frame)
        });
    }

    /**
     * 
     * @param {String} [id] - 视图的唯一标识
     * @param {Object} [params] - 需要set的数据
     */
    // 发消息
    postMessage(id, params){
        const target = document.querySelector('#' + id);
        target.contentWindow.postMessage(params);
    }

    // 收消息
    onMessage(callback) {
        console.log('onmessage!!!');
        window.addEventListener('message', function(event) {
            console.log('recive - message', event);
            callback && callback(event.data);
        });
    }
}

window._bridge = new Bridge();