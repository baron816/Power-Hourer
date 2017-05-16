import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import YouTubeVideo from '../Video/YouTubeVideo';
import VideoModal from './VideoModal';

function YouTubeModal(props) {

  return <VideoModal Video={YouTubeVideo} {...props} />;
}

function mapStateToProps(state) {
  const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
  const playlist = state.getIn(['playlists', 'youtubePlaylists'], List());
  const selectedPlaylist = playlist.get(playlistIndex, Map());
  return {
    selectedPlaylist
  };
}

export default connect(mapStateToProps)(YouTubeModal);