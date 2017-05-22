import React from 'react';
import { connect } from 'react-redux';

import Playlists from './Playlists';

function PublicPlaylists({playlists}) {
  return (
    <Playlists
      playlists={playlists}
      name='Public'
      idKey='_id'
      playlistName='publicPlaylists'
    />
  );
}

function mapStateToProps(state) {
  return {
    playlists: state.getIn(['playlists', 'publicPlaylists'])
  };
}

export default connect(mapStateToProps)(PublicPlaylists);
