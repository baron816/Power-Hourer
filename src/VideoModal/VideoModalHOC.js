import React from 'react';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import VideoModal from './VideoModal';

import { makePropsFromSelectors } from '../utils';
import {
  setPlaylistDefaultLength,
  setPlaylistDefaultStartTime,
  moveItem
} from '../actions';

export default function VideoModalHOC(Video, fetch) {
  function Modal(props) {
    const settingsItems= [
      <MenuItem
        primaryText='Reload Playlist'
        onClick={fetchVideos}
        key='reload'
      />
    ];

    function fetchVideos() {
        props.fetch(props.selectedPlaylist.get('_id'));
    }

    function setDefault(fn) {
      return function (event) {
        const time = event.target.value;
        fn(Number(time));
      };
    }

    const setDefaultStart = setDefault(props.setPlaylistDefaultStartTime);
    const setDefaultLength = setDefault(props.setPlaylistDefaultLength);


    return (
      <VideoModal
        Video={Video}
        settingsItems={settingsItems}
        setDefaultStart={setDefaultStart}
        setDefaultLength={setDefaultLength}
        {...props}
      />
    );
  }

  const mapStateToProps = makePropsFromSelectors(['selectedPlaylist']);

  return connect(mapStateToProps, {
    setPlaylistDefaultLength,
    setPlaylistDefaultStartTime,
    moveItem,
    fetch
  })(Modal);
}
