import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './Playlists.css';

import {
  fetchPlaylistItems,
  goToVideo,
  changePlayState,
  resetClock,
  invertModalState,
  setPlaylistIndex
} from '../actions';

function Playlists({playlists, getPlaylists}) {
  return (
    <Paper zDepth={3} id="playlists">
      <List>
        {playlists.map(function (list, index) {
          const id = list.get('playlistId');
          const title = list.get('title');
          return(
            <ListItem
              key={id}
              onClick={getPlaylists(id, index)}
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
    playlists: state.getIn(['playlists', 'playlists'])
  };
}

function mapDispatchToProps(dispatch) {
  function getPlaylists(listId, index) {
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
    getPlaylists
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
