import { fromJS } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  RESET_STATE,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  SHOW_MODAL
} from './actionCreators';

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = fromJS({
  accessToken: '',
  videoLength: 60,
  callNext: true,
  showModal: false
});

function setToken(state, token) {
  return state.set('accessToken', token);
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case SET_ACCESS_TOKEN:
      return setToken(state, action.token);
    case CHANGE_VIDEO_LENGTH:
      return changeVideoLength(state, action.length);
    case FLIP_NEXT:
      return flipNext(state);
    case SHOW_MODAL:
      return setModalState(state);
    default:
      return state;
  }
}
