import { Map, List } from 'immutable';
import { createSelector } from 'reselect';
import { dismember, composer } from './utils';

const getIn = dismember('Map', 'getIn');
const withGetIn = composer(getIn);
//Clock
// export const time = (state) => state.getIn(['clock', 'time']);
export const time = withGetIn(['clock', 'time']);
export const currentPlaylist = withGetIn(['playlists', 'currentPlaylist']);

//ErrorBar
export const open = withGetIn(['error', 'open']);
export const message = withGetIn(['error', 'message']);

//PlaylistItems
export const playlistItems = withGetIn(['playlistItems', 'playlistItems']);
export const playlistItemsIndex = withGetIn(['playlistItems', 'playlistItemsIndex']);

//Playlists
export const playlistIndex = withGetIn(['playlists', 'playlistIndex']);
// -> currentPlaylist

//PublicPlaylists
export const publicPlaylists = withGetIn(['playlists', 'publicPlaylists']);
export const publicPlaylistPage = withGetIn(['playlists', 'publicPlaylistPage']);
export const publicPlaylistPageCount = withGetIn(['playlists', 'publicPlaylistPageCount']);

//ServerPlaylists
export const serverPlaylists = withGetIn(['playlists', 'serverPlaylists']);
export const youtubePlaylists = withGetIn(['playlists', 'youtubePlaylists']);

export const selectedPlaylist = createSelector(
  [currentPlaylist, playlist, playlistIndex],
  (list, plFn, index) => plFn(list).get(index, List())
);

function playlist(state) {
  return function (list) {
    return state.getIn(['playlists', list], List());
  };
}

//Video
// -> playlistItemsIndex
// -> playlistItems

export const video = createSelector(
    [playlistItems, playlistItemsIndex],
    (items, index) => items.get(index, Map())
);

export function videoLength(state, props) {
  return createSelector(
    video,
    (vid) => vid.get('videoLength') || props.defaultLength || 60
  )(state, props);
}

export function videoStart(state, ownProps) {
  return createSelector(
    video,
    function (vid) {
      const time = vid.get('startTime');

      return time !== undefined ? time : ownProps.defaultStart || 30;
    }
  )(state, ownProps);
}

export const videoEnd = createSelector(
  [videoStart, videoLength],
  (start, length) => start + length
);


export const autoplay = createSelector(
  playlistItemsIndex,
  (index) => index === 0 ? 0 : 1
);

export const callNext = withGetIn(['root', 'callNext']);
export const showModal = withGetIn(['root', 'showModal']);

//ServerModal

export const playlistExposed = createSelector(
  selectedPlaylist,
  (playlist) => playlist.get('exposed')
);

export const defaultStart = createSelector(
  selectedPlaylist,
  (playlist) => playlist.get('defaultStart', 30)
);

export const defaultLength = createSelector(
  selectedPlaylist,
  (playlist) => playlist.get('defaultLength', 60)
);

//VideoModalHOC


//VideoModal
export const loaded = withGetIn(['playlistItems', 'loaded']);

//App
export const accessToken = withGetIn(['root', 'accessToken']);
export const serverId = withGetIn(['root', 'serverId']);
// -> currentPlaylist

//PlaylistItemsEpcis
export const playlistId = createSelector(
  [serverPlaylists, playlistIndex],
  (playlist, index) => playlist.get(index).get('_id')
);

export const playlistItemId = createSelector(
  [playlistItems, playlistItemsIndex],
  (items, index) => items.get(index).get('_id')
);

//searchVideos
export const searchResults = withGetIn(['searchVideos', 'searchResults']);
export const nextPageToken = withGetIn(['searchVideos', 'nextPageToken']);
export const searching = withGetIn(['searchVideos', 'searching']);

export function selectedFromSearch(index) {
  return createSelector(
    searchResults,
    (results) => results.get(index)
  );
}
