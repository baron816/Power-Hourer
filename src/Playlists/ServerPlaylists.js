import React from 'react';
import { connect } from 'react-redux';

import Playlists from './Playlists';

import {
  fetchServerPlaylistItems,
  fetchPublicPlaylists
} from '../actions';

function ServerPlaylists(props) {
  const c = new React.Component(props);

  c.componentDidMount = function () {
    props.fetchPlaylists();
  };

  c.render = function () {
    return (
      <Playlists
      playlists={props.playlists}
      name='Saved'
      idKey='_id'
      playlistName='serverPlaylists'
      style={{marginRight: '5px', marginLeft: '5px'}}
      fetchPlaylistItems={fetchServerPlaylistItems}
      />
    );
  };

  return c;
}

function mapStateToProps(state) {
  return {
    playlists: state.getIn(['playlists', 'serverPlaylists'])
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

export default connect(mapStateToProps, mapDispatchToProps)(ServerPlaylists);
