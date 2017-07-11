import { combineEpics } from 'redux-observable';

export const YOUTUBE_API_KEY = 'AIzaSyCGpesu-gaoZl7gCTOoYkGldLH9FVXGoEE';
export const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/';
export const SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://pure-lowlands-17729.herokuapp.com/' : 'http://localhost:8000/';

import {
  fetchPlaylistsEpic,
  getUserPlaylistsEpic,
  savePlaylistEpic,
  deleteServerPlaylistEpic,
  updatePlaylistEpic,
  fetchPublicPlaylistsEpic,
  fetchNextPublicPlaylistsPageEpic,
  incrementPlayCountEpic
} from './Playlists/playlistsEpics';

import {
  createUserEpic,
} from './Login/loginEpics';

import {
  startTimeEpic,
} from './Clock/clockEpics';

import {
  fetchPlaylistItemsEpic,
  fetchServerPlaylistItemsEpic,
  changeServerVideoStartEpic,
  changeServerVideoLengthEpic,
  moveItemEpic,
  removeItemEpic
} from './PlaylistItems/playlistItemsEpics';

export default combineEpics(
  fetchPlaylistsEpic,
  fetchPlaylistItemsEpic,
  startTimeEpic,
  createUserEpic,
  savePlaylistEpic,
  getUserPlaylistsEpic,
  fetchServerPlaylistItemsEpic,
  changeServerVideoStartEpic,
  changeServerVideoLengthEpic,
  deleteServerPlaylistEpic,
  moveItemEpic,
  removeItemEpic,
  updatePlaylistEpic,
  fetchPublicPlaylistsEpic,
  fetchNextPublicPlaylistsPageEpic,
  incrementPlayCountEpic
);
