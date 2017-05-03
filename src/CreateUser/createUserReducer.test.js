import { fromJS } from 'immutable';

import { CHANGE_USERNAME, FLIP_SHOW_DIALOG } from '../actionCreators';

import reducer from './createUserReducer';

describe('createUserReducer', function () {
  describe('CHANGE_USERNAME', function () {
    it('sets the username', function () {
      const initialState = fromJS({
        username: ''
      });

      const action = {
        type: CHANGE_USERNAME,
        username: 'baron'
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        username: 'baron'
      }));
    });
  });

  describe('FLIP_SHOW_DIALOG', function () {
    it('flips the create dialog', function () {
      const initialState = fromJS({
        showCreateDialog: false
      });

      const nextState = reducer(initialState, {type: FLIP_SHOW_DIALOG});

      expect(nextState).toEqual(fromJS({
        showCreateDialog: true
      }));
    });
  });
});
