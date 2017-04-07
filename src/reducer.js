import { fromJS, List } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  GET_PLAYLISTS,
  RESET_STATE,
  GET_PLAYLIST_ITEMS
} from './actionCreators';

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = fromJS({
  accessToken: '',
  playlists: [],
  playlistItems: []
});

function setToken(state, token) {
  return state.set('accessToken', token);
}

function setPlaylists(state, payload) {
  return state.updateIn(['playlists'], (list) => list.concat(payload.items));
}

function setPlaylistItems(state, payload) {
  return state.set('playlistItems', List(payload.items));
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
    default:
      return state;
  }
}
