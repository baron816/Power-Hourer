import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';

import {
  FETCH_YOUTUBE_PLAYLIST_ITEMS,
  FETCH_SERVER_PLAYLIST_ITEMS,
  CHANGE_SERVER_VIDEO_START
} from '../actionCreators';

import {
  YOUTUBE_API_KEY,
  YOUTUBE_URL,
  SERVER_URL,
} from '../epics';
import { fetchPlaylistItemsFulfilled, empty } from '../actions';


export function fetchPlaylistItemsEpic(action$, store) {
  return action$.ofType(FETCH_YOUTUBE_PLAYLIST_ITEMS)
  .switchMap(function ({payload}) {
    const nextPageToken = payload.nextPageToken ? `&pageToken=${payload.nextPageToken}` : '';
     const url = `${YOUTUBE_URL}playlistItems?part=snippet&playlistId=${payload.playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}${nextPageToken}`;

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
       const nextItems = payload.items.concat(items);
       if (nextPageToken) {
         return store.dispatch({type: FETCH_YOUTUBE_PLAYLIST_ITEMS, payload: {playlistId: payload.playlistId, nextPageToken, items: nextItems}});
       }
       return fetchPlaylistItemsFulfilled(nextItems);
     });
  });
}

export function fetchServerPlaylistItemsEpic(action$) {
  return action$.ofType(FETCH_SERVER_PLAYLIST_ITEMS)
    .mergeMap(function ({payload}) {
      return ajax.getJSON(`${SERVER_URL}playlists/${payload}/playlistItems`)
        .map((items) => fetchPlaylistItemsFulfilled(items));
    });
}

export function changeServerVideoStartEpic(action$, store) {
  return action$.ofType(CHANGE_SERVER_VIDEO_START)
    .debounceTime(2000)
    .switchMap(function ({payload}) {
      const state = store.getState();
      const playlistItemsIndex = state.getIn(['playlistItems', 'playlistItemsIndex']);
      const playlistItems = state.getIn(['playlistItems', 'playlistItems']);
      const playlistItemId = playlistItems.get(playlistItemsIndex).get('_id');

      const updateData = JSON.stringify({startTime: payload});

      return ajax.put(`${SERVER_URL}playlistItems/${playlistItemId}`, updateData, {'Content-Type': 'application/json'})
        .map(() => empty());
    });
}
