import { fromJS } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  SHOW_MODAL,
  SET_SERVER_ID
} from './actionCreators';

// import { REHYDRATE } from 'redux-persist/constants';

const initialState = fromJS({
  accessToken: '',
  googleId: '',
  videoLength: 60,
  callNext: true,
  showModal: false,
  serverId: ''
});

function setToken(state, token, id) {
  return state.withMutations(map => map.set('accessToken', token).set('googleId', id));
}

function flipState(key) {
  return function (state) {
    return state.set(key, !state.get(key));
  };
}

const flipModal = flipState('showModal');
const flipNext = flipState('callNext');

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return setToken(state, action.token, action.googleId);
    case CHANGE_VIDEO_LENGTH:
      return state.set('videoLength', Number(action.length));
    case FLIP_NEXT:
      return flipNext(state);
    case SHOW_MODAL:
      return flipModal(state);
    case SET_SERVER_ID:
      return state.set('serverId', action.id);
    default:
      return state;
  }
}
