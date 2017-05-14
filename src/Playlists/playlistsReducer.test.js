import { fromJS, List, Map } from 'immutable';

import reducer from './playlistsReducer';

import {
  setCurrentPlaylist,
  setPlaylistIndex,
  fetchYoutubePlaylistFulfilled,
  fetchServerPlaylistsFulfilled,
  createServerPlaylistFulfilled
} from '../actions';

describe('#playlistsReducer', function () {
  describe('#fetchYoutubePlaylistFulfilled', function () {
    const initialState = fromJS({
      youtubePlaylists: [{name: 'Partytime'}]
    });

    it('sets the state with the playlists', function () {
      const action = fetchYoutubePlaylistFulfilled([{name: 'Cheezy-Tunez'}, {name: 'Hot Girl'}]);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        youtubePlaylists: List([Map({name: 'Cheezy-Tunez'}), Map({name: 'Hot Girl'})])
      }));
    });
  });

  describe('#setPlaylistIndex', function () {
    it('correctly sets the currentPlaylistName', function () {
      const initialState = fromJS({
        playlistIndex: 0
      });

      const action = setPlaylistIndex(4);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        playlistIndex: 4
      }));
    });
  });

  describe('#fetchServerPlaylistsFulfilled', function () {
    it('sets the state with playlists from the server', function () {
      const initialState = fromJS({
        serverPlaylists: [{name: 'Partytime'}]
      });

      const action = fetchServerPlaylistsFulfilled([{name: 'TSwift/Jason Durulo'}, {name: 'Jock Jams'}]);


      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        serverPlaylists: List([Map({name: 'TSwift/Jason Durulo'}), Map({name: 'Jock Jams'})])
      }));
    });
  });

  describe('#createServerPlaylistFulfilled', function () {
    it('adds a playlist to the list of server plalists', function () {
      const initialState = fromJS({
        serverPlaylists: [{name: 'Hot girl'}]
      });

      const action = createServerPlaylistFulfilled([{name: 'funfun'}]);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        serverPlaylists: List([Map({name: 'Hot girl'}), Map({name: 'funfun'})])
      }));
    });
  });

  describe('#setCurrentPlaylist', function () {
    it('sets the currentPlaylist', function () {
      const initialState = fromJS({
        currentPlaylist: ''
      });

      const action = setCurrentPlaylist('serverPlaylists');

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(Map({
        currentPlaylist: 'serverPlaylists'
      }));
    });
  });
});
