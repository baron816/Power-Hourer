import { fromJS, List, Map } from 'immutable';

import reducer from './playlistItemsReducer';

import {
  fetchPlaylistItemsFulfilled,
  nextVideo,
  goToVideo,
  changeVideoStart,
  changeVideoLength,
  moveItem,
  removeItemFulfilled,
  addPlaylistItemFulfilled
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
        playlistItems: [{id: 'aegvae'}, {id: 'ibnaieubn'}, {id: 'vuiab3ta'}],
        playlistItemsIndex: 1
      });

      const action = changeVideoStart(45);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        playlistItems: [{id: 'aegvae'},{id: 'ibnaieubn', startTime: 45}, {id: 'vuiab3ta'}],
        playlistItemsIndex: 1
      }));
    });
  });

  describe('#changeVideoLength', function () {
    it('sets the length of a video at an index', function () {
      const initialState = fromJS({
        playlistItems: [{id: 'aegvae'}, {id: 'ibnaieubn'}, {id: 'vuiab3ta'}],
        playlistItemsIndex: 1
      });

      const action = changeVideoLength(80);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        playlistItems: [{id: 'aegvae'},{id: 'ibnaieubn', videoLength: 80}, {id: 'vuiab3ta'}],
        playlistItemsIndex: 1
      }));
    });
  });

  describe('#moveItem', function () {
    const initialState = fromJS({
      playlistItems: [{id: 'aveavaeva'}, {id: 'eajvno2i'}, {id: 'b902an'}, {id: 'veiano2in'}],
      playlistItemsIndex: 2
    });

    it('moves item in playlistItems and doesnt change the playlist index', function () {
      const action = moveItem({oldIndex: 1, newIndex: 0});

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        playlistItems: [{id: 'eajvno2i'}, {id: 'aveavaeva'}, {id: 'b902an'}, {id: 'veiano2in'}],
        playlistItemsIndex: 2
      }));
    });

    it('moves item to before current index and increases index', function () {
      const action = moveItem({oldIndex: 3, newIndex: 0});

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        playlistItems: [{id: 'veiano2in'}, {id: 'aveavaeva'}, {id: 'eajvno2i'}, {id: 'b902an'}],
        playlistItemsIndex: 3
      }));
    });

    it('moves item to after current index and decrease index', function () {
      const action = moveItem({oldIndex: 0, newIndex: 3});

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        playlistItems: [{id: 'eajvno2i'}, {id: 'b902an'}, {id: 'veiano2in'}, {id: 'aveavaeva'}],
        playlistItemsIndex: 1
      }));

      it('moves current item and adjusts index to be same', function () {
        const action = moveItem({oldIndex: 2, newIndex: 0});

        const nextState = reducer(initialState, action);

        expect(nextState).toEqual(fromJS({
          playlistItems: [{id: 'b902an'}, {id: 'aveavaeva'}, {id: 'eajvno2i'}, {id: 'veiano2in'}],
          playlistItemsIndex: 0
        }));
      });
    });
  });
});

describe('#removeItem', () => {
  const initialState = fromJS({
    playlistItems: [{_id: 'c2oun1oun'}, {_id: 'auen3oun'}, {_id: '1no8j08a'}, {_id: 'n90a0va'}]
  });

  it('removes a pl item from the playlist', () => {
    const action = removeItemFulfilled('1no8j08a');

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(fromJS({
      playlistItems: [{_id: 'c2oun1oun'}, {_id: 'auen3oun'}, {_id: 'n90a0va'}]
    }));
  });

  it('wont change the playlistItem if item is not present', () => {
    const action = removeItemFulfilled('notThere');

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(fromJS({
      playlistItems: [{_id: 'c2oun1oun'}, {_id: 'auen3oun'}, {_id: '1no8j08a'}, {_id: 'n90a0va'}]
    }));
  });
});

describe('#addItem', () => {
  it('add an item', () => {
    const initialState = fromJS({
      playlistItems: [{_id: 'c2oun1oun'}, {_id: 'auen3oun'}, {_id: '1no8j08a'}, {_id: 'n90a0va'}]
    });

    const action = addPlaylistItemFulfilled({_id: '280h1ouna'});

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(fromJS({
      playlistItems: [{_id: 'c2oun1oun'}, {_id: 'auen3oun'}, {_id: '1no8j08a'}, {_id: 'n90a0va'}, {_id: '280h1ouna'}]
    }));
  });
});
