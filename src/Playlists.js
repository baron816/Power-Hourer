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
  setPlaylistName
} from './actions';

function Playlists({playlists, getPlaylists}) {
  return (
    <Paper zDepth={3} id="playlists">
      <List>
        {playlists.map(function (list) {
          const id = list.get('id');
          const title = list.getIn(['snippet', 'title']);
          return(
            <ListItem
              key={id}
              onClick={getPlaylists(id, title)}
              leftAvatar={ <Avatar src={list.getIn(['snippet', 'thumbnails', 'default', 'url'])} /> }>
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
    playlists: state.get('playlists')
  };
}

function mapDispatchToProps(dispatch) {
  function getPlaylists(listId, title) {
    return function () {
      dispatch(setPlaylistName(title));
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
