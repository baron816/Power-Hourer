import { fromJS, Map, List } from 'immutable';

import {
  SET_ACCESS_TOKEN,
  GET_PLAYLISTS,
  GET_PLAYLIST_ITEMS
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
        playlistItems: List([{id: 'asr3q212'}, {id: 'benoauhe2'}])
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
        playlistItems: List([{id: '2gdfgae'}, {id: 'eawoh29t'}, {id: '8t9ghs2'}])
      }));
    });
  });
});
