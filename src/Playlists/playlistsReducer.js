import { fromJS } from 'immutable';

import { GET_PLAYLISTS, SET_PLAYLIST_INDEX } from '../actionCreators';

const initialState = fromJS({
    playlists: [],
    playlistIndex: 0
});

function setPlaylists(state, payload) {
  return state.updateIn(['playlists'], (list) => list.concat(fromJS(payload)));
}

function setPlaylistIndex(state, index) {
  return state.set('playlistIndex', index);
}

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYLISTS:
      return setPlaylists(state, action.payload);
    case SET_PLAYLIST_INDEX:
      return setPlaylistIndex(state, action.index);
    default:
      return state;
  }
}
