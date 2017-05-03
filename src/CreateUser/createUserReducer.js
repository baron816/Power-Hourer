import { fromJS } from 'immutable';

import { CHANGE_USERNAME, FLIP_SHOW_DIALOG } from '../actionCreators';

const initialState = fromJS({
  username: '',
  showCreateDialog: false
});

function flipShowDialog(state) {
  return state.set('showCreateDialog', !state.get('showCreateDialog'));
}

function changeUsername(state, username) {
  return state.set('username', username);
}

export default function createUserReducer(state = initialState, action) {
  switch (action.type) {
    case FLIP_SHOW_DIALOG:
      return flipShowDialog(state);
    case CHANGE_USERNAME:
      return changeUsername(state, action.username);
    default:
      return state;
  }
}
