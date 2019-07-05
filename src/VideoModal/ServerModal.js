import React from 'react';
import enhancedConnect from '../enhancedConnect';
import MenuItem from 'material-ui/MenuItem';

import ServerVideo from '../Video/ServerVideo';
import VideoModal from './VideoModal';

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

  function ExposureItem() {
    const {playlistExposed} = props;

    return playlistExposed ? <MenuItem primaryText='Make Playlist Private' onClick={changeExposure} /> : <MenuItem primaryText='Make Playlist Public' onClick={changeExposure} />;
  }

  return (
    <VideoModal
      Video={ServerVideo}
      settingsItems={settingsItems}
      setDefaultStart={setDefaultStart}
      setDefaultLength={setDefaultLength}
      {...props}
    />
  );
}

const mapStateToProps = [
  'selectedPlaylist',
  'playlistIndex',
  'playlistExposed',
  'searching'
];

const mapDispatchToProps = [
  'deletePlaylist',
  'moveItem',
  'moveServerItem',
  'removeItem',
  'flipSearching',
  'updatePlaylist',
  'setPlaylistDefaultStartTime',
  'setPlaylistDefaultLength'
];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(ServerModal);
