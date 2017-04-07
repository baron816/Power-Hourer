import { createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';

import reducer from './reducer';

const store = compose(autoRehydrate())(createStore)(reducer);

persistStore(store);
export default store;
