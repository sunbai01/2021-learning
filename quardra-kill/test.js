// 1、
// var promise = new Promise((resolve, reject) => {
//     resolve(1);
//     reject(2);
// });

// promise.then(res => {
//     console.log('res', res);
// })
// .catch(err => {
//     console.error(err);
// });

// 2、
// let target = {
//     isTarget: 1
// };
// let proxy = new Proxy(target, {
//     get() {
//         return '111';
//     },
//     // tarpTarget 等同于 target, key 等同于 msg, receiver 等同于 proxy
//     set(tarpTarget, key, value, receiver) {
//         console.log('修改方法', tarpTarget, key, value, receiver);
//         tarpTarget[key] = value;
//     }
// })

// proxy.msg = 'sunbai';
// console.log('proxy.msg', proxy.msg);
// console.log('target.msg', target.msg);
// console.log('proxy.msg', proxy);
// console.log('target.msg', target);


