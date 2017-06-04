import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import {
  FETCH_YOUTUBE_PLAYLISTS,
  FETCH_SERVER_PLAYLISTS,
  FETCH_PUBLIC_PLAYLISTS,
  FETCH_NEXT_PUBLIC_PLAYLISTS_PAGE,
  SAVE_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST,
  INCREMENT_PLAYCOUNT
} from '../actionCreators';

import { YOUTUBE_API_KEY, YOUTUBE_URL, SERVER_URL } from '../epics';
import {
  fetchYoutubePlaylistFulfilled,
  fetchServerPlaylistsFulfilled,
  createServerPlaylistFulfilled,
  deleteServerPlaylistFulfilled,
  fetchPublicPlaylistsFulfilled,
  fetchNextPublicPlaylistsPageFulfilled,
  invertModalState,
  updatePlaylistFulfilled,
  setError,
  empty
} from '../actions';

export function fetchPlaylistsEpic(action$, store) {
  return action$.ofType(FETCH_YOUTUBE_PLAYLISTS)
  .mergeMap(function () {
    const accessToken = store.getState().getIn(['root', 'accessToken']);
    return ajax.getJSON(`${YOUTUBE_URL}playlists?part=snippet&mine=true&key=${YOUTUBE_API_KEY}`, {
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
    .map((items) => fetchYoutubePlaylistFulfilled(items))
    .catch(() => Observable.of(setError('No Playlists. Create one on Youtube')));
  });
}

export function savePlaylistEpic(action$, store) {
  return action$.ofType(SAVE_PLAYLIST)
    .mergeMap(function () {
      const state = store.getState();
      const playlists = state.getIn(['playlists', 'youtubePlaylists']);
      const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
      const playlist = playlists.get(playlistIndex);
      const playlistItems = state.getIn(['playlistItems', 'playlistItems']);
      const token = state.getIn(['root', 'serverId']);

      const newPlaylist = JSON.stringify({
        playlistItems,
        playlistId: playlist.get('playlistId'),
        title: playlist.get('title'),
        thumbnail: playlist.get('thumbnail')
      });
      return ajax.post(SERVER_URL + 'playlists', newPlaylist, {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
        .map(({response}) => createServerPlaylistFulfilled([response.playlist]))
        .catch(() => Observable.of(setError('Playlist not saved')));
    });
}

export function getUserPlaylistsEpic(action$, store) {
  return action$.ofType(FETCH_SERVER_PLAYLISTS)
    .mergeMap(function () {
      const state = store.getState();
      const id = state.getIn(['root', 'serverId']);

      return ajax.getJSON(`${SERVER_URL}users/playlists`, {
        Authorization: 'Bearer ' + id
      })
        .map(({playlists}) => fetchServerPlaylistsFulfilled(playlists))
        .catch(() => Observable.of(setError('Filed to get playlists')));
    });
}

export function deleteServerPlaylistEpic(action$, store) {
  return action$.ofType(DELETE_PLAYLIST)
    .mergeMap(function ({payload}) {
      const state = store.getState();
      const token = state.getIn(['root', 'serverId']);

      return ajax.delete(`${SERVER_URL}playlists/${payload.id}`, {
        Authorization: 'Bearer ' + token
      })
        .mergeMap(() => [invertModalState(), deleteServerPlaylistFulfilled(payload.index)])
        .catch(() => Observable.of(setError('Failed to delete playlist')));
    });
}

export function updatePlaylistEpic(action$, store) {
  return action$.ofType(UPDATE_PLAYLIST)
    .mergeMap(function ({payload}) {
      const state = store.getState();
      const token = state.getIn(['root', 'serverId']);

      return ajax.put(`${SERVER_URL}playlists/${payload.id}`, JSON.stringify(payload.updateData), {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
        .map(({response}) => updatePlaylistFulfilled(response))
        .catch(() => Observable.of(setError('Failed to update playlist')));
    });
}

export function fetchPublicPlaylistsEpic(action$) {
  return action$.ofType(FETCH_PUBLIC_PLAYLISTS)
    .mergeMap(function () {
      return ajax.getJSON(`${SERVER_URL}playlists`)
        .map(response => fetchPublicPlaylistsFulfilled(response))
        .catch(() => Observable.of(setError('Failed to get playlists')));
    });
}

export function fetchNextPublicPlaylistsPageEpic(action$) {
  return action$.ofType(FETCH_NEXT_PUBLIC_PLAYLISTS_PAGE)
    .mergeMap(function ({payload}) {
      return ajax.getJSON(`${SERVER_URL}playlists?page=${payload}`)
        .map(response => fetchNextPublicPlaylistsPageFulfilled(response))
        .catch(() => Observable.of(setError('Failed to get next page')));
    });
}

export function incrementPlayCountEpic(action$, store) {
  return action$.ofType(INCREMENT_PLAYCOUNT)
    .mergeMap(function ({payload}) {
      const state = store.getState();
      const playlists = state.getIn(['playlists', payload]);
      const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
      const id = playlists.get(playlistIndex).get('_id');

      return ajax.put(`${SERVER_URL}playlists/${id}/incrementPlayCount`)
        .map(() => empty())
        .catch(() => Observable.of(empty()));
    });
}
