import { fromJS } from 'immutable';

import { GET_PLAYLISTS, SET_PLAYLIST_INDEX, SET_SERVER_PLAYLISTS } from '../actionCreators';

const initialState = fromJS({
    playlists: [],
    serverPlaylists: [],
    playlistIndex: 0
});

function setPlaylistIndex(state, index) {
  return state.set('playlistIndex', index);
}

function playlistSetter(type) {
  return function (state, playlists) {
    return state.updateIn([type], (list) => list.concat(fromJS(playlists)));
  };
}

const setServerPlaylists = playlistSetter('serverPlaylists');
const setYouTubePlaylists = playlistSetter('playlists');

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYLISTS:
      return setYouTubePlaylists(state, action.payload);
    case SET_PLAYLIST_INDEX:
      return setPlaylistIndex(state, action.index);
    case SET_SERVER_PLAYLISTS:
      return setServerPlaylists(state, action.playlists);
    default:
      return state;
  }
}
