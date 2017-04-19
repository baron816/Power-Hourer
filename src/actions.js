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
  SET_PLAYLIST_NAME,
  START_TIME,
  END_TIME
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

export function setPlaylistName(name) {
  return {
    type: SET_PLAYLIST_NAME,
    name
  };
}

//Epic
export function fetchPlaylists() {
  return {
    type: FETCH_PLAYLISTS
  };
}

export function fetchPlaylistItems(playlistId, nextPageToken) {
  return {
    type: FETCH_PLAYLIST_ITEMS,
    playlistId,
    nextPageToken
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
