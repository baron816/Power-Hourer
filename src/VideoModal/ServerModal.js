import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Map, List } from 'immutable';

import ServerVideo from '../Video/ServerVideo';
import VideoModal from './VideoModal';
import {
  deletePlaylist,
  moveItem,
  moveServerItem,
  updatePlaylist
 } from '../actions';

function ServerModal(props) {
  const settingsItems = [
    <ExposureItem key='exposure' />,
    <MenuItem primaryText='Delete Playlist' onClick={props.deletePl(props.playlistId, props.playlistIndex)} key='delete'/>
  ];

  return <VideoModal Video={ServerVideo} settingsItems={settingsItems} {...props} />;

  function ExposureItem() {
    const {playlistExposed, changeExposure, playlistId} = props;

    return playlistExposed ? <MenuItem primaryText='Make Playlist Private' onClick={changeExposure(playlistId, playlistExposed)} /> : <MenuItem primaryText='Make Playlist Public' onClick={changeExposure(playlistId, playlistExposed)} />;
  }
}

function mapStateToProps(state) {
  const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
  const playlist = state.getIn(['playlists', 'serverPlaylists'], List());
  const selectedPlaylist = playlist.get(playlistIndex, Map());
  const playlistId = selectedPlaylist.get('_id');
  const playlistExposed = selectedPlaylist.get('exposed');

  return {
    selectedPlaylist,
    playlistId,
    playlistIndex,
    playlistExposed
  };
}

function mapDispatchToProps(dispatch) {
  function deletePl(id, index) {
    return function () {
      dispatch(deletePlaylist(id, index));
    };
  }

  function movePlItem(indexes) {
    dispatch(moveItem(indexes));
    dispatch(moveServerItem(indexes));
  }

  function changeExposure(id, exposure) {
    return function () {
      dispatch(updatePlaylist(id, {exposed: !exposure}));
    };
  }

  return {
    deletePl,
    movePlItem,
    changeExposure
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerModal);
