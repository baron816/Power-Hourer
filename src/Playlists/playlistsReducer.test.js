import { fromJS, List, Map } from 'immutable';

import reducer from './playlistsReducer';
import { GET_PLAYLISTS, SET_PLAYLIST_INDEX } from '../actionCreators';

describe('playlistsReducer', function () {
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
        playlists: List([Map({name: 'Cheezy-Tunez'}), Map({name: 'Hot Girl'})])
      }));
    });
  });

  describe('SET_PLAYLIST_INDEX', function () {
    it('correctly sets the currentPlaylistName', function () {
      const initialState = fromJS({
        playlistIndex: 0
      });

      const action = {
        type: SET_PLAYLIST_INDEX,
        index: 4
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistIndex: 4
      }));
    });
  });
});
