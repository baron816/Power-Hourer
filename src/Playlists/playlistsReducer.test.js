import { fromJS, List, Map } from 'immutable';

import reducer from './playlistsReducer';

import {
  setCurrentPlaylist,
  setPlaylistIndex,
  fetchYoutubePlaylistFulfilled,
  fetchServerPlaylistsFulfilled,
  fetchPublicPlaylistsFulfilled,
  createServerPlaylistFulfilled,
  fetchNextPublicPlaylistsPageFulfilled,
  updatePlaylistFulfilled,
  setPlaylistDefaultStartTime,
  setPlaylistDefaultLength
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

      expect(nextState).toEqual(fromJS({
        serverPlaylists: [{name: 'Hot girl'}, {name: 'funfun'}]
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

  describe('#updatePlaylistFulfilled', function () {
    const initialState = fromJS({
      serverPlaylists: [
        {_id: 'aba1', title: 'Cheezy-Tunez'},
        {_id: 'avce2', title: 'JockJams'},
        {_id: 'ij1n', title: 'What not to wear'}
      ]
    });

    it('updates the correct item', function () {
      const action = updatePlaylistFulfilled({_id: 'avce2', title: 'Jock-Jams'});

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        serverPlaylists: [
          {_id: 'aba1', title: 'Cheezy-Tunez'},
          {_id: 'avce2', title: 'Jock-Jams'},
          {_id: 'ij1n', title: 'What not to wear'}
        ]
      }));
    });

    it('wont change anything if _id not found', function () {
      const action = updatePlaylistFulfilled({_id: 'bad', title: 'Jock-Jams'});

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        serverPlaylists: [
          {_id: 'aba1', title: 'Cheezy-Tunez'},
          {_id: 'avce2', title: 'JockJams'},
          {_id: 'ij1n', title: 'What not to wear'}
        ]
      }));
    });
  });

  describe('#fetchNextPublicPlaylistsPageFulfilled', function () {
    it('concats the playlists and sets the page number', function () {
      const initialState = fromJS({
        publicPlaylistPage: 1,
        publicPlaylistPageCount: 2,
        publicPlaylists: [{id: '3aon3a'}]
      });

      const action = fetchNextPublicPlaylistsPageFulfilled({
        playlists: [{id: 'an3ou2'}, {id: '290vj2na'}, {id: '3oinaou23'}],
        page: 2,
        pages: 2,
      });

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        publicPlaylistPage: 2,
        publicPlaylistPageCount: 2,
        publicPlaylists: [{id: '3aon3a'}, {id: 'an3ou2'}, {id: '290vj2na'}, {id: '3oinaou23'}]
      }));
    });
  });

  describe('#fetchPublicPlaylistsFulfilled', function () {
    it('resets the playlists and sets the page number', function () {
      const initialState = fromJS({
        publicPlaylistPage: 1,
        publicPlaylistPageCount: 2,
        publicPlaylists: [{id: '3aon3a'}]
      });

      const action = fetchPublicPlaylistsFulfilled({
        playlists: [{id: 'an3ou2'}, {id: '290vj2na'}, {id: '3oinaou23'}],
        page: 1,
        pages: 1,
      });

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        publicPlaylistPage: 1,
        publicPlaylistPageCount: 1,
        publicPlaylists: [{id: 'an3ou2'}, {id: '290vj2na'}, {id: '3oinaou23'}]
      }));
    });
  });

  describe('#setPlaylistDefaultStartTime', function () {
    it('sets the default start time of the right playlist', function () {
      const initialState = fromJS({
        youtubePlaylists: [{name: 've328j1'}, {name: '2807hiunf2'}],
        serverPlaylists: [{name: 'baevawe'}, {name: 'ieoanu3h'}, {name: 'fau3n2'}],
        playlistIndex: 1,
        currentPlaylist: 'serverPlaylists'
      });

      const action = setPlaylistDefaultStartTime(15);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        youtubePlaylists: [{name: 've328j1'}, {name: '2807hiunf2'}],
        serverPlaylists: [{name: 'baevawe'}, {name: 'ieoanu3h', defaultStart: 15}, {name: 'fau3n2'}],
        playlistIndex: 1,
        currentPlaylist: 'serverPlaylists'
      }));
    });
  });

  describe('#setPlaylistDefaultLength', function () {
    it('sets the default length of the right playlist', function () {
      const initialState = fromJS({
        youtubePlaylists: [{name: 've328j1'}, {name: '2807hiunf2'}],
        serverPlaylists: [{name: 'baevawe'}, {name: 'ieoanu3h'}, {name: 'fau3n2'}],
        playlistIndex: 1,
        currentPlaylist: 'serverPlaylists'
      });

      const action = setPlaylistDefaultLength(80);

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        youtubePlaylists: [{name: 've328j1'}, {name: '2807hiunf2'}],
        serverPlaylists: [{name: 'baevawe'}, {name: 'ieoanu3h', defaultLength: 80}, {name: 'fau3n2'}],
        playlistIndex: 1,
        currentPlaylist: 'serverPlaylists'
      }));
    });
  });
});
