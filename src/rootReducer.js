import { fromJS } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  SHOW_MODAL,
  SET_SERVER_ID,
  RESET_CALL_NEXT
} from './actionCreators';

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = fromJS({
  accessToken: '',
  googleId: '',
  videoLength: 60,
  callNext: true,
  showModal: false,
  serverId: ''
});

function setToken(state, {token, googleId}) {
  return state.withMutations(map => map.set('accessToken', token).set('googleId', googleId));
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
    case CHANGE_VIDEO_LENGTH:
      return state.set('videoLength', Number(action.payload));
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
