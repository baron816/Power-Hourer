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

import { makeProps } from '../utils';

import {
  accessToken,
  selectedPlaylist,
  playlistIndex,
  playlistItems,
  serverId
} from '../selectors';

export function fetchPlaylistsEpic(action$, store) {
  return action$.ofType(FETCH_YOUTUBE_PLAYLISTS)
  .mergeMap(function () {
    const token = accessToken(store.getState());
    return ajax.getJSON(`${YOUTUBE_URL}playlists?part=snippet&mine=true&key=${YOUTUBE_API_KEY}`, {
      Authorization: 'Bearer ' + token
    })
    .map(function ({items}) {
      return items.map(function ({id, snippet: {title, thumbnails: {default: {url}}}}) {
        return {
          _id: id,
          title,
          thumbnail: url
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
      const { playlist, token, plItems } = makeProps({playlist: selectedPlaylist, token: serverId, plItems: playlistItems})(store.getState());

      const newPlaylist = JSON.stringify({
        playlistItems: plItems,
        playlistId: playlist.get('_id'),
        title: playlist.get('title'),
        thumbnail: playlist.get('thumbnail')
      });

      return ajax.post(SERVER_URL + 'playlists', newPlaylist, {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
        .map(({response: {playlist}}) => createServerPlaylistFulfilled([playlist]))
        .catch(() => Observable.of(setError('Playlist not saved')));
    });
}

export function getUserPlaylistsEpic(action$, store) {
  return action$.ofType(FETCH_SERVER_PLAYLISTS)
    .mergeMap(function () {
      const id = serverId(store.getState());

      return ajax.getJSON(`${SERVER_URL}users/playlists`, {
        Authorization: 'Bearer ' + id
      })
        .map(({playlists}) => fetchServerPlaylistsFulfilled(playlists))
        .catch(() => Observable.of(setError('Filed to get playlists')));
    });
}

export function deleteServerPlaylistEpic(action$, store) {
  return action$.ofType(DELETE_PLAYLIST)
    .mergeMap(function () {
      const { plIndex, playlist, token } = makeProps({plIndex: playlistIndex, playlist: selectedPlaylist, token: serverId})(store.getState());

      return ajax.delete(`${SERVER_URL}playlists/${playlist.get('_id')}`, {
        Authorization: 'Bearer ' + token
      })
        .mergeMap(() => [invertModalState(), deleteServerPlaylistFulfilled(plIndex)])
        .catch(() => Observable.of(setError('Failed to delete playlist')));
    });
}

export function updatePlaylistEpic(action$, store) {
  return action$.ofType(UPDATE_PLAYLIST)
    .mergeMap(function ({payload}) {
      const {token, playlist} = makeProps({token: serverId, playlist: selectedPlaylist})(store.getState());

      return ajax.put(`${SERVER_URL}playlists/${playlist.get('_id')}`, JSON.stringify(payload), {
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
    .mergeMap(function () {
      const { playlist } = selectedPlaylist(store.getState());

      return ajax.put(`${SERVER_URL}playlists/${playlist.get('_id')}/incrementPlayCount`)
        .map(() => empty())
        .catch(() => Observable.of(empty()));
    });
}
