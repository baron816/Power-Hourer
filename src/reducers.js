import { combineReducers } from 'redux-immutable';

import root from './rootReducer';
import playlistItems from './PlaylistItems/playlistItemsReducer';
import playlists from './Playlists/playlistsReducer';
import clock from './Clock/clockReducer';
import error from './ErrorBar/errorReducer';
import searchVideos from './SearchVideos/searchVideosReducer';
import { RESET_STATE } from './actionCreators';

const appReducer = combineReducers({
  root,
  playlistItems,
  playlists,
  clock,
  error,
  searchVideos
});

export default function reducers(state, action) {
  if (action.type === RESET_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
}
