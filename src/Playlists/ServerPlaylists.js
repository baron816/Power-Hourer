import React from 'react';
import { connect } from 'react-redux';

import Playlists from './Playlists';

import { fetchServerPlaylistItems } from '../actions';

function ServerPlaylists({playlists}) {
  return (
    <Playlists
      playlists={playlists}
      name='Saved'
      playlistName='serverPlaylists'
      style={{marginRight: '5px', marginLeft: '5px'}}
      fetchPlaylistItems={fetchServerPlaylistItems}
    />
  );
}

function mapStateToProps(state) {
  return {
    playlists: state.getIn(['playlists', 'serverPlaylists'])
  };
}

export default connect(mapStateToProps)(ServerPlaylists);
