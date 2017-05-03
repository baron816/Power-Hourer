import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './PlaylistItems.css';

import { goToVideo, resetClock, changePlayState } from '../actions';

function PlaylistItems(props) {
  const c = new React.Component(props);

  c.componentDidUpdate = function () {
    const {playlistIndex} = c.props;
    playlistIndex && document.querySelector('#playlistItems').children[playlistIndex].scrollIntoView();
  };

  c.render = function () {
    const {playlistItems, setVideoIndex, playlistIndex} = c.props;

    return (
      <Paper zDepth={3}>
        <List id="playlistItems">
          {playlistItems.map(function (item, index) {
            return(
              <ListItem key={item.get('id')}
                style={playlistIndex === index ? { backgroundColor: 'rgba(0,0,0, 0.2)' } : {}}
                data-index={index}
                onClick={setVideoIndex(index)}
                leftAvatar={<Avatar src={item.get('thumbnail')} />}>
                {item.get('title')}
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  };

  return c;
}

function mapStateToProps(state) {
  return {
    playlistItems: state.getIn(['playlistItems', 'playlistItems']),
    playlistIndex: state.getIn(['playlistItems', 'playlistItemsIndex'])
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
