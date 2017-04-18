import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import './PlaylistItems.css';

import { goToVideo, resetClock, changePlayState, changeVideoStart } from './actions';

function PlaylistItems({playlistItems, setVideoIndex, changeVidStart}) {
  return (
    <Paper zDepth={3}>
      <List id="playlistItems">
        {playlistItems.map(function (item, index) {
          return(
            <ListItem key={item.get('id')}  >
              <button data-index={index} onClick={setVideoIndex} >Go To</button>
              {item.get('snippet').get('title')}
              <input type="number" min={0} max={600} step={10} onChange={changeVidStart(index)} value={item.get('startTime') || 30}/>
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
  function setVideoIndex(event) {
    const index = event.target.dataset.index;
    if (index === '0') {
      dispatch(changePlayState(false));
      dispatch(resetClock());
    }
    dispatch(goToVideo(index));
  }

  function changeVidStart(index) {
    return function (event) {
      const time = event.target.value;
      dispatch(changeVideoStart(index, time));
    };
  }

  return {
    setVideoIndex,
    changeVidStart
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems);
