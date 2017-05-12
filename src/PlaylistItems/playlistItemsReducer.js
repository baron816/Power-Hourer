import { fromJS } from 'immutable';

import {
  GET_PLAYLIST_ITEMS,
  NEXT_VIDEO,
  GOTO_VIDEO,
  CHANGE_VIDEO_START
} from '../actionCreators';

const initialState = fromJS({
    playlistItems: [],
    playlistItemsIndex: 0
});

function incrementPlaylistIndex(state) {
  if (state.get('playlistItemsIndex') < state.get('playlistItems').size - 1) {
    return state.set('playlistItemsIndex', state.get('playlistItemsIndex') + 1);
  }
  return state;
}

function changeVideoStart(state, index, time) {
  return state.updateIn(['playlistItems'], list => list.updateIn([Number(index)], map => map.set('startTime', Number(time))));
}

export default function playlistItemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAYLIST_ITEMS:
      return state.set('playlistItems', fromJS(action.payload));
    case NEXT_VIDEO:
      return incrementPlaylistIndex(state);
    case GOTO_VIDEO:
      return state.set('playlistItemsIndex', Number(action.index));
    case CHANGE_VIDEO_START:
      return changeVideoStart(state, action.index, action.time);
    default:
      return state;
  }
}
