import { fromJS, Map, List } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  GET_PLAYLISTS,
  CHANGE_PLAY_STATE,
  INCREMENT_TIME,
  RESET_CLOCK,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  SHOW_MODAL,
  SET_PLAYLIST_NAME
} from './actionCreators';

import reducer from './rootReducer';

describe('reducer', function () {
  describe('SET_ACCESS_TOKEN', function () {
    const initialState = fromJS({
      accessToken: ''
    });

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

  describe('CHANGE_PLAY_STATE', function () {
    it('switches the play state', function () {
      const initialState = fromJS({
        playing: true
      });

      const action = {
        type: CHANGE_PLAY_STATE,
        bool: false
      };


      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playing: false
      }));
    });
  });

  describe('INCREMENT_TIME', function () {
    it('increments the clock when playing', function () {
      const initialState = fromJS({
        playing: true,
        time: 8
      });

      const nextState = reducer(initialState, { type: INCREMENT_TIME });

      expect(nextState).toEqual(Map({
        playing: true,
        time: 9
      }));
    });

    it('doesnt increment the clock when it is not playing', function () {
      const initialState = fromJS({
        playing: false,
        time: 8
      });

      const nextState = reducer(initialState, { type: INCREMENT_TIME });

      expect(nextState).toEqual(Map({
        playing: false,
        time: 8
      }));
    });
  });

  describe('RESET_CLOCK', function () {
    it('resets the clock time to zero', function () {
      const initialState = fromJS({
        time: 45
      });

      const nextState = reducer(initialState, { type: RESET_CLOCK });

      expect(nextState).toEqual(Map({
        time: 0
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
