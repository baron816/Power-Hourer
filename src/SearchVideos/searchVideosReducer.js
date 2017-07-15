import { fromJS } from 'immutable';

import {
  SEARCH_VIDEOS_FULFILLED,
  FLIP_SEARCHING,
  SET_SEARCHING_TO_FALSE
} from '../actionCreators';

const initialState = fromJS({
  searchResults: [],
  nextPageToken: '',
  searching: false
});

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case SEARCH_VIDEOS_FULFILLED:
      return state.withMutations(ctx => ctx.set('searchResults', fromJS(payload.videos)).set('nextPageToken', payload.nextPageToken));
    case FLIP_SEARCHING:
      return state.update('searching', bool => !bool);
    case SET_SEARCHING_TO_FALSE:
      return state.set('searching', false);
    default:
      return state;
  }
}
