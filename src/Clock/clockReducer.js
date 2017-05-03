import { fromJS } from 'immutable';

import { CHANGE_PLAY_STATE, INCREMENT_TIME, RESET_CLOCK } from '../actionCreators';

const initialState = fromJS({
  playing: false,
  time: 0,
});

function changePlayState(state, bool) {
  return state.set('playing', bool);
}

function incrementTime(state) {
  if (state.get('playing')) {
    return state.set('time', state.get('time') + 1);
  }
  return state;
}

function resetClock(state) {
  return state.set('time', 0);
}

export default function clockReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PLAY_STATE:
      return changePlayState(state, action.bool);
    case INCREMENT_TIME:
      return incrementTime(state);
    case RESET_CLOCK:
      return resetClock(state);
    default:
      return state;
  }
}
