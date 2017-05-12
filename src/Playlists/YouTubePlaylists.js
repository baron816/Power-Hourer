import React from 'react';
import { connect } from 'react-redux';

import Playlists from './Playlists';
import { fetchYoutubePlaylistItems } from '../actions';

function YouTubePlaylists({playlists}) {
  return (
    <Playlists
      playlists={playlists}
      fetchPlaylistItems={fetchYoutubePlaylistItems}
      name='YouTube'
      idKey='playlistId'
      playlistName='youtubePlaylists'
    />
  );
}

function mapStateToProps(state) {
  return {
    playlists: state.getIn(['playlists', 'youtubePlaylists'])
  };
}



export default connect(mapStateToProps)(YouTubePlaylists);
