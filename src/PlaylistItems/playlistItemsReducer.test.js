import { fromJS, List, Map } from 'immutable';

import reducer from './playlistItemsReducer';

import {
  fetchPlaylistItemsFulfilled,
  nextVideo,
  goToVideo,
  changeVideoStart,
  moveItem
} from '../actions';

describe('playlistItemsReducer', function () {
  describe('#fetchPlaylistItemsFulfilled', function () {
    it('sets the playlistItems state when blank', function () {
      const initialState = fromJS({
        playlistItems: []
      });

      const action = fetchPlaylistItemsFulfilled([{id: 'asr3q212'}, {id: 'benoauhe2'}]);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItems: List([Map({id: 'asr3q212'}), Map({id: 'benoauhe2'})])
      }));
    });

    it('resets the playlistItems if not blank', function () {
      const initialState = fromJS({
        playlistItems: [{id: 'asr3q212'}, {id: 'benoauhe2'}]
      });

      const action = fetchPlaylistItemsFulfilled([{id: '2gdfgae'}, {id: 'eawoh29t'}, {id: '8t9ghs2'}]);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItems: List([Map({id: '2gdfgae'}), Map({id: 'eawoh29t'}), Map({id: '8t9ghs2'})])
      }));
    });
  });

  describe('#goToVideo', function () {
    it('goes to the selected video', function () {
      const initialState = fromJS({
        playlistItemsIndex: 0
      });

      const action = goToVideo(2);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItemsIndex: 2
      }));
    });
  });

  describe('#nextVideo', function () {
    it('goes to the next video', function () {
      const initialState = fromJS({
        playlistItemsIndex: 1,
        playlistItems: [{id: 'asdgew'}, {id: '32srfrg'}, {id: 'ydfbsbm2'}]
      });

      const nextState = reducer(initialState, nextVideo());

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

      const nextState = reducer(initialState, nextVideo());

      expect(nextState).toEqual(Map({
        playlistItemsIndex: 2,
        playlistItems: List([Map({id: 'asdgew'}), Map({id: '32srfrg'}), Map({id: 'ydfbsbm2'})])
      }));
    });
  });

  describe('#changeVideoStart', function () {
    it('sets the start time of a video at an index', function () {
      const initialState = fromJS({
        playlistItems: [{id: 'aegvae'}, {id: 'ibnaieubn'}, {id: 'vuiab3ta'}]
      });

      const action = changeVideoStart(1, 45);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItems: List([Map({id: 'aegvae'}), Map({id: 'ibnaieubn', startTime: 45}), Map({id: 'vuiab3ta'})])
      }));
    });
  });

  describe('#moveItem', function () {
    it('move in item in playlistItems', function () {
      const initialState = fromJS({
        playlistItems: [{id: 'aveavaeva'}, {id: 'eajvno2i'}, {id: 'b902an'}, {id: 'veiano2in'}]
      });

      const action = moveItem({oldIndex: 3, newIndex: 1});

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistItems: List([Map({id: 'aveavaeva'}), Map({id: 'veiano2in'}), Map({id: 'eajvno2i'}), Map({id: 'b902an'})])
      }));
    });
  });
});
