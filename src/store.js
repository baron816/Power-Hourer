import { createStore, compose, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist-immutable';
import { createEpicMiddleware } from 'redux-observable';

import reducer from './reducers';
import epic from './epics';

const epicMiddleWare = createEpicMiddleware(epic);

function addLoggingToDispatch(store) {
  if (false) {
    const rawDispatch = store.dispatch;
    return function (action) {
      console.group(action.type);
      console.log('%c prev state', 'color: red', store.getState().toJS());
      console.log('%c action', 'color: blue', action);
      const returnValue = rawDispatch(action);
      console.log('%c next state', 'color: green', store.getState().toJS());
      console.groupEnd(action.type);
      return returnValue;
    };
  }
  return store.dispatch;
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), compose(applyMiddleware(epicMiddleWare), autoRehydrate()));
store.dispatch = addLoggingToDispatch(store);

export default store;
