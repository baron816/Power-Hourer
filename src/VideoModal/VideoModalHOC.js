import React from 'react';
import { connect } from 'react-redux';
import { makeProps, dispatchAll } from '../utils';
import {
  selectedPlaylist,
  defaultStart,
  defaultLength
} from '../selectors';
import MenuItem from 'material-ui/MenuItem';
import VideoModal from './VideoModal';

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
        onClick={props.fetchItems(props.selectedPlaylist.get('_id'))}
        key='reolad'
      />
    ];
    return <VideoModal Video={Video} settingsItems={settingsItems} {...props} />;
  }

  const mapStateToProps = makeProps({selectedPlaylist, defaultStart, defaultLength});

  function mapDispatchToProps(dispatch) {
    const movePlItem = dispatchAll(dispatch, moveItem);
    const fetchItems = (id) => dispatchAll(dispatch, fetch(id));

    function setDefault(fn) {
      return function (event) {
        const time = Number(event.target.value);
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
