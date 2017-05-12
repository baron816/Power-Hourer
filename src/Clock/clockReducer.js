import { fromJS } from 'immutable';

import { CHANGE_PLAY_STATE, INCREMENT_TIME, RESET_CLOCK } from '../actionCreators';

const initialState = fromJS({
  playing: false,
  time: 0,
});

function incrementTime(state) {
  if (state.get('playing')) {
    return state.set('time', state.get('time') + 1);
  }
  return state;
}

export default function clockReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PLAY_STATE:
      return state.set('playing', action.bool);
    case INCREMENT_TIME:
      return incrementTime(state);
    case RESET_CLOCK:
      return state.set('time', 0);
    default:
      return state;
  }
}
