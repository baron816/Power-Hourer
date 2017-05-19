import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import MenuItem from 'material-ui/MenuItem';

import YouTubeVideo from '../Video/YouTubeVideo';
import VideoModal from './VideoModal';

import {
  moveItem,
  fetchYoutubePlaylistItems
} from '../actions';

function YouTubeModal(props) {
  const settingsItems = [
    <MenuItem primaryText='Reload Playlist' onClick={props.fetchPlaylist(props.selectedPlaylist)} key='reload'/>
  ];

  return <VideoModal Video={YouTubeVideo} settingsItems={settingsItems} {...props} />;
}

function mapStateToProps(state) {
  const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
  const playlist = state.getIn(['playlists', 'youtubePlaylists'], List());
  const selectedPlaylist = playlist.get(playlistIndex, Map());
  return {
    selectedPlaylist
  };
}

function mapDispatchToProps(dispatch) {
  function movePlItem(indexes) {
    dispatch(moveItem(indexes));
  }

  function fetchPlaylist(selectedPlaylist) {
    return function () {
      dispatch(fetchYoutubePlaylistItems(selectedPlaylist.get('playlistId')));
    };
  }

  return {
    movePlItem,
    fetchPlaylist
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeModal);
