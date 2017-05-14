import { fromJS } from 'immutable';

import {
  showCreateDialog,
  setUsername
} from '../actions';

import reducer from './createUserReducer';

describe('createUserReducer', function () {
  describe('#setUsername', function () {
    it('sets the username', function () {
      const initialState = fromJS({
        username: ''
      });

      const action = setUsername('baron');

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        username: 'baron'
      }));
    });
  });

  describe('#showCreateDialog', function () {
    it('flips the create dialog', function () {
      const initialState = fromJS({
        showCreateDialog: false
      });

      const nextState = reducer(initialState, showCreateDialog());

      expect(nextState).toEqual(fromJS({
        showCreateDialog: true
      }));
    });
  });
});
