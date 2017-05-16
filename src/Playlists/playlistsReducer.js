import { fromJS } from 'immutable';

import {
  SET_SERVER_PLAYLISTS,
  SET_YOUTUBE_PLAYLISTS,
  ADD_SERVER_PLAYLIST,
  SET_PLAYLIST_INDEX,
  SET_CURRENT_PLAYLIST,
  REMOVE_SERVER_PLAYLIST
} from '../actionCreators';

const initialState = fromJS({
    youtubePlaylists: [],
    serverPlaylists: [],
    playlistIndex: 0,
    currentPlaylist: ''
});

function removeServerItem(state, index) {
  return state.updateIn(['serverPlaylists'], (list) => list.delete(index));
}

function playlistSetter(type) {
  return function (state, playlists) {
    return state.updateIn([type], (list) => list.concat(fromJS(playlists)));
  };
}

const addServerPlaylist = playlistSetter('serverPlaylists');

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_YOUTUBE_PLAYLISTS:
      return state.set('youtubePlaylists', fromJS(action.payload));
    case SET_SERVER_PLAYLISTS:
      return state.set('serverPlaylists', fromJS(action.payload));
    case ADD_SERVER_PLAYLIST:
      return addServerPlaylist(state, action.payload);
    case SET_PLAYLIST_INDEX:
      return state.set('playlistIndex', action.payload);
    case SET_CURRENT_PLAYLIST:
      return state.set('currentPlaylist', action.payload);
    case REMOVE_SERVER_PLAYLIST:
      return removeServerItem(state, action.payload);
    default:
      return state;
  }
}
