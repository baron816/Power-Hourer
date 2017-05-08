import { fromJS } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  SHOW_MODAL,
  SET_SERVER_ID
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

function setToken(state, token, id) {
  return state.withMutations(map => map.set('accessToken', token).set('googleId', id));
}

function changeVideoLength(state, length) {
  return state.set('videoLength', Number(length));
}

function flipNext(state) {
  return state.set('callNext', !state.get('callNext'));
}

function setModalState(state) {
  return state.set('showModal', !state.get('showModal'));
}

function setServerId(state, id) {
  return state.set('serverId', id);
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return setToken(state, action.token, action.googleId);
    case CHANGE_VIDEO_LENGTH:
      return changeVideoLength(state, action.length);
    case FLIP_NEXT:
      return flipNext(state);
    case SHOW_MODAL:
      return setModalState(state);
    case SET_SERVER_ID:
      return setServerId(state, action.id);
    default:
      return state;
  }
}
