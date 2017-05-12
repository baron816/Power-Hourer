import React from 'react';
import { connect } from 'react-redux';

import Playlists from './Playlists';

import { fetchServerPlaylistItems } from '../actions';

function ServerPlaylists({playlists}) {
  return (
    <Playlists
      playlists={playlists}
      name='Saved'
      idKey='_id'
      playlistName='serverPlaylists'
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
