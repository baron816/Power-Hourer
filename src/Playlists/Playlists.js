import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './Playlists.css';

import {
  goToVideo,
  changePlayState,
  resetClock,
  invertModalState,
  setPlaylistIndex,
  setCurrentPlaylist,
  resetCallNext,
  setLoaded
} from '../actions';

function Playlists({name, playlists, getPlaylist, idKey, playlistIndex, currentPlaylist, style}) {
  return (
    <Paper zDepth={3} className="playlists" style={style}>
      <List>
        <Subheader inset={true}>{name} Playlists</Subheader>
        {playlists.map(function (list, index) {
          const id = list.get(idKey);
          const title = list.get('title');
          return(
            <ListItem
              key={id}
              onClick={getPlaylist(id, index, playlistIndex, currentPlaylist)}
              leftAvatar={ <Avatar src={list.get('thumbnail')} /> }>
              {title}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    playlistIndex: state.getIn(['playlists', 'playlistIndex']),
    currentPlaylist: state.getIn(['playlists', 'currentPlaylist'])
  };
}

function mapDispatchToProps(dispatch, {fetchPlaylistItems, playlistName}) {
  function getPlaylist(listId, index, playlistIndex, currentPlaylist) {
    return function () {
      if (index !== playlistIndex || playlistName !== currentPlaylist) {
        dispatch(setPlaylistIndex(index));
        dispatch(fetchPlaylistItems(listId));
        dispatch(goToVideo(0));
        dispatch(changePlayState(false));
        dispatch(resetClock());
        dispatch(setCurrentPlaylist(playlistName));
      } else {
        dispatch(setLoaded(true));
      }
      dispatch(resetCallNext());
      dispatch(invertModalState());
    };
  }

  return {
    getPlaylist
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
