import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Map, List } from 'immutable';

import ServerVideo from '../Video/ServerVideo';
import VideoModal from './VideoModal';
import { deletePlaylist } from '../actions';

function ServerModal(props) {
  const settingsItems = [
    <MenuItem primaryText='Delete Playlist' onClick={props.deletePl(props.playlistId, props.playlistIndex)} key='delete'/>
  ];

  return <VideoModal Video={ServerVideo} settingsItems={settingsItems} {...props} />;
}

function mapStateToProps(state) {
  const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
  const playlist = state.getIn(['playlists', 'serverPlaylists'], List());
  const selectedPlaylist = playlist.get(playlistIndex, Map());
  const playlistId = selectedPlaylist.get('_id');

  return {
    selectedPlaylist,
    playlistId,
    playlistIndex
  };
}

function mapDispatchToProps(dispatch) {
  function deletePl(id, index) {
    return function () {
      dispatch(deletePlaylist(id, index));
    };
  }

  return {
    deletePl
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerModal);
