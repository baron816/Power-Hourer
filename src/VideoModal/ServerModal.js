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
  updatePlaylist,
  setPlaylistDefaultLength,
  setPlaylistDefaultStartTime
 } from '../actions';

function ServerModal(props) {
  const settingsItems = [
    <ExposureItem key='exposure' />,
    <MenuItem primaryText='Delete Playlist' onClick={props.deletePl} key='delete'/>
  ];

  return <VideoModal Video={ServerVideo} settingsItems={settingsItems} {...props} />;

  function ExposureItem() {
    const {playlistExposed, changeExposure} = props;

    return playlistExposed ? <MenuItem primaryText='Make Playlist Private' onClick={changeExposure(playlistExposed)} /> : <MenuItem primaryText='Make Playlist Public' onClick={changeExposure(playlistExposed)} />;
  }
}

function mapStateToProps(state) {
  const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
  const playlist = state.getIn(['playlists', 'serverPlaylists'], List());
  const selectedPlaylist = playlist.get(playlistIndex, Map());
  const playlistExposed = selectedPlaylist.get('exposed');
  const defaultStart = selectedPlaylist.get('defaultStart', 30);
  const defaultLength = selectedPlaylist.get('defaultLength', 60);

  return {
    selectedPlaylist,
    playlistIndex,
    defaultStart,
    defaultLength,
    playlistExposed
  };
}

function mapDispatchToProps(dispatch) {
  function deletePl() {
    dispatch(deletePlaylist());
  }

  function movePlItem(indexes) {
    dispatch(moveItem(indexes));
    dispatch(moveServerItem(indexes));
  }

  function changeExposure(exposure) {
    return function () {
      dispatch(updatePlaylist({exposed: !exposure}));
    };
  }

  function setDefault(fn, type) {
    return function (event) {
      const time = event.target.value;
      dispatch(updatePlaylist({[type]: time}));
    };
  }

  const setDefaultStart = setDefault(setPlaylistDefaultStartTime, 'defaultStart');
  const setDefaultLength = setDefault(setPlaylistDefaultLength, 'defaultLength');

  return {
    deletePl,
    movePlItem,
    changeExposure,
    setDefaultStart,
    setDefaultLength
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerModal);
