import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './Playlists.css';
import { makeProps, dispatchAll } from '../utils';
import {
  playlistIndex,
  currentPlaylist
} from '../selectors';

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

function Playlists({
  name,
  playlists,
  getPlaylist,
  playlistIndex,
  currentPlaylist,
  style,
  fetchNext
}) {
  if (playlists.size) {
    return (
      <Paper zDepth={3} className="playlists" style={style}>
      <List>
      <Subheader inset={true}>{name} Playlists</Subheader>
      {playlists.map(function (list, index) {
        const id = list.get('_id');
        const title = list.get('title');
        return(
          <ListItem
          key={`${name}-${id}`}
          onClick={getPlaylist(id, index, playlistIndex, currentPlaylist)}
          leftAvatar={ <Avatar src={list.get('thumbnail')} /> }>
          {title}
          </ListItem>
        );
      })}
      <LastItem />
      </List>
      </Paper>
    );
  } else {
    return <span />;
  }

  function LastItem() {
    return fetchNext ?
        <ListItem
          key={'fetchNext'}
          onClick={fetchNext}
        >
          Next
        </ListItem>
    : <span/>;

  }
}


const mapStateToProps = makeProps({playlistIndex, currentPlaylist});

function mapDispatchToProps(dispatch, {fetchPlaylistItems, playlistName}) {
  // function getPlaylist(listId, index, playlistIndex, currentPlaylist) {
  //   return function () {
  //     if (index !== playlistIndex || playlistName !== currentPlaylist) {
  //       dispatch(setPlaylistIndex(index));
  //       dispatch(fetchPlaylistItems(listId));
  //       dispatch(goToVideo(0));
  //       dispatch(changePlayState(false));
  //       dispatch(resetClock());
  //       dispatch(setCurrentPlaylist(playlistName));
  //     } else {
  //       dispatch(setLoaded(true));
  //     }
  //     dispatch(resetCallNext());
  //     dispatch(invertModalState());
  //   };
  // }

  function getPlaylist(listId, index, playlistIndex, currentPlaylist) {
    var first;
    if (index !== playlistIndex || playlistName !== currentPlaylist) {
      first = [
        setPlaylistIndex(index),
        fetchPlaylistItems(listId),
        goToVideo(0),
        changePlayState(false),
        resetClock(),
        setCurrentPlaylist(playlistName)
      ];
    } else {
      first = [setLoaded(true)];
    }

    return dispatchAll(
      dispatch,
      first,
      resetCallNext(),
      invertModalState()
    );
  }

  return {
    getPlaylist
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
