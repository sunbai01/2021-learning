import { createstore, applyMiddleWare } from 'redux';

const toutiaoProcessor = (state = {list: []}, action) => {
    console.log('i got an dispatch:::', action);
    if (action.type === 'PUST_LIST') {
        return  {
            ...state,
            list: state.list.concat(action.data)
        }
    }
    return state;
};

// 柯理化的，只接受下一环,让dispatch去支持 promise，支持异步
const reduxPromise = ({dispatch, getState}) => next => action => {
    console.log('reduxPromise:::', action, next);
    if (typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
}

const store = createstore(toutiaoProcessor, applyMiddleWare());

export default store;

// this.context 这样拿store