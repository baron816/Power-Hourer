import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './PlaylistItems.css';

import { goToVideo, resetClock, changePlayState } from './actions';

function PlaylistItems({playlistItems, setVideoIndex}) {
  return (
    <Paper zDepth={3}>
      <List id="playlistItems">
        {playlistItems.map(function (item, index) {
          return(
            <ListItem key={item.get('id')}
              data-index={index}
              onClick={setVideoIndex(index)}
              leftAvatar={<Avatar src={item.getIn(['snippet', 'thumbnails', 'default', 'url'])} />}>
              {item.getIn(['snippet', 'title'])}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    playlistItems: state.get('playlistItems')
  };
}

function mapDispatchToProps(dispatch) {
  function setVideoIndex(index) {
    return function () {
      if (index === 0) {
        dispatch(changePlayState(false));
        dispatch(resetClock());
      }
      dispatch(goToVideo(index));
    };
  }

  return {
    setVideoIndex
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems);
