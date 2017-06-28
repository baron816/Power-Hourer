import React from 'react';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import { makeProps, dispatchAll } from '../utils';

import Playlists from './Playlists';

import {
  publicPlaylists,
  publicPlaylistPageCount,
  publicPlaylistPage
} from '../selectors';

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
        playlists={c.props.publicPlaylists}
        name='Public'
        playlistName='publicPlaylists'
        fetchPlaylistItems={fetchServerPlaylistItems}
        fetchNext={c.props.fetchNext(c.props.publicPlaylistPage, c.props.publicPlaylistPageCount)}
      />
    );
  };

  return c;
}

const mapStateToProps = makeProps({publicPlaylists, publicPlaylistPageCount, publicPlaylistPage});

function mapDispatchToProps(dispatch) {
  const fetchPlaylists = dispatchAll(dispatch, fetchPublicPlaylists);


  const fetchNext = (publicPlaylistPage, publicPlaylistPageCount) => dispatchAll(dispatch, publicPlaylistPage < publicPlaylistPageCount && fetchNextPublicPlaylistsPage(publicPlaylistPage + 1));

  return {
    fetchPlaylists,
    fetchNext
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicPlaylists);
