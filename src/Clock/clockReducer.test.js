import { fromJS, Map } from 'immutable';

import {
  resetClock,
  incrementTime,
  changePlayState
} from '../actions';

import reducer from './clockReducer';

describe('clockReducer', function () {
  describe('#changePlayState', function () {
    it('switches the play state', function () {
      const initialState = fromJS({
        playing: true
      });

      const action = changePlayState(false);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playing: false
      }));
    });
  });

  describe('#incrementTime', function () {
    it('increments the clock when playing', function () {
      const initialState = fromJS({
        playing: true,
        time: 8
      });

      const nextState = reducer(initialState, incrementTime());

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

      const nextState = reducer(initialState, incrementTime());

      expect(nextState).toEqual(Map({
        playing: false,
        time: 8
      }));
    });
  });

  describe('#resetClock', function () {
    it('resets the clock time to zero', function () {
      const initialState = fromJS({
        time: 45
      });

      const nextState = reducer(initialState, resetClock());

      expect(nextState).toEqual(Map({
        time: 0
      }));
    });
  });
});
