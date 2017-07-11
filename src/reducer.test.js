import { fromJS, Map } from 'immutable';

import {
  setAccessToken,
  flipNext,
  invertModalState,
  resetCallNext,
  setServerId
} from './actions';

import reducer from './rootReducer';

describe('reducer', function () {
  describe('#setAccessToken', function () {
    const initialState = fromJS({
      accessToken: '',
      googleId: ''
    });

    it('sets the state with the token', function () {
      const action = setAccessToken({accessToken: 'somelongstringherewithrandomchars', googleId: 'mygoogleid'});

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        accessToken: 'somelongstringherewithrandomchars',
        googleId: 'mygoogleid'
      }));
    });
  });

  describe('#flipNext', function () {
    it('reverses callNext', function () {
      const initialState = fromJS({
        callNext: false
      });

      const nextState = reducer(initialState, flipNext());

      expect(nextState).toEqual(Map({
        callNext: true
      }));
    });
  });


  describe('#showModal', function () {
    it('switches on and off', function () {
      const initialState = fromJS({
        showModal: false
      });

      const nextState = reducer(initialState, invertModalState());

      expect(nextState).toEqual(Map({
        showModal: true
      }));
    });
  });

  describe('#resetCallNext', function () {
    it('switches callNext to true when false', function () {
      const initialState = fromJS({
        callNext: false
      });

      const nextState = reducer(initialState, resetCallNext());

      expect(nextState).toEqual(Map({
        callNext: true
      }));
    });

    it('remains true if true', function () {
      const initialState = fromJS({
        callNext: true
      });

      const nextState = reducer(initialState, resetCallNext());

      expect(nextState).toEqual(Map({
        callNext: true
      }));
    });
  });

  describe('#setServerId', function () {
    it('sets server user id', function () {
      const initialState = fromJS({
        serverId: ''
      });

      const action = setServerId('baueno2uni73h');

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        serverId: 'baueno2uni73h'
      }));
    });
  });
});
