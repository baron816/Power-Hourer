import React from 'react';
import { connect } from 'react-redux';

import Playlists from './Playlists';

import {
  fetchPublicPlaylists,
  fetchServerPlaylistItems
} from '../actions';

function PublicPlaylists(props) {
  const c = new React.Component(props);

  c.componentDidMount = function () {
    !c.props.playlists.size && c.props.fetchPlaylists();
  };

  c.render = function () {
    return (
      <Playlists
      playlists={c.props.playlists}
      name='Public'
      idKey='_id'
      playlistName='publicPlaylists'
      fetchPlaylistItems={fetchServerPlaylistItems}
      />
    );
  };

  return c;
}

function mapStateToProps(state) {
  return {
    playlists: state.getIn(['playlists', 'publicPlaylists'])
  };
}

function mapDispatchToProps(dispatch) {
  function fetchPlaylists() {
    dispatch(fetchPublicPlaylists());
  }

  return {
    fetchPlaylists
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicPlaylists);
