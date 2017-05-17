import { fromJS } from 'immutable';

import {
  SET_PLAYLIST_ITEMS,
  NEXT_VIDEO,
  GOTO_VIDEO,
  CHANGE_VIDEO_START,
  MOVE_ITEM
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

function changeVideoStart(state, {index, time}) {
  return state.updateIn(['playlistItems'], list => list.updateIn([Number(index)], map => map.set('startTime', Number(time))));
}

function moveItem(state, {oldIndex, newIndex}) {
  const playlistItemsIndex = state.get('playlistItemsIndex');
  const oldItem = state.get('playlistItems').get(oldIndex);
  return state.withMutations((ctx) => {
    if (oldIndex > playlistItemsIndex && newIndex < playlistItemsIndex) {
      ctx.set('playlistItemsIndex', playlistItemsIndex + 1);
    } else if (oldIndex < playlistItemsIndex && newIndex > playlistItemsIndex) {
      ctx.set('playlistItemsIndex', playlistItemsIndex - 1);
    } else if (oldIndex === playlistItemsIndex) {
      ctx.set('playlistItemsIndex', newIndex);
    }

    ctx.updateIn(['playlistItems'], list => list.delete(oldIndex).insert(newIndex, oldItem));
  });
}

export default function playlistItemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYLIST_ITEMS:
      return state.set('playlistItems', fromJS(action.payload));
    case NEXT_VIDEO:
      return incrementPlaylistIndex(state);
    case GOTO_VIDEO:
      return state.set('playlistItemsIndex', Number(action.payload));
    case CHANGE_VIDEO_START:
      return changeVideoStart(state, action.payload);
    case MOVE_ITEM:
      return moveItem(state, action.payload);
    default:
      return state;
  }
}
