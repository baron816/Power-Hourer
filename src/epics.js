import { combineEpics } from 'redux-observable';

export const YOUTUBE_API_KEY = 'AIzaSyCGpesu-gaoZl7gCTOoYkGldLH9FVXGoEE';
export const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/';
export const SERVER_URL = 'http://localhost:3001/';

import {
  fetchPlaylistsEpic,
  getUserPlaylistsEpic,
  savePlaylistEpic,
} from './Playlists/playlistsEpics';

import {
  createUserEpic,
} from './CreateUser/createUserEpics';

import {
  startTimeEpic,
} from './Clock/clockEpics';

import {
  fetchPlaylistItemsEpic,
  fetchServerPlaylistItemsEpic,
  changeServerVideoStartEpic
} from './PlaylistItems/playlistItemsEpics';

export default combineEpics(
  fetchPlaylistsEpic,
  fetchPlaylistItemsEpic,
  startTimeEpic,
  createUserEpic,
  savePlaylistEpic,
  getUserPlaylistsEpic,
  fetchServerPlaylistItemsEpic,
  changeServerVideoStartEpic
);
