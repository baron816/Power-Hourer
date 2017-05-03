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
  END_TIME
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
