import { fromJS, List } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  GET_PLAYLISTS,
  RESET_STATE,
  GET_PLAYLIST_ITEMS,
  NEXT_VIDEO,
  GOTO_VIDEO,
  CHANGE_PLAY_STATE,
  INCREMENT_TIME,
  RESET_CLOCK,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT
} from './actionCreators';

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = fromJS({
  accessToken: '',
  playlists: [],
  playlistItems: [],
  playlistIndex: 0,
  playing: false,
  time: 0,
  videoLength: 60,
  callNext: true
});

function setToken(state, token) {
  return state.set('accessToken', token);
}

function setPlaylists(state, payload) {
  return state.updateIn(['playlists'], (list) => list.concat(payload));
}

function setPlaylistItems(state, payload) {
  return state.set('playlistItems', List(payload));
}

function incrementPlaylistIndex(state) {
  if (state.get('playlistIndex') < state.get('playlistItems').size - 1) {
    return state.set('playlistIndex', state.get('playlistIndex') + 1);
  }
  return state;
}

function setVideoIndex(state, index) {
  return state.set('playlistIndex', Number(index));
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case SET_ACCESS_TOKEN:
      return setToken(state, action.token);
    case GET_PLAYLISTS:
      return setPlaylists(state, action.payload);
    case GET_PLAYLIST_ITEMS:
      return setPlaylistItems(state, action.payload);
    case NEXT_VIDEO:
      return incrementPlaylistIndex(state);
    case GOTO_VIDEO:
      return setVideoIndex(state, action.index);
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
    default:
      return state;
  }
}
