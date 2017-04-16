import { fromJS, Map, List } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  GET_PLAYLISTS,
  GET_PLAYLIST_ITEMS,
  NEXT_VIDEO,
  GOTO_VIDEO,
  CHANGE_PLAY_STATE,
  INCREMENT_TIME,
  RESET_CLOCK,
  CHANGE_VIDEO_LENGTH,
  FLIP_NEXT,
  CHANGE_VIDEO_START
} from './actionCreators';

import reducer from './reducer';

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

  describe('GET_PLAYLISTS', function () {
    const initialState = fromJS({
      accessToken: '',
      playlists: []
    });

    it('sets the state with the playlists', function () {
      const action = {
        type: GET_PLAYLISTS,
        payload: [{name: 'Cheezy-Tunez'}, {name: 'Hot Girl'}]
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        accessToken: '',
        playlists: List([{name: 'Cheezy-Tunez'}, {name: 'Hot Girl'}])
      }));
    });
  });

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
        playlistIndex: 0
      });

      const action = {
        type: GOTO_VIDEO,
        index: 2
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistIndex: 2
      }));
    });
  });

  describe('NEXT_VIDEO', function () {
    it('goes to the next video', function () {
      const initialState = fromJS({
        playlistIndex: 1,
        playlistItems: [{id: 'asdgew'}, {id: '32srfrg'}, {id: 'ydfbsbm2'}]
      });

      const action = {
        type: NEXT_VIDEO
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistIndex: 2,
        playlistItems: List([Map({id: 'asdgew'}), Map({id: '32srfrg'}), Map({id: 'ydfbsbm2'})])
      }));
    });

    it('does not go to the next if it is at the end', function () {
      const initialState = fromJS({
        playlistIndex: 2,
        playlistItems: [{id: 'asdgew'}, {id: '32srfrg'}, {id: 'ydfbsbm2'}]
      });

      const action = {
        type: NEXT_VIDEO
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistIndex: 2,
        playlistItems: List([Map({id: 'asdgew'}), Map({id: '32srfrg'}), Map({id: 'ydfbsbm2'})])
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
