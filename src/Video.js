import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import { changePlayState, nextVideo, flipNext } from './actions';

function Video({playlistIndex, playlistItems, handleVideoEnd, changePlay, callNext, videoLength}) {
  return (
    <div className="currentVideo">
      {playlistItems.size &&
        <YouTube
          videoId={videoId()}
          opts={{playerVars: {start: 30, end: videoEnd(), autoplay: autoplay(), rel: 0}}}
          onEnd={handleVideoEnd(callNext)}
          onPlay={changePlay(true)}
          onPause={changePlay(false)}
        />
      }
    </div>
  );

  function videoId() {
    return playlistItems.get(playlistIndex).snippet.resourceId.videoId;
  }

  function autoplay() {
    return playlistIndex === 0 ? 0 : 1;
  }

  function videoEnd() {
    return videoLength + 30;
  }
}

function mapStateToProps(state) {
  return {
    playlistIndex: state.get('playlistIndex'),
    playlistItems: state.get('playlistItems'),
    callNext: state.get('callNext'),
    videoLength: state.get('videoLength')
  };
}

function mapDispatchToProps(dispatch) {
  function handleVideoEnd(next) {
    return function () {
      // if statement is workaround for bug that causes onEnd to be called twice
      if (next) {
        dispatch(nextVideo());
      }
      dispatch(flipNext());
      dispatch(changePlayState(false));
    };
  }


    function changePlay(bool) {
      return function () {
        dispatch(changePlayState(bool));
      };
    }

  return {
    handleVideoEnd,
    changePlay
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
