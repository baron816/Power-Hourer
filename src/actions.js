import {
  SET_ACCESS_TOKEN,
  FETCH_PLAYLISTS,
  RESET_STATE,
  FETCH_PLAYLIST_ITEMS,
  NEXT_VIDEO,
  GOTO_VIDEO
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

export function nextVideo() {
  return {
    type: NEXT_VIDEO
  };
}

export function goToVideo(index) {
  return {
    type: GOTO_VIDEO,
    index
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
