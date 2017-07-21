import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { makeProps } from '../utils';

import {
  selectedPlaylist,
  playlistIndex,
  playlistExposed,
  searching
} from '../selectors';

import ServerVideo from '../Video/ServerVideo';
import VideoModal from './VideoModal';
import {
  deletePlaylist,
  moveItem,
  moveServerItem,
  updatePlaylist,
  setPlaylistDefaultLength,
  setPlaylistDefaultStartTime,
  removeItem,
  flipSearching
 } from '../actions';

function ServerModal(props) {
  function changeExposure() {
    props.updatePlaylist({exposed: !props.playlistExposed});
  }

  function setDefault(type) {
    return function (event) {
      const time = event.target.value;
      props.updatePlaylist({[type]: Number(time)});
    };
  }

  const setDefaultStart = setDefault('defaultStart');
  const setDefaultLength = setDefault('defaultLength');

  const settingsItems = [
    <ExposureItem key='exposure' />,
    <MenuItem primaryText={props.searching ? 'Go Back' : 'Add Video'} onClick={() => props.flipSearching()} key='searching' />,
    <MenuItem primaryText='Remove Video' onClick={props.removeItem} key='removeVideo' />,
    <MenuItem primaryText='Delete Playlist' onClick={props.deletePlaylist} key='delete'/>
  ];

  return (
    <VideoModal
      Video={ServerVideo}
      settingsItems={settingsItems}
      setDefaultStart={setDefaultStart}
      setDefaultLength={setDefaultLength}
      {...props}
    />
  );

  function ExposureItem() {
    const {playlistExposed} = props;

    return playlistExposed ? <MenuItem primaryText='Make Playlist Private' onClick={changeExposure} /> : <MenuItem primaryText='Make Playlist Public' onClick={changeExposure} />;
  }

}

const mapStateToProps = makeProps({selectedPlaylist, playlistIndex,playlistExposed, searching});

export default connect(mapStateToProps, {
  deletePlaylist,
  moveItem,
  moveServerItem,
  removeItem,
  flipSearching,
  updatePlaylist,
  setPlaylistDefaultStartTime,
  setPlaylistDefaultLength
})(ServerModal);
