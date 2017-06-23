import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { makeProps, dispatchAll } from '../utils';

import {
  selectedPlaylist,
  playlistIndex,
  defaultStart,
  defaultLength,
  playlistExposed
} from '../selectors';

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

const mapStateToProps = makeProps({selectedPlaylist, playlistIndex, defaultStart, defaultLength, playlistExposed});

function mapDispatchToProps(dispatch) {

  const deletePl = dispatchAll(dispatch, deletePlaylist);
  const movePlItem = dispatchAll(dispatch, moveItem, moveServerItem);
  const changeExposure = (exposure) => dispatchAll(dispatch, updatePlaylist({exposed: !exposure}));

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
