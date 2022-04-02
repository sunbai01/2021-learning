// redux

import {createStore} from 'redux';

// reducer：处理数据的函数（收到action）
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
const store = createStore(listProcessor);

console.log('store', store.getState());

// action：要改数据的行为（非确实去改）
store.dispatch({
    type: 'PUSH_LIST',
    data: {
        title: '标题'
    }
})
