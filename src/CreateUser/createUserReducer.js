import { fromJS } from 'immutable';

import { CHANGE_USERNAME, FLIP_SHOW_DIALOG } from '../actionCreators';

const initialState = fromJS({
  username: '',
  showCreateDialog: false
});

export default function createUserReducer(state = initialState, action) {
  switch (action.type) {
    case FLIP_SHOW_DIALOG:
      return state.update('showCreateDialog', bool => !bool);
    case CHANGE_USERNAME:
      return state.set('username', action.payload);
    default:
      return state;
  }
}
