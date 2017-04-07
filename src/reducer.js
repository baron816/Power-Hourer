import { fromJS } from 'immutable';

import {
  SET_ACCESS_TOKEN
} from './actionCreators';

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = fromJS({
  accessToken: ''
});

function setToken(state, token) {

  return state.set('accessToken', token);
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return setToken(state, action.token);
    default:
      return state;
  }
}
