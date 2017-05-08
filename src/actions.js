import {
  SET_ACCESS_TOKEN,
  FETCH_PLAYLISTS,
  RESET_STATE,
  FETCH_PLAYLIST_ITEMS,
  NEXT_VIDEO,
  GOTO_VIDEO,
  CHANGE_PLAY_STATE,
  RESET_CLOCK,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  CHANGE_VIDEO_START,
  SHOW_MODAL,
  SET_PLAYLIST_INDEX,
  START_TIME,
  END_TIME,
  FLIP_SHOW_DIALOG,
  CHANGE_USERNAME,
  CREATE_USER,
  SAVE_PLAYLIST,
  GET_SERVER_PLAYLISTS,
  FETCH_SERVER_PLAYLIST_ITEMS
} from './actionCreators';

//Redux
export function setAccessToken(token, googleId) {
  return {
    type: SET_ACCESS_TOKEN,
    token,
    googleId
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

export function changePlayState(bool) {
  return {
      type: CHANGE_PLAY_STATE,
      bool
  };
}

export function resetClock() {
  return {
    type: RESET_CLOCK
  };
}

export function changeVideoLength(length) {
  return {
    type: CHANGE_VIDEO_LENGTH,
    length
  };
}

export function flipNext() {
  return {
   type: FLIP_NEXT
  };
}

export function changeVideoStart(index, time) {
  return {
    type: CHANGE_VIDEO_START,
    index,
    time
  };
}

export function invertModalState() {
  return {
    type: SHOW_MODAL
  };
}

export function setPlaylistIndex(index) {
  return {
    type: SET_PLAYLIST_INDEX,
    index
  };
}

export function showCreateDialog() {
  return {
    type: FLIP_SHOW_DIALOG
  };
}

export function setUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username
  };
}

//Epic
export function fetchPlaylists() {
  return {
    type: FETCH_PLAYLISTS
  };
}

export function fetchYoutubePlaylistItems(playlistId) {
  return {
    type: FETCH_PLAYLIST_ITEMS,
    playlistId,
    items: []
  };
}

export function startTime() {
  return {
    type: START_TIME
  };
}

export function endTime() {
  return {
    type: END_TIME
  };
}

export function createUser() {
  return {
    type: CREATE_USER
  };
}

export function savePlaylist() {
  return {
    type: SAVE_PLAYLIST
  };
}

export function getServerPlaylists() {
  return {
    type: GET_SERVER_PLAYLISTS
  };
}

export function fetchServerPlaylistItems(_id) {
  return {
    type: FETCH_SERVER_PLAYLIST_ITEMS,
    _id
  };
}
