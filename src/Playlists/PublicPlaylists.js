import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Playlists from './Playlists';

import {
  fetchPublicPlaylists,
  fetchServerPlaylistItems,
  fetchNextPublicPlaylistsPage
} from '../actions';

function PublicPlaylists(props) {
  const c = new React.Component(props);

  c.componentDidMount = function () {
    c.props.fetchPlaylists();
  };

  c.render = function () {
    return (
      <Playlists
        playlists={c.props.playlists}
        name='Public'
        playlistName='publicPlaylists'
        fetchPlaylistItems={fetchServerPlaylistItems}
        fetchNext={c.props.fetchNext(c.props.publicPlaylistPage, c.props.publicPlaylistPageCount)}
      />
    );
  };

  return c;
}

function mapStateToProps(state) {
  return {
    playlists: state.getIn(['playlists', 'publicPlaylists']),
    publicPlaylistPage: state.getIn(['playlists', 'publicPlaylistPage']),
    publicPlaylistPageCount: state.getIn(['playlists', 'publicPlaylistPageCount'])
  };
}

function mapDispatchToProps(dispatch) {
  // function fetchPlaylists() {
  //   dispatch(fetchPublicPlaylists());
  // }

  const fetchPlaylists = compose(dispatch, fetchPublicPlaylists);

  function fetchNext(publicPlaylistPage, publicPlaylistPageCount) {
    if (publicPlaylistPage < publicPlaylistPageCount) {
      return function () {
        dispatch(fetchNextPublicPlaylistsPage(publicPlaylistPage + 1));
      };
    }
  }

  return {
    fetchPlaylists,
    fetchNext
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicPlaylists);
