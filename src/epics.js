import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

const YOUTUBE_API_KEY = 'AIzaSyCGpesu-gaoZl7gCTOoYkGldLH9FVXGoEE';

import {
  FETCH_PLAYLISTS,
  GET_PLAYLISTS,
  FETCH_PLAYLIST_ITEMS,
  GET_PLAYLIST_ITEMS
} from './actionCreators';

function fetchPlaylistFulfilled(payload) {
  return {
    type: GET_PLAYLISTS,
    payload
  };
}

function fetchPlaylistItemsFulfilled(payload) {
  return {
    type: GET_PLAYLIST_ITEMS,
    payload
  };
}

export function fetchPlaylistsEpic(action$, store) {
  return action$.ofType(FETCH_PLAYLISTS)
  .mergeMap(function () {
    const accessToken = store.getState().get('accessToken');
    return ajax.getJSON('https://www.googleapis.com/youtube/v3/playlists?part=snippet%2C+contentDetails&mine=true', {
      Authorization: 'Bearer ' + accessToken
    })
    .map(response => fetchPlaylistFulfilled(response.items));
  });
}

export function fetchPlaylistItemsEpic(action$) {
  return action$.ofType(FETCH_PLAYLIST_ITEMS)
  .mergeMap(function (action) {
    return ajax.getJSON(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+contentDetails&playlistId=${action.playlistId}&maxResults=15&key=${YOUTUBE_API_KEY}`)
    .map(response => fetchPlaylistItemsFulfilled(response.items));
  });
}
