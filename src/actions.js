import { createAction } from 'redux-actions';

import * as ac from './actionCreators';

//Redux
//root
export const setAccessToken = createAction(ac.SET_ACCESS_TOKEN, (token, googleId) => ({token, googleId}));
export const changeVideoLength = createAction(ac.CHANGE_VIDEO_LENGTH, length => length);
export const flipNext = createAction(ac.FLIP_NEXT);
export const invertModalState = createAction(ac.SHOW_MODAL);
export const resetState = createAction(ac.RESET_STATE);
export const resetCallNext = createAction(ac.RESET_CALL_NEXT);
export const setServerId = createAction(ac.SET_SERVER_ID, id => id);

//playlistItems
export const fetchPlaylistItemsFulfilled = createAction(ac.SET_PLAYLIST_ITEMS, items => items);
export const nextVideo = createAction(ac.NEXT_VIDEO);
export const goToVideo = createAction(ac.GOTO_VIDEO, index => index);
export const changeVideoStart = createAction(ac.CHANGE_VIDEO_START, (index, time) => ({index, time}));


//playlists
export const setCurrentPlaylist = createAction(ac.SET_CURRENT_PLAYLIST, playlistName => playlistName);
export const setPlaylistIndex = createAction(ac.SET_PLAYLIST_INDEX, index => index);
export const fetchYoutubePlaylistFulfilled = createAction(ac.SET_YOUTUBE_PLAYLISTS, playlists => playlists);
export const fetchServerPlaylistsFulfilled = createAction(ac.SET_SERVER_PLAYLISTS, playlists => playlists);
export const createServerPlaylistFulfilled = createAction(ac.ADD_SERVER_PLAYLIST, playlist => playlist);

//clock
export const resetClock = createAction(ac.RESET_CLOCK);
export const incrementTime = createAction(ac.INCREMENT_TIME);
export const changePlayState = createAction(ac.CHANGE_PLAY_STATE, bool => bool);

//createUser
export const showCreateDialog = createAction(ac.FLIP_SHOW_DIALOG);
export const setUsername = createAction(ac.CHANGE_USERNAME, username => username);

//Epic
//playlists
export const fetchYoutubePlaylists = createAction(ac.FETCH_YOUTUBE_PLAYLISTS);
export const fetchServerPlaylists = createAction(ac.FETCH_SERVER_PLAYLISTS);
export const savePlaylist = createAction(ac.SAVE_PLAYLIST);

//playlistItems
export const fetchYoutubePlaylistItems = createAction(ac.FETCH_YOUTUBE_PLAYLIST_ITEMS, (playlistId, items = [], nextPageToken) => ({playlistId, items, nextPageToken}));
export const fetchServerPlaylistItems = createAction(ac.FETCH_SERVER_PLAYLIST_ITEMS, _id => _id);

//clock
export const startTime = createAction(ac.START_TIME);
export const endTime = createAction(ac.END_TIME);

//createUser
export const createUser = createAction(ac.CREATE_USER);
