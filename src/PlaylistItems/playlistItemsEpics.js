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
  MOVE_SERVER_ITEM,
  REMOVE_ITEM,
  ADD_VIDEO_TO_SERVER_PLAYLIST
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
  empty,
  removeItemFulfilled,
  addPlaylistItemFulfilled
} from '../actions';
import { makeProps } from '../utils';

import {
  serverId,
  playlistId,
  playlistItemId,
  selectedFromSearch
} from '../selectors';

function updateVideo(store, payload) {
  const props = makeProps({playlist: playlistId, item: playlistItemId, token: serverId})(store.getState());
  const { playlist, item, token } = props;

  const updateData = JSON.stringify({startTime: payload});

  return ajax.put(`${SERVER_URL}playlists/${playlist}/playlistItems/${item}`, updateData, {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  })
    .map(() => empty())
    .catch(() => Observable.of(setError('Failed to set video start time')));
}

export function fetchPlaylistItemsEpic(action$) {
  return action$.ofType(FETCH_YOUTUBE_PLAYLIST_ITEMS)
  .switchMap(function ({payload: {
    nextPageToken,
    playlistId,
    items: existingItems
  }}) {
    const nextPage = nextPageToken ? `&pageToken=${nextPageToken}` : '';
     const url = `${YOUTUBE_URL}playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}${nextPage}`;

     return ajax.getJSON(url)
     .map(function ({items, nextPageToken}) {
       const normalizedItems = items.map(function ({
         snippet: {
           resourceId: {videoId},
           thumbnails: {default: {url}},
           title}
         }) {
         return {
           videoId: videoId,
           thumbnail: url,
           title: title
         };
       });

       return {items: normalizedItems, nextPageToken};
     })
     .mergeMap(({items, nextPageToken}) => {
       const nextItems = existingItems.concat(items);
       if (nextPageToken !== undefined) {
         return [fetchYoutubePlaylistItems(playlistId, nextItems, nextPageToken)];
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
      const props = makeProps({token: serverId, playlist: playlistId})(store.getState());

      const { token, playlist } = props;

      return ajax.put(`${SERVER_URL}playlists/${playlist}/moveItem`, payload, {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
        .map(() => empty())
        .catch(() => Observable.of(setError('Failed to move video')));
    });
}

export function removeItemEpic(action$, store) {
  return action$.ofType(REMOVE_ITEM)
    .mergeMap(function () {
      const props = makeProps({playlist: playlistId, item: playlistItemId, token: serverId})(store.getState());

      const { token, item, playlist } = props;

      return ajax.delete(`${SERVER_URL}playlists/${playlist}/playlistItems/${item}`, {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
        .map(({response}) => removeItemFulfilled(response))
        .catch(() => Observable.of(setError('Failed to delete Item')));
    });
}

export function addItemEpic(action$, store) {
  return action$.ofType(ADD_VIDEO_TO_SERVER_PLAYLIST)
    .mergeMap(function ({payload}) {
      const props = makeProps({ item: selectedFromSearch(payload), playlist: playlistId, token: serverId })(store.getState());
      const { item, playlist, token } = props;

      return ajax.put(`${SERVER_URL}playlists/${playlist}/playlistItems`, JSON.stringify(item), {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
        .map(({response}) => addPlaylistItemFulfilled(response))
        .catch(() => Observable.of(setError('Failed to add video')));
    });
}
