import { fromJS, Map } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  SHOW_MODAL
} from './actionCreators';

import reducer from './rootReducer';

describe('reducer', function () {
  describe('SET_ACCESS_TOKEN', function () {
    const initialState = fromJS({
      accessToken: '',
      googleId: ''
    });

    it('sets the state with the token', function () {
      const action = {
        type: SET_ACCESS_TOKEN,
        token: 'somelongstringherewithrandomchars',
        googleId: 'mygoogleid'
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        accessToken: 'somelongstringherewithrandomchars',
        googleId: 'mygoogleid'
      }));
    });
  });

  describe('CHANGE_VIDEO_LENGTH', function () {
    it('sets the video length', function () {
      const initialState = fromJS({
        videoLength: 60
      });

      const action = {
        type: CHANGE_VIDEO_LENGTH,
        length: 80
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        videoLength: 80
      }));
    });
  });

  describe('FLIP_NEXT', function () {
    it('reverses callNext', function () {
      const initialState = fromJS({
        callNext: false
      });

      const nextState = reducer(initialState, { type: FLIP_NEXT });

      expect(nextState).toEqual(Map({
        callNext: true
      }));
    });
  });


  describe('SHOW_MODAL', function () {
    it('switches on and off', function () {
      const initialState = fromJS({
        showModal: false
      });

      const nextState = reducer(initialState, { type: SHOW_MODAL });

      expect(nextState).toEqual(Map({
        showModal: true
      }));
    });
  });
});
