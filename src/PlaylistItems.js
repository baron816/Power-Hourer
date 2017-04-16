import React from 'react';
import { connect } from 'react-redux';

import { goToVideo, resetClock, changePlayState, changeVideoStart } from './actions';

function PlaylistItems({playlistItems, setVideoIndex, changeVidStart}) {
  return (
    <div className="PlaylistItems">
      <ul>
        {playlistItems.map(function (item, index) {
          return(
            <li key={item.get('id')}  >
              <button data-index={index} onClick={setVideoIndex} >Go To</button>
              {item.get('snippet').get('title')}
              <input type="number" min={0} max={600} step={10} onChange={changeVidStart(index)} value={item.get('startTime') || 30}/>
            </li>
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
