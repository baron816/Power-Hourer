import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './PlaylistItems.css';

import { goToVideo, resetClock, changePlayState } from './actions';

function PlaylistItems(props) {
  const c = new React.Component(props);

  c.componentWillUpdate = function () {
    document.querySelector('#playlistItems').children[c.props.playlistIndex].scrollIntoView();
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
                leftAvatar={<Avatar src={item.getIn(['snippet', 'thumbnails', 'default', 'url'])} />}>
                {item.getIn(['snippet', 'title'])}
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
    playlistItems: state.get('playlistItems'),
    playlistIndex: state.get('playlistIndex')
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
