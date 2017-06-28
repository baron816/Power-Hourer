import { fromJS } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  FLIP_NEXT,
  SHOW_MODAL,
  SET_SERVER_ID,
  RESET_CALL_NEXT
} from './actionCreators';

const initialState = fromJS({
  accessToken: '',
  googleId: '',
  callNext: true,
  showModal: false,
  serverId: ''
});

function setToken(state, {accessToken, googleId}) {
  return state.withMutations(map => map.set('accessToken', accessToken).set('googleId', googleId));
}

function flipState(key) {
  return function (state) {
    return state.update(key, bool => !bool);
  };
}

const flipModal = flipState('showModal');
const flipNext = flipState('callNext');

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return setToken(state, action.payload);
    case FLIP_NEXT:
      return flipNext(state);
    case SHOW_MODAL:
      return flipModal(state);
    case SET_SERVER_ID:
      return state.set('serverId', action.payload);
    case RESET_CALL_NEXT:
      return state.set('callNext', true);
    default:
      return state;
  }
}
