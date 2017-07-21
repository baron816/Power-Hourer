import React from 'react';
import { connect } from 'react-redux';
import { makeProps } from '../utils';

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
    c.props.fetchPublicPlaylists();
  };

  c.render = function () {
    return (
      <Playlists
        playlists={c.props.publicPlaylists}
        name='Public'
        playlistName='publicPlaylists'
        fetchPlaylistItems={fetchServerPlaylistItems}
        fetchNext={fetchNext}
      />
    );
  };

  function fetchNext() {
    const { publicPlaylistPage, publicPlaylistPageCount, fetchNextPublicPlaylistsPage } = c.props;

    if (publicPlaylistPage < publicPlaylistPageCount) {
      fetchNextPublicPlaylistsPage(publicPlaylistPage + 1);
    }
  }

  return c;
}

const mapStateToProps = makeProps({publicPlaylists, publicPlaylistPageCount, publicPlaylistPage});

export default connect(mapStateToProps, {
  fetchPublicPlaylists,
  fetchServerPlaylistItems,
  fetchNextPublicPlaylistsPage
})(PublicPlaylists);
