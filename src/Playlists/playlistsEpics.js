import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import {
  FETCH_PLAYLISTS,
  GET_PLAYLISTS,
  SAVE_PLAYLIST,
  GET_SERVER_PLAYLISTS,
  SET_SERVER_PLAYLISTS,
  SET_SERVER_ID,
} from '../actionCreators';

import { YOUTUBE_URL, SERVER_URL } from '../epics';

function fetchPlaylistFulfilled(payload) {
  return {
    type: GET_PLAYLISTS,
    payload
  };
}

function fetchServerPlaylistsFulfilled(playlists) {
  return {
    type: SET_SERVER_PLAYLISTS,
    playlists
  };
}

export function fetchPlaylistsEpic(action$, store) {
  return action$.ofType(FETCH_PLAYLISTS)
  .mergeMap(function () {
    const accessToken = store.getState().getIn(['root', 'accessToken']);
    return ajax.getJSON(YOUTUBE_URL + 'playlists?part=snippet&mine=true', {
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
        .map(({response}) => fetchServerPlaylistsFulfilled([response.playlist]));
    });
}

export function getUserPlaylistsEpic(action$, store) {
  return action$.ofType(GET_SERVER_PLAYLISTS)
    .mergeMap(function () {
      const state = store.getState();
      const googleId = state.getIn(['root', 'googleId']);
      return ajax.getJSON(`${SERVER_URL}users/${googleId}/playlists`)
        .map((response) => fetchServerPlaylistsFulfilled(response))
        .catch(() => Observable.of({
          type: SET_SERVER_ID,
          id: ''
        }));
    });
}
