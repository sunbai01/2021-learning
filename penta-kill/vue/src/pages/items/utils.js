/**
* @file 所有函数的统一文件
* @author sunbai
*/

import vue from 'Vue';

// 去抖：debounce
export const createDebounce = (delay = 1000) => {
    let timmer = null;
    return function debounce(fn) {
        // 打断
        clearTimeout(timmer);
        // 重新计时
        timmer = setTimeout(() => {
            fn && fn();
        }, delay);
    }; 
}

// 节流：throttle
export const createThrottle = (delay = 1000) => {
    let status = 'START';
    return function throttle (fn) {
        if (status == 'WAITING') {
            return;
        }
        status = 'WAITING';
        setTimeout(() => {
            fn && fn();
            status = 'START';
        }, delay)
    }
}
