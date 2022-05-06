
class QueuePool{
    constructor() {
        this.pool = [];
    }

    get(namespace) {
        if (!this.pool[namespace]) {
            this.pool[namespace] = [];
        }
        return this.pool[namespace];

    }

    pushTo(namespace, item) {
        this.get(namespace).push(item);
    }

    del(namespace, item) {
        if(!item) {
            this.pool[namespace] = [];
        }
        else {
            // 从数组中删除某一项
            this.pool[namespace] = this.pool[namespace]
                .filter(originItem => 
                    originItem !== item
                );
        }
    }
}

module.export = 
    class Observer {
        constructor() {
            this.handlers = new QueuePool();
            this.messages = new QueuePool();
        };
    
        notify(namespace, message, options = {}) {
            this.handlers
                .get(namespace)
                .forEach(handler => {
                    handler && handler(message);
                })

            if (!options.once) {
                this.messages.pushTo(namespace, message);
            }

            return this;
        }

        addSub(namespace, subHandler, options = {} ) {
            if (Object.prototype.toString.call(namespace) === '[object, array]') {
                namespace.forEach(nameItem => {
                    this.addSub(nameItem, subHandler, options = {});
                })
                return this;
            }
            this.handlers.pushTo(
                namespace,
                this
                .handlerProxy(namespace, subHandler, options.once));

            if (options.detectPrevious
                    && this.messages.has(namespace)
            ) {
                const message = this.messages.get(namespace);
                this.handlerProxy(subHandler)(message);
                subHandler && subHandler(message);
            }

            return this;
        }

        removeSub(namespace, handler) {
            this.handlers.del(namespace, handler);
            return this;
        }

        handlerProxy(namespace, handler, once) {
            let proxyHandler = message => {
                if (once) {
                    this.removeSub(namespace, handler);
                }
                return handler.call(this, message);
            };
            return proxyHandler;
        }
    }


