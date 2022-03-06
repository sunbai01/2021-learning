class Bridge {
    // 创建了一个小 iframe
    createView(id, src) {
        return new Promise(resolve => {
            let frame = document.createElement('iframe');
            frame.src = src;
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
    postMessage(id, params){
        const target = document.querySelector('#' + id);
        target.contentWindow.postMessage(params);
    }

    onMessage(callback) {
        console.log('onmessage!!!');
        window.addEventListener('message', function(event) {
            console.log('recive - message', event);
            callback && callback();
        });
    }
}

window._bridge = new Bridge();