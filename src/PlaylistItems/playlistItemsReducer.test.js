import { fromJS, List, Map } from 'immutable';

import reducer from './playlistItemsReducer';

import { GET_PLAYLIST_ITEMS, NEXT_VIDEO, GOTO_VIDEO, CHANGE_VIDEO_START } from '../actionCreators';

describe('playlistItemsReducer', function () {
  describe('GET_PLAYLIST_ITEMS', function () {
    it('sets the playlistItems state when blank', function () {
      const initialState = fromJS({
        playlistItems: []
      });

      const action = {
        type: GET_PLAYLIST_ITEMS,
        payload: [{id: 'asr3q212'}, {id: 'benoauhe2'}]
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItems: List([Map({id: 'asr3q212'}), Map({id: 'benoauhe2'})])
      }));
    });

    it('resets the playlistItems if not blank', function () {
      const initialState = fromJS({
        playlistItems: [{id: 'asr3q212'}, {id: 'benoauhe2'}]
      });

      const action = {
        type: GET_PLAYLIST_ITEMS,
        payload: [{id: '2gdfgae'}, {id: 'eawoh29t'}, {id: '8t9ghs2'}]
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItems: List([Map({id: '2gdfgae'}), Map({id: 'eawoh29t'}), Map({id: '8t9ghs2'})])
      }));
    });
  });

  describe('GOTO_VIDEO', function () {
    it('goes to the selected video', function () {
      const initialState = fromJS({
        playlistItemsIndex: 0
      });

      const action = {
        type: GOTO_VIDEO,
        index: 2
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItemsIndex: 2
      }));
    });
  });

  describe('NEXT_VIDEO', function () {
    it('goes to the next video', function () {
      const initialState = fromJS({
        playlistItemsIndex: 1,
        playlistItems: [{id: 'asdgew'}, {id: '32srfrg'}, {id: 'ydfbsbm2'}]
      });

      const action = {
        type: NEXT_VIDEO
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItemsIndex: 2,
        playlistItems: List([Map({id: 'asdgew'}), Map({id: '32srfrg'}), Map({id: 'ydfbsbm2'})])
      }));
    });

    it('does not go to the next if it is at the end', function () {
      const initialState = fromJS({
        playlistItemsIndex: 2,
        playlistItems: [{id: 'asdgew'}, {id: '32srfrg'}, {id: 'ydfbsbm2'}]
      });

      const action = {
        type: NEXT_VIDEO
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItemsIndex: 2,
        playlistItems: List([Map({id: 'asdgew'}), Map({id: '32srfrg'}), Map({id: 'ydfbsbm2'})])
      }));
    });
  });

  describe('CHANGE_VIDEO_START', function () {
    it('sets the start time of a video at an index', function () {
      const initialState = fromJS({
        playlistItems: [{id: 'aegvae'}, {id: 'ibnaieubn'}, {id: 'vuiab3ta'}]
      });

      const action = {
        type: CHANGE_VIDEO_START,
        index: 1,
        time: 45
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItems: List([Map({id: 'aegvae'}), Map({id: 'ibnaieubn', startTime: 45}), Map({id: 'vuiab3ta'})])
      }));
    });
  });
});
