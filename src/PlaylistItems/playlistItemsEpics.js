import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';

import {
  FETCH_YOUTUBE_PLAYLIST_ITEMS,
  FETCH_SERVER_PLAYLIST_ITEMS
} from '../actionCreators';

import {
  YOUTUBE_API_KEY,
  YOUTUBE_URL,
  SERVER_URL,
} from '../epics';
import { fetchPlaylistItemsFulfilled } from '../actions';


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
