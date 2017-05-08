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
  setPlaylistIndex
} from '../actions';

function Playlists({name, playlists, getPlaylist}) {
  return (
    <Paper zDepth={3} id="playlists">
      <List>
        <Subheader inset={true}>{name} Playlists</Subheader>
        {playlists.map(function (list, index) {
          const id = list.get('_id') || list.get('playlistId');
          const title = list.get('title');
          return(
            <ListItem
              key={id}
              onClick={getPlaylist(id, index)}
              leftAvatar={ <Avatar src={list.get('thumbnail')} /> }>
              {title}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch, {fetchPlaylistItems}) {
  function getPlaylist(listId, index) {
    return function () {
      dispatch(setPlaylistIndex(index));
      dispatch(fetchPlaylistItems(listId));
      dispatch(goToVideo(0));
      dispatch(changePlayState(false));
      dispatch(resetClock());
      dispatch(invertModalState());
    };
  }

  return {
    getPlaylist
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
