import React from 'react';
import PropTypes from 'prop-types';
import enhancedConnect from '../enhancedConnect';

import Playlists from './Playlists';

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
        fetchPlaylistItems={c.props.fetchServerPlaylistItems}
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

PublicPlaylists.propTypes = {
  publicPlaylistPageCount: PropTypes.number.isRequired,
  publicPlaylistPage: PropTypes.number.isRequired,
  fetchPublicPlaylists: PropTypes.func.isRequired,
  fetchNextPublicPlaylistsPage: PropTypes.func.isRequired
};

const mapStateToProps = [
  'publicPlaylists',
  'publicPlaylistPageCount',
  'publicPlaylistPage'
];

const mapDispatchToProps = [
  'fetchPublicPlaylists',
  'fetchServerPlaylistItems',
  'fetchNextPublicPlaylistsPage'
];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(PublicPlaylists);
