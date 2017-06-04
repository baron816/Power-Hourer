import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import MenuItem from 'material-ui/MenuItem';
import VideoModal from './VideoModal';

import {
  setPlaylistDefaultLength,
  setPlaylistDefaultStartTime,
  moveItem
} from '../actions';

export default function VideoModalHOC(Video, fetch, list) {
  function Modal(props) {
    const settingsItems= [
      <MenuItem
        primaryText='Reload Playlist'
        onClick={props.fetchItems(props.selectedPlaylist)}
        key='reolad'
      />
    ];
    return <VideoModal Video={Video} settingsItems={settingsItems} {...props} />;
  }

  function mapStateToProps(state) {
    const playlistIndex = state.getIn(['playlists', 'playlistIndex']);
    const playlist = state.getIn(['playlists', list], List());
    const selectedPlaylist = playlist.get(playlistIndex, Map());
    const defaultStart = selectedPlaylist.get('defaultStart', 30);
    const defaultLength = selectedPlaylist.get('defaultLength', 60);

    return {
      selectedPlaylist,
      defaultStart,
      defaultLength
    };
  }

  function mapDispatchToProps(dispatch) {
    function movePlItem(indexes) {
      dispatch(moveItem(indexes));
    }

    function fetchItems(selectedPlaylist) {
      return function () {
        dispatch(fetch(selectedPlaylist.get('_id')));
      };
    }

    function setDefault(fn) {
      return function (event) {
        const time = event.target.value;
        dispatch(fn(time));
      };
    }

    const setDefaultStart = setDefault(setPlaylistDefaultStartTime);
    const setDefaultLength = setDefault(setPlaylistDefaultLength);

    return {
      movePlItem,
      fetchItems,
      setDefaultStart,
      setDefaultLength
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Modal);
}
