import { fromJS } from 'immutable';

import {
  SET_ERROR_MESSAGE,
  HIDE_ERROR,
} from '../actionCreators';

const initialState = fromJS({
  message: '',
  open: false
});

function setError(state, message) {
  return state.withMutations(map => map.set('message', message).set('open', true));
}

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return setError(state, action.payload);
    case HIDE_ERROR:
      return state.update('open', bool => !bool);
    default:
      return state;
  }
}
