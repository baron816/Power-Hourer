import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './Playlists.css';

import { makePropsFromActions, makePropsFromSelectors } from '../utils';

function Playlists(props) {
  if (props.playlists.size) {
    return (
      <Paper zDepth={3} className="playlists" style={props.style}>
      <List>
      <Subheader inset={true}>{props.name} Playlists</Subheader>
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
    return function () {
      if (index !== props.playlistIndex || props.playlistName !== props.currentPlaylist) {
        props.setPlaylistIndex(index);
        props.fetchPlaylistItems(listId);
        props.goToVideo(0);
        props.changePlayState(false);
        props.resetClock();
        props.setCurrentPlaylist(props.playlistName);
      } else {
        props.setLoaded(true);
      }

      props.resetCallNext();
      props.invertModalState();
      props.setSearchingToFalse();
    };
  }
}

Playlists.propTypes = {
  playlists: PropTypes.object.isRequired,
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  playlistIndex: PropTypes.number.isRequired,
  currentPlaylist: PropTypes.string.isRequired,
  goToVideo: PropTypes.func.isRequired,
  changePlayState: PropTypes.func.isRequired,
  resetClock: PropTypes.func.isRequired,
  invertModalState: PropTypes.func.isRequired,
  setPlaylistIndex: PropTypes.func.isRequired,
  setCurrentPlaylist: PropTypes.func.isRequired,
  resetCallNext: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,
  setSearchingToFalse: PropTypes.func.isRequired,
  fetchPlaylistItems: PropTypes.func.isRequired,
  playlistName: PropTypes.string.isRequired
};

const mapStateToProps = makePropsFromSelectors(['playlistIndex', 'currentPlaylist']);
const mapDispatchToProps = makePropsFromActions([
  'goToVideo',
  'changePlayState',
  'resetClock',
  'invertModalState',
  'setPlaylistIndex',
  'setCurrentPlaylist',
  'resetCallNext',
  'setLoaded',
  'setSearchingToFalse'
]);

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
