import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import {
  FETCH_YOUTUBE_PLAYLISTS,
  FETCH_SERVER_PLAYLISTS,
  SAVE_PLAYLIST,
  DELETE_PLAYLIST,
  UPDATE_PLAYLIST
} from '../actionCreators';

import { YOUTUBE_API_KEY, YOUTUBE_URL, SERVER_URL } from '../epics';
import {
  fetchYoutubePlaylistFulfilled,
  fetchServerPlaylistsFulfilled,
  createServerPlaylistFulfilled,
  deleteServerPlaylistFulfilled,
  setServerId,
  invertModalState,
  updatePlaylistFulfilled,
  setError
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
      const owner = state.getIn(['root', 'serverId']);


      const newPlaylist = JSON.stringify({
        owner,
        playlistItems,
        playlistId: playlist.get('playlistId'),
        title: playlist.get('title'),
        thumbnail: playlist.get('thumbnail')
      });
      return ajax.post(SERVER_URL + 'playlists', newPlaylist, {'Content-Type': 'application/json'})
        .map(({response}) => createServerPlaylistFulfilled([response.playlist]))
        .catch(() => Observable.of(setError('Playlist not saved')));
    });
}

export function getUserPlaylistsEpic(action$, store) {
  return action$.ofType(FETCH_SERVER_PLAYLISTS)
    .mergeMap(function () {
      const state = store.getState();
      const googleId = state.getIn(['root', 'googleId']);
      return ajax.getJSON(`${SERVER_URL}users/${googleId}/playlists`)
        .mergeMap(({playlists, _id}) => [fetchServerPlaylistsFulfilled(playlists),
          setServerId(_id)])
        .catch(() => Observable.of(setServerId('')));
    });
}

export function deleteServerPlaylistEpic(action$) {
  return action$.ofType(DELETE_PLAYLIST)
    .mergeMap(function ({payload}) {
      return ajax.delete(`${SERVER_URL}playlists/${payload.id}`)
        .mergeMap(() => [invertModalState(), deleteServerPlaylistFulfilled(payload.index)]);
    });
}

export function updatePlaylistEpic(action$) {
  return action$.ofType(UPDATE_PLAYLIST)
    .mergeMap(function ({payload}) {
      return ajax.put(`${SERVER_URL}playlists/${payload.id}`, JSON.stringify(payload.updateData), {'Content-Type': 'application/json'})
        .map(({response}) => updatePlaylistFulfilled(response))
        .catch(() => Observable.of(setError('Failed to update playlist')));
    });
}
