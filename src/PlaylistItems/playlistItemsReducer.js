import { fromJS } from 'immutable';

import {
  SET_PLAYLIST_ITEMS,
  NEXT_VIDEO,
  GOTO_VIDEO,
  CHANGE_VIDEO_START,
  MOVE_ITEM,
  SET_LOADED,
  CHANGE_VIDEO_LENGTH,
  REMOVE_ITEM_FULFILLED,
  ADD_PLAYLIST_ITEM_FULFILLED
} from '../actionCreators';

const initialState = fromJS({
    playlistItems: [],
    playlistItemsIndex: 0,
    loaded: false
});

function incrementPlaylistIndex(state) {
  if (state.get('playlistItemsIndex') < state.get('playlistItems').size - 1) {
    return state.update('playlistItemsIndex', index => index + 1);
  }
  return state;
}

function moveItem(state, {oldIndex, newIndex}) {
  return state.withMutations((ctx) => {
    const playlistItemsIndex = ctx.get('playlistItemsIndex');
    const oldItem = ctx.get('playlistItems').get(oldIndex);

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

function removeItem(state, id) {
  const index = state.get('playlistItems').findIndex(item => item.get('_id') === id);

  if (index >= 0) {
    return state.updateIn(['playlistItems'], list => list.remove(index));
  } else {
    return state;
  }
}

function addItem(state, item) {
  return state.updateIn(['playlistItems'], items => items.push(fromJS(item)));
}

function changeProperty(property) {
  return function (state, time) {
    return state.update(ctx => {
      const index = ctx.get('playlistItemsIndex');

      return ctx.updateIn(['playlistItems'], list => {
        return list.updateIn([index], item => {
          return item.set(property, time);
        });
      });
    });
  };
}

const changeVideoStart = changeProperty('startTime');
const changeVideoLength = changeProperty('videoLength');

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
    case CHANGE_VIDEO_LENGTH:
      return changeVideoLength(state, action.payload);
    case MOVE_ITEM:
      return moveItem(state, action.payload);
    case SET_LOADED:
      return state.set('loaded', action.payload);
    case REMOVE_ITEM_FULFILLED:
      return removeItem(state, action.payload);
    case ADD_PLAYLIST_ITEM_FULFILLED:
      return addItem(state, action.payload);
    default:
      return state;
  }
}
