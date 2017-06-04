import { fromJS, Map } from 'immutable';

import {
  SET_SERVER_PLAYLISTS,
  SET_YOUTUBE_PLAYLISTS,
  ADD_SERVER_PLAYLIST,
  SET_PLAYLIST_INDEX,
  SET_CURRENT_PLAYLIST,
  SET_PUBLIC_PLAYLISTS,
  ADD_PUBLIC_PLAYLISTS,
  REMOVE_SERVER_PLAYLIST,
  UPDATE_PLAYLIST_FULFILLED,
  SET_PLAYLIST_DEFAULT_START_TIME,
  SET_PLAYLIST_DEFAULT_LENGTH
} from '../actionCreators';

const initialState = fromJS({
    youtubePlaylists: [],
    serverPlaylists: [],
    publicPlaylists: [],
    publicPlaylistPage: 1,
    publicPlaylistPageCount: 2,
    playlistIndex: 0,
    currentPlaylist: ''
});

function removeServerItem(state, index) {
  return state.updateIn(['serverPlaylists'], (list) => list.delete(index));
}

function updatePlaylistFulfilled(state, data) {
  return state.updateIn(['serverPlaylists'], function (list) {
    const index = list.findIndex(function (map) {
      return map.get('_id') === data._id;
    });

    if (index >= 0) {
      return list.update(index, function(item) {
        return item.merge(Map(data));
      });
    } else {
      return list;
    }
  });
}

function setPlaylistDefault(type) {
  return function setPlaylistDefaultStartTime(state, value) {
    return state.update(ctx => {
      const currentPlaylist = ctx.get('currentPlaylist');
      const index = ctx.get('playlistIndex');

      return ctx.updateIn([currentPlaylist], list => {
        return list.update(index, item => {
          return item.set(type, value);
        });
      });
    });
  };
}

const setPlaylistDefaultStartTime = setPlaylistDefault('defaultStart');
const setPlaylistDefaultLength = setPlaylistDefault('defaultLength');

function playlistSetter(type) {
  return function (state, playlists) {
    return state.updateIn([type], (list) => list.concat(fromJS(playlists)));
  };
}

const addPublicPlaylist = playlistSetter('publicPlaylists');
const addServerPlaylist = playlistSetter('serverPlaylists');

function setPageData(state, page, pages) {
  return state.withMutations(ctx => ctx.set('publicPlaylistPage', page).set('publicPlaylistPageCount', pages));
}

function addPublicPlaylists(state, {page, pages, playlists}) {
  return state.withMutations((ctx) => {
    setPageData(ctx, page, pages);
    addPublicPlaylist(ctx, playlists);
  });
}

function setPublicPlaylists(state, {page, pages, playlists}) {
  return state.withMutations((ctx) => {
    setPageData(ctx, page, pages);
    ctx.set('publicPlaylists', fromJS(playlists));
  });
}

export default function playlistsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_YOUTUBE_PLAYLISTS:
      return state.set('youtubePlaylists', fromJS(action.payload));
    case SET_SERVER_PLAYLISTS:
      return state.set('serverPlaylists', fromJS(action.payload));
    case ADD_SERVER_PLAYLIST:
      return addServerPlaylist(state, action.payload);
    case SET_PLAYLIST_INDEX:
      return state.set('playlistIndex', action.payload);
    case SET_CURRENT_PLAYLIST:
      return state.set('currentPlaylist', action.payload);
    case REMOVE_SERVER_PLAYLIST:
      return removeServerItem(state, action.payload);
    case UPDATE_PLAYLIST_FULFILLED:
      return updatePlaylistFulfilled(state, action.payload);
    case SET_PUBLIC_PLAYLISTS:
      return setPublicPlaylists(state, action.payload);
    case ADD_PUBLIC_PLAYLISTS:
      return addPublicPlaylists(state, action.payload);
    case SET_PLAYLIST_DEFAULT_START_TIME:
      return setPlaylistDefaultStartTime(state, action.payload);
    case SET_PLAYLIST_DEFAULT_LENGTH:
      return setPlaylistDefaultLength(state, action.payload);
    default:
      return state;
  }
}
