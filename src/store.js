import { createStore, compose, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist-immutable';
import { createEpicMiddleware } from 'redux-observable';

import reducer from './reducers';
import epic from './epics';

const epicMiddleWare = createEpicMiddleware(epic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(epicMiddleWare),
  autoRehydrate())
);

export default store;
