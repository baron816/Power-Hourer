import { fromJS, Map, List } from 'immutable';

import {
  CHANGE_PLAY_STATE,
  INCREMENT_TIME,
  RESET_CLOCK,
} from '../actionCreators';

import reducer from './clockReducer';

describe('clockReducer', function () {
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
});
