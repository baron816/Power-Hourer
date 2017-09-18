import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makePropsFromActions, makePropsFromSelectors } from '../utils';

import Playlists from './Playlists';

function PublicPlaylists(props) {
  const c = new React.Component(props);

  c.componentDidMount = function () {
    c.props.fetchPublicPlaylists();
  };

  c.render = function () {
    const { publicPlaylists, fetchServerPlaylistItems } = c.props;
    return (
      <Playlists
        playlists={publicPlaylists}
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

PublicPlaylists.propTypes = {
  publicPlaylists: PropTypes.object.isRequired,
  publicPlaylistPageCount: PropTypes.number.isRequired,
  publicPlaylistPage: PropTypes.number.isRequired,
  fetchPublicPlaylists: PropTypes.func.isRequired,
  fetchServerPlaylistItems: PropTypes.func.isRequired,
  fetchNextPublicPlaylistsPage: PropTypes.func.isRequired
};

const mapStateToProps = makePropsFromSelectors([
  'publicPlaylists',
  'publicPlaylistPageCount',
  'publicPlaylistPage'
]);

const mapDispatchToProps = makePropsFromActions([
  'fetchPublicPlaylists',
  'fetchServerPlaylistItems',
  'fetchNextPublicPlaylistsPage'
]);

export default connect(mapStateToProps, mapDispatchToProps)(PublicPlaylists);
