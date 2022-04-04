// redux 流

import {createStore} from 'redux';

// reducer：处理数据的函数（收到action）
// replaceReducer api：如果 reducer 很多的话，可以动态的把 原有的reducer 替换出来
const listProcessor = (state, action) => {
    console.log('state, action', state, action);
    if (action.type === 'PUSH_LIST') {
        return [
            action.data
        ]
    }
    return state;
};

// store：存数据的地方
// 在createstore的时候，会自己给自己触发一个dispatch
const store = createStore(listProcessor);

console.log('store', store.getState());

// action：要改数据的行为（非确实去改）
store.dispatch({
    type: 'PUSH_LIST',
    data: {
        title: '标题'
    }
})



