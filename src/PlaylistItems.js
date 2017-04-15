import React from 'react';
import { connect } from 'react-redux';

import { goToVideo, resetClock, changePlayState } from './actions';

function PlaylistItems({playlistItems, setVideoIndex}) {
  return (
    <div className="PlaylistItems">
      <ul>
        {playlistItems.map(function (item, index) {
          return(
            <li key={item.id} data-index={index} onClick={setVideoIndex}>{item.snippet.title}</li>
          );
        })}
      </ul>
    </div>
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

  return {
    setVideoIndex
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems);
