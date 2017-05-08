import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs';

const YOUTUBE_API_KEY = 'AIzaSyCGpesu-gaoZl7gCTOoYkGldLH9FVXGoEE';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/';

import {
  FETCH_PLAYLISTS,
  GET_PLAYLISTS,
  FETCH_PLAYLIST_ITEMS,
  GET_PLAYLIST_ITEMS,
  START_TIME,
  INCREMENT_TIME,
  END_TIME,
  CREATE_USER,
  SAVE_PLAYLIST,
  SET_SERVER_ID,
  GET_SERVER_PLAYLISTS,
  SET_SERVER_PLAYLISTS
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
    payload: payload
  };
}

export function incrementTime() {
  return {
    type: INCREMENT_TIME
  };
}

export function setServerId(id) {
  return {
    type: SET_SERVER_ID,
    id
  };
}

export function fetchServerPlaylistsFulfilled(playlists) {
  return {
    type: SET_SERVER_PLAYLISTS,
    playlists
  };
}

export function fetchPlaylistsEpic(action$, store) {
  return action$.ofType(FETCH_PLAYLISTS)
  .mergeMap(function () {
    const accessToken = store.getState().getIn(['root', 'accessToken']);
    return ajax.getJSON(BASE_URL + 'playlists?part=snippet&mine=true', {
      Authorization: 'Bearer ' + accessToken
    })
    .map(function ({items}) {
      return items.map(function (item) {
        return {
          playlistId: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url
        };
      });
    })
    .map((items) => fetchPlaylistFulfilled(items));
  });
}

export function fetchPlaylistItemsEpic(action$, store) {
  return action$.ofType(FETCH_PLAYLIST_ITEMS)
  .switchMap(function (action) {
    const nextPageToken = action.nextPageToken ? `&pageToken=${action.nextPageToken}` : '';
     const url = `${BASE_URL}playlistItems?part=snippet&playlistId=${action.playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}${nextPageToken}`;

     return ajax.getJSON(url)
     .map(function ({items, nextPageToken}) {
       const normalizedItems = items.map(function ({snippet}) {
         return {
           videoId: snippet.resourceId.videoId,
           thumbnail: snippet.thumbnails.default.url,
           title: snippet.title
         };
       });

       return {items: normalizedItems, nextPageToken};
     })
     .map(({items, nextPageToken}) => {
       const nextItems = action.items.concat(items);
       if (nextPageToken) {
         return store.dispatch({type: FETCH_PLAYLIST_ITEMS, playlistId: action.playlistId, nextPageToken, items: nextItems});
       }
       return fetchPlaylistItemsFulfilled(nextItems);
     });
  });
}

export function startTimeEpic(action$) {
  return action$.ofType(START_TIME)
    .mergeMap(function () {
      return Observable.timer(0, 1000)
      .timeInterval()
      .map(() => incrementTime())
      .takeUntil(action$.ofType(END_TIME));
    });
}

export function createUserEpic(action$, store) {
  return action$.ofType(CREATE_USER)
    .mergeMap(function () {
      const state = store.getState();
      const user = JSON.stringify({
        googleId: state.getIn(['root', 'googleId']),
        username: state.getIn(['createUser', 'username'])
      });
      return ajax.post('http://localhost:3001/users', user, {'Content-Type': 'application/json'})
        .map(({response}) => setServerId(response._id));
    });
}

export function savePlaylistEpic(action$, store) {
  return action$.ofType(SAVE_PLAYLIST)
    .mergeMap(function () {
      const state = store.getState();
      const playlists = state.getIn(['playlists', 'playlists']);
      const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
      const playlist = playlists.get(playlistIndex);
      const playlistItems = state.getIn(['playlistItems', 'playlistItems']);
      const owner = state.getIn(['root', 'serverId']);


      const newPlaylist = JSON.stringify({
        owner,
        playlistItems,
        playlistId: playlist.get('playlistId'),
        title: playlist.get('title'),
        thumbnail: playlist.get('thumbnail')
      });
      return ajax.post('http://localhost:3001/playlists', newPlaylist, {'Content-Type': 'application/json'})
        .map((response) => response);
    });
}

export function getUserPlaylistsEpic(action$, store) {
  return action$.ofType(GET_SERVER_PLAYLISTS)
    .mergeMap(function () {
      const state = store.getState();
      const googleId = state.getIn(['root', 'googleId']);
      return ajax.getJSON(`http://localhost:3001/users/${googleId}/playlists`)
        .map((response) => fetchServerPlaylistsFulfilled(response));
    });
}
