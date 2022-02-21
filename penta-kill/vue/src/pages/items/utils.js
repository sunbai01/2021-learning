/**
* @file 所有函数的统一文件 - TODO:防抖节流做成插件
* @author sunbai
*/

import vue from 'Vue';

// 去抖：debounce - 一开始就不执行，加上后面好多次一起执行
const createDebounce = (delay = 1000) => {
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

// 节流（防爆器）：throttle - 一开始就要执行，后面好多次忽略
const createThrottle = (delay = 1000) => {
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


export const utils = {
    createDebounce,
    createThrottle
}