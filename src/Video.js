import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';

import Clock from './Clock';
import { changePlayState, nextVideo, flipNext } from './actions';
import './Video.css';

function Video({playlistIndex, playlistItems, handleVideoEnd, changePlay, callNext, videoLength}) {


  return (
      <div>
        {playlistItems.size &&
          <Card id="video">
          <CardHeader title={getVideo().getIn(['snippet', 'title'])} subtitle={<Clock />} />
          <CardMedia>
            <YouTube
              videoId={videoId()}
              opts={{playerVars: {start: videoStart(), end: videoEnd(), autoplay: autoplay(), rel: 0}}}
              onEnd={handleVideoEnd(callNext)}
              onPlay={changePlay(true)}
              onPause={changePlay(false)}
            />
          </CardMedia>
          </Card>
        }
      </div>
  );

  function videoId() {
    return getVideo().getIn(['snippet','resourceId','videoId']);
  }

  function getVideo() {
    return playlistItems.get(playlistIndex);
  }

  function videoStart() {
    return getVideo().get('startTime') || 30;
  }

  function autoplay() {
    return playlistIndex === 0 ? 0 : 1;
  }

  function videoEnd() {
    return videoLength + videoStart();
  }
}

function mapStateToProps(state) {
  return {
    playlistIndex: state.get('playlistIndex'),
    playlistItems: state.get('playlistItems'),
    callNext: state.get('callNext'),
    videoLength: state.get('videoLength'),
    showModal: state.get('showModal')
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
