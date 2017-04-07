import {
  SET_ACCESS_TOKEN,
  FETCH_PLAYLISTS,
  RESET_STATE,
  FETCH_PLAYLIST_ITEMS
} from './actionCreators';

//Redux
export function setAccessToken(token) {
  return {
    type: SET_ACCESS_TOKEN,
    token
  };
}

export function resetState() {
  return {
    type: RESET_STATE
  };
}

//Epic
export function fetchPlaylists() {
  return {
    type: FETCH_PLAYLISTS
  };
}

export function fetchPlaylistItems(playlistId) {
  return {
    type: FETCH_PLAYLIST_ITEMS,
    playlistId
  };
}
