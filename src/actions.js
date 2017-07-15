import { createAction } from 'redux-actions';

import * as ac from './actionCreators';

//Redux
//root
export const setAccessToken = createAction(ac.SET_ACCESS_TOKEN, ({accessToken, googleId}) => ({accessToken, googleId}));
export const flipNext = createAction(ac.FLIP_NEXT);
export const invertModalState = createAction(ac.SHOW_MODAL);
export const resetState = createAction(ac.RESET_STATE);
export const resetCallNext = createAction(ac.RESET_CALL_NEXT);
export const setServerId = createAction(ac.SET_SERVER_ID, id => id);

//error
export const setError = createAction(ac.SET_ERROR_MESSAGE, message => message);
export const hideError = createAction(ac.HIDE_ERROR);

//playlistItems
export const fetchPlaylistItemsFulfilled = createAction(ac.SET_PLAYLIST_ITEMS, items => items);
export const nextVideo = createAction(ac.NEXT_VIDEO);
export const goToVideo = createAction(ac.GOTO_VIDEO, index => index);
export const changeVideoStart = createAction(ac.CHANGE_VIDEO_START, time => time);
export const changeVideoLength = createAction(ac.CHANGE_VIDEO_LENGTH, time => time);
export const moveItem = createAction(ac.MOVE_ITEM, indexes => indexes);
export const setLoaded = createAction(ac.SET_LOADED, bool => bool);
export const removeItemFulfilled = createAction(ac.REMOVE_ITEM_FULFILLED, id => id);


//playlists
export const setCurrentPlaylist = createAction(ac.SET_CURRENT_PLAYLIST, playlistName => playlistName);
export const setPlaylistIndex = createAction(ac.SET_PLAYLIST_INDEX, index => index);
export const fetchYoutubePlaylistFulfilled = createAction(ac.SET_YOUTUBE_PLAYLISTS, playlists => playlists);
export const fetchServerPlaylistsFulfilled = createAction(ac.SET_SERVER_PLAYLISTS, playlists => playlists);
export const fetchPublicPlaylistsFulfilled = createAction(ac.SET_PUBLIC_PLAYLISTS, response => response);
export const fetchNextPublicPlaylistsPageFulfilled = createAction(ac.ADD_PUBLIC_PLAYLISTS, response => response);
export const createServerPlaylistFulfilled = createAction(ac.ADD_SERVER_PLAYLIST, playlist => playlist);
export const deleteServerPlaylistFulfilled = createAction(ac.REMOVE_SERVER_PLAYLIST, index => index);
export const updatePlaylistFulfilled = createAction(ac.UPDATE_PLAYLIST_FULFILLED, playlist => playlist);
export const setPlaylistDefaultStartTime = createAction(ac.SET_PLAYLIST_DEFAULT_START_TIME, time => time);
export const setPlaylistDefaultLength = createAction(ac.SET_PLAYLIST_DEFAULT_LENGTH, time => time);

//clock
export const resetClock = createAction(ac.RESET_CLOCK);
export const incrementTime = createAction(ac.INCREMENT_TIME);
export const changePlayState = createAction(ac.CHANGE_PLAY_STATE, bool => bool);

//searchVideos
export const searchVideosFulfilled = createAction(ac.SEARCH_VIDEOS_FULFILLED, (videos, nextPageToken) => ({videos, nextPageToken}));
export const flipSearching = createAction(ac.FLIP_SEARCHING);
export const setSearchingToFalse = createAction(ac.SET_SEARCHING_TO_FALSE);

//Epic
//playlists
export const fetchYoutubePlaylists = createAction(ac.FETCH_YOUTUBE_PLAYLISTS);
export const fetchServerPlaylists = createAction(ac.FETCH_SERVER_PLAYLISTS);
export const fetchPublicPlaylists = createAction(ac.FETCH_PUBLIC_PLAYLISTS);
export const fetchNextPublicPlaylistsPage = createAction(ac.FETCH_NEXT_PUBLIC_PLAYLISTS_PAGE, page => page);
export const savePlaylist = createAction(ac.SAVE_PLAYLIST);
export const deletePlaylist = createAction(ac.DELETE_PLAYLIST);
export const moveServerItem = createAction(ac.MOVE_SERVER_ITEM, payload => payload);
export const updatePlaylist = createAction(ac.UPDATE_PLAYLIST, updateData => updateData);
export const incrementPlayCount = createAction(ac.INCREMENT_PLAYCOUNT);


//playlistItems
export const fetchYoutubePlaylistItems = createAction(ac.FETCH_YOUTUBE_PLAYLIST_ITEMS, (playlistId, items = [], nextPageToken) => ({playlistId, items, nextPageToken}));
export const fetchServerPlaylistItems = createAction(ac.FETCH_SERVER_PLAYLIST_ITEMS, _id => _id);
export const changeServerVideoStart = createAction(ac.CHANGE_SERVER_VIDEO_START, time => time);
export const changeServerVideoLength = createAction(ac.CHANGE_SERVER_VIDEO_LENGTH, time => time);
export const removeItem = createAction(ac.REMOVE_ITEM);
export const addVideoToServerPlaylist = createAction(ac.ADD_VIDEO_TO_SERVER_PLAYLIST);
export const addPlaylistItemFulfilled = createAction(ac.ADD_PLAYLIST_ITEM_FULFILLED, item => item);

//clock
export const startTime = createAction(ac.START_TIME);
export const endTime = createAction(ac.END_TIME);

//login
export const loginUser = createAction(ac.LOGIN_USER, ({tokenId}) => tokenId);

//searchVideos
export const searchVideos = createAction(ac.SEARCH_VIDEOS, query => query);

export const empty = createAction('EMPTY');
