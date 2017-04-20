import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import reducer from './reducer';

import {
  fetchPlaylistsEpic,
  fetchPlaylistItemsEpic,
  startTimeEpic
} from './epics';

const rootEpic = combineEpics(
  fetchPlaylistsEpic,
  fetchPlaylistItemsEpic,
  startTimeEpic
);

const epicMiddleWare = createEpicMiddleware(rootEpic);

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

export const persistor = persistStore(store);
export default store;
