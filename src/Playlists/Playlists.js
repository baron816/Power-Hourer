import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './Playlists.css';
import { makeProps } from '../utils';
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
  setLoaded,
  setSearchingToFalse
} from '../actions';

function Playlists(props) {
  if (props.playlists.size) {
    return (
      <Paper zDepth={3} className="playlists" style={props.style}>
      <List>
      <Subheader inset={true}>{name} Playlists</Subheader>
      {props.playlists.map(function (list, index) {
        const id = list.get('_id');
        const title = list.get('title');
        return(
          <ListItem
          key={`${name}-${id}`}
          onClick={getPlaylist(id, index)}
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
    const {fetchNext} = props;
    return fetchNext ?
        <ListItem
          key={'fetchNext'}
          onClick={fetchNext}
        >
          Next
        </ListItem>
    : <span/>;
  }

  function getPlaylist(listId, index) {
    const {
      playlistIndex,
      currentPlaylist,
      playlistName,
      setPlaylistIndex,
      fetchPlaylistItems,
      goToVideo,
      changePlayState,
      resetClock,
      setCurrentPlaylist,
      setLoaded,
      resetCallNext,
      invertModalState,
      setSearchingToFalse
    } = props;

    return function () {
      if (index !== playlistIndex || playlistName !== currentPlaylist) {
        setPlaylistIndex(index);
        fetchPlaylistItems(listId);
        goToVideo(0);
        changePlayState(false);
        resetClock();
        setCurrentPlaylist(playlistName);
      } else {
        setLoaded(true);
      }

      resetCallNext();
      invertModalState();
      setSearchingToFalse();
    };
  }
}

const mapStateToProps = makeProps({playlistIndex, currentPlaylist});

export default connect(mapStateToProps, {
  goToVideo,
  changePlayState,
  resetClock,
  invertModalState,
  setPlaylistIndex,
  setCurrentPlaylist,
  resetCallNext,
  setLoaded,
  setSearchingToFalse
})(Playlists);
