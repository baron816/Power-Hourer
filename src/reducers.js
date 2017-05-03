import { combineReducers } from 'redux-immutable';

import root from './rootReducer';
import playlistItems from './PlaylistItems/playlistItemsReducer';
import playlists from './Playlists/playlistsReducer';
import clock from './Clock/clockReducer';
import createUser from './CreateUser/createUserReducer';

export default combineReducers({
  root,
  playlistItems,
  playlists,
  clock,
  createUser
});
