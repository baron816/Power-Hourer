import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';
import { Observable } from 'rxjs';

import {
  FETCH_YOUTUBE_PLAYLIST_ITEMS,
  FETCH_SERVER_PLAYLIST_ITEMS,
  CHANGE_SERVER_VIDEO_START,
  CHANGE_SERVER_VIDEO_LENGTH,
  MOVE_SERVER_ITEM
} from '../actionCreators';

import {
  YOUTUBE_API_KEY,
  YOUTUBE_URL,
  SERVER_URL,
} from '../epics';
import {
  fetchYoutubePlaylistItems,
  fetchPlaylistItemsFulfilled,
  setError,
  setLoaded,
  empty
} from '../actions';

function playlistData(store) {
  const state = store.getState();
  const playlistItemsIndex = state.getIn(['playlistItems', 'playlistItemsIndex']);
  const playlistItems = state.getIn(['playlistItems', 'playlistItems']);
  const playlistItemId = playlistItems.get(playlistItemsIndex).get('_id');
  const playlist = state.getIn(['playlists', 'serverPlaylists']);
  const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
  const playlistId = playlist.get(playlistIndex).get('_id');
  const token = state.getIn(['root', 'serverId']);

  return {
    token,
    playlistId,
    playlistItemId
  };
}

function updateVideo(store, payload) {
  const {playlistId, playlistItemId, token} = playlistData(store);

  const updateData = JSON.stringify({startTime: payload});

  return ajax.put(`${SERVER_URL}playlists/${playlistId}/playlistItems/${playlistItemId}`, updateData, {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  })
    .map(() => empty())
    .catch(() => Observable.of(setError('Failed to set video start time')));
}

export function fetchPlaylistItemsEpic(action$) {
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
     .mergeMap(({items, nextPageToken}) => {
       const nextItems = payload.items.concat(items);
       if (nextPageToken) {
         return [fetchYoutubePlaylistItems(payload.playlistId, nextItems, nextPageToken)];
       } else {
         return [fetchPlaylistItemsFulfilled(nextItems), setLoaded(true)];
       }
     })
     .catch(() => Observable.of(setError('Error. Please remove any private or deleted videos from playlist.')));
  });
}

export function fetchServerPlaylistItemsEpic(action$) {
  return action$.ofType(FETCH_SERVER_PLAYLIST_ITEMS)
    .mergeMap(function ({payload}) {
      return ajax.getJSON(`${SERVER_URL}playlists/${payload}/playlistItems`)
        .mergeMap((items) => [fetchPlaylistItemsFulfilled(items), setLoaded(true)])
        .catch(() => Observable.of(setError('Failed to get playlist')));
    });
}

export function changeServerVideoStartEpic(action$, store) {
  return action$.ofType(CHANGE_SERVER_VIDEO_START)
    .debounceTime(2500)
    .switchMap(({payload}) => updateVideo(store, payload));
}

export function changeServerVideoLengthEpic(action$, store) {
  return action$.ofType(CHANGE_SERVER_VIDEO_LENGTH)
    .debounceTime(1000)
    .switchMap(({payload}) => updateVideo(store, payload));
}

export function moveItemEpic(action$, store) {
  return action$.ofType(MOVE_SERVER_ITEM)
    .mergeMap(function ({payload}) {
      const state = store.getState();
      const playlist = state.getIn(['playlists', 'serverPlaylists']);
      const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
      const playlistId = playlist.get(playlistIndex).get('_id');
      const token = state.getIn(['root', 'serverId']);

      return ajax.put(`${SERVER_URL}playlists/${playlistId}/moveItem`, payload, {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
        .map(() => empty())
        .catch(() => Observable.of(setError('Failed to move video')));
    });
}
