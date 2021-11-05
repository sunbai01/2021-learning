/**
* @file utils
* @author sunbai
*/

/**
* @desc 网络请求冯封装，项目内请走这个封装
* @param {Object} - [params] 发请求用的参数
* @return {Promise} 请求的 Promise 任务对象
*/

// treeShaking 可以过滤函数

export const request = params => {
    // params.methods
    // request ({
    //     method: 'get'
    // })
    // or
    // request ({
    //     method: 'GET'
    // })
    // 浅拷贝，因为我们不改东西，如果改的话就要深拷贝了
    let requestParams = {
        ...params,
        method: (params.method && params.method.toUpperCase()) || 'GET'
    }
    // 深拷贝
    // var newParams = JSON.parse(JSON.stringify(params))
    // axios，徒手撸代码，$.ajax
    return fetch(
            requestParams.url,
            requestParams
        )
        .then(res => {
            res.json();
        })
}

export const parseUrl = () => {
    window.name = 'sunbai';
    return url;
}


// 不要一个方法套一个方法这样写，尽量写成函数式一些的独立函数