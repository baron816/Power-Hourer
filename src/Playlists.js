import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import './Playlists.css'

import { fetchPlaylistItems, goToVideo, changePlayState, resetClock } from './actions';

function Playlists({playlists, getPlaylists}) {
  return (
    <Paper zDepth={3} id="playlists">
      <List>
        {playlists.map(function (list) {
          return(
            <ListItem key={list.id} onClick={getPlaylists(list.id)}>{list.snippet.title}</ListItem>
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
  function getPlaylists(listId) {
    return function () {
      dispatch(fetchPlaylistItems(listId));
      dispatch(goToVideo(0));
      dispatch(changePlayState(false));
      dispatch(resetClock());
    };
  }

  return {
    getPlaylists
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
