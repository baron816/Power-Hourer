import { fromJS } from 'immutable';

import {
  GET_PLAYLISTS,
  SET_PLAYLIST_INDEX,
  SET_SERVER_PLAYLISTS,
  SET_CURRENT_PLAYLIST
} from '../actionCreators';

const initialState = fromJS({
    youtubePlaylists: [],
    serverPlaylists: [],
    playlistIndex: 0,
    currentPlaylist: ''
});

function playlistSetter(type) {
  return function (state, playlists) {
    return state.updateIn([type], (list) => list.concat(fromJS(playlists)));
  };
}

const setServerPlaylists = playlistSetter('serverPlaylists');
const setYouTubePlaylists = playlistSetter('youtubePlaylists');

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYLISTS:
      return setYouTubePlaylists(state, action.payload);
    case SET_PLAYLIST_INDEX:
      return state.set('playlistIndex', action.index);
    case SET_SERVER_PLAYLISTS:
      return setServerPlaylists(state, action.playlists);
    case SET_CURRENT_PLAYLIST:
      return state.set('currentPlaylist', action.playlistName);
    default:
      return state;
  }
}
