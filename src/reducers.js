import { combineReducers } from 'redux-immutable';

import root from './rootReducer';
import playlistItems from './PlaylistItems/playlistItemsReducer';
import playlists from './Playlists/playlistsReducer';

export default combineReducers({
  root,
  playlistItems,
  playlists
});
