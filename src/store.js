import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import reducer from './reducer';

import {
  fetchPlaylistsEpic,
  fetchPlaylistItemsEpic
} from './epics';

const rootEpic = combineEpics(
  fetchPlaylistsEpic,
  fetchPlaylistItemsEpic
);

const epicMiddleWare = createEpicMiddleware(rootEpic);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), compose(applyMiddleware(epicMiddleWare), autoRehydrate()));

export const persistor = persistStore(store);
export default store;
