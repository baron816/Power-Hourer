import { fromJS, List } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  GET_PLAYLISTS,
  RESET_STATE,
  GET_PLAYLIST_ITEMS,
  NEXT_VIDEO
} from './actionCreators';

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = fromJS({
  accessToken: '',
  playlists: [],
  playlistItems: [],
  playlistIndex: 0
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
  return state.set('playlistIndex', state.get('playlistIndex') + 1);
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
    default:
      return state;
  }
}
