import React from 'react';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import MenuItem from 'material-ui/MenuItem';
import VideoModal from './VideoModal';

import {
  moveItem
} from '../actions';

export default function VideoModalHOC(Video, fetch, list, idKey) {
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

    return {
      selectedPlaylist
    };
  }

  function mapDispatchToProps(dispatch) {
    function movePlItem(indexes) {
      dispatch(moveItem(indexes));
    }

    function fetchItems(selectedPlaylist) {
      return function () {
        dispatch(fetch(selectedPlaylist.get(idKey)));
      };
    }

    return {
      movePlItem,
      fetchItems
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Modal);
}
