import { fromJS } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  RESET_STATE,
  CHANGE_PLAY_STATE,
  INCREMENT_TIME,
  RESET_CLOCK,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  SHOW_MODAL
} from './actionCreators';

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = fromJS({
  accessToken: '',
  playing: false,
  time: 0,
  videoLength: 60,
  callNext: true,
  showModal: false
});

function setToken(state, token) {
  return state.set('accessToken', token);
}

function changePlayState(state, bool) {
  return state.set('playing', bool);
}

function incrementTime(state) {
  if (state.get('playing')) {
    return state.set('time', state.get('time') + 1);
  }
  return state;
}

function resetClock(state) {
  return state.set('time', 0);
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
    case CHANGE_PLAY_STATE:
      return changePlayState(state, action.bool);
    case INCREMENT_TIME:
      return incrementTime(state);
    case RESET_CLOCK:
      return resetClock(state);
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
