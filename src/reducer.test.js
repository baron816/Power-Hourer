import { fromJS, Map } from 'immutable';

import { SET_ACCESS_TOKEN } from './actionCreators';
import reducer from './reducer';

describe('reducer', function () {
  const initialState = fromJS({
    accessToken: ''
  });

  describe('SET_ACCESS_TOKEN', function () {
    it('sets the state with the token', function () {
      const action = {
        type: SET_ACCESS_TOKEN,
        token: 'somelongstringherewithrandomchars'
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        accessToken: 'somelongstringherewithrandomchars'
      }));
    });
  });
});
