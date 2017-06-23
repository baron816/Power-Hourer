import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { makeProps, dispatchAll } from '../utils';

import {
  video,
  videoStart,
  videoEnd,
  videoLength,
  autoplay,
  callNext,
  showModal
} from '../selectors';

import Clock from '../Clock/Clock';
import {
  changePlayState,
  nextVideo,
  flipNext
} from '../actions';
import './Video.css';

function Video({
  video,
  handleVideoEnd,
  changePlay,
  callNext,
  videoLength,
  changeVidLen,
  changeVidStart,
  videoStart,
  videoEnd,
  autoplay,
  handleVideoError,
  changeStartToNow,
}) {

  let videoElement;
  return (
    <Card id='video'>
      <CardHeader
        title={video.get('title')}
        subtitle={<Clock />}
        actAsExpander={true}
        showExpandableButton={true}/>
      <CardMedia style={{justifyContent: 'center', display: 'flex'}}>
        <YouTube
          videoId={video.get('videoId')}
          opts={{
            height: '420',
            width: '670',
            playerVars: {
              start: videoStart,
              end: videoEnd,
              autoplay: autoplay,
              rel: 0
            }
          }}
          onEnd={handleVideoEnd(callNext, videoEnd)}
          onPlay={changePlay(true)}
          onPause={changePlay(false)}
          onError={handleVideoError}
          id='main-video'
          ref={(vid) => videoElement = vid}
        />
      </CardMedia>
      <CardText expandable={true}>
        <TextField
          floatingLabelText='Video length'
          value={String(videoLength)}
          onChange={changeVidLen}
          type='number'
          step={5}
          min={1}
        /> <br/>
        <TextField
          floatingLabelText='Video start time'
          value={String(videoStart)}
          onChange={changeVidStart}
          type='number'
          step={5}
          min={0}
        /><br/>
        <RaisedButton onClick={startNow} label='Set video start to now' primary={true}/>
      </CardText>
    </Card>
  );

  function startNow() {
    videoElement.internalPlayer.getCurrentTime()
    .then((time) => {
      changeStartToNow(Math.floor(time));
    });
  }
}

const mapStateToProps = makeProps({video, videoStart, videoEnd, videoLength, autoplay, callNext, showModal});

function mapDispatchToProps(dispatch) {
  function handleVideoEnd(next, videoEnd) {
    return function (event) {
      // if statement is workaround for bug that causes onEnd to be called twice
      if (next) {
        dispatch(nextVideo());
      }
      const duration = event.target.getDuration();

      console.log({duration, videoEnd})
      if (duration >= videoEnd || duration === 0) {
        dispatch(flipNext());
      }
      dispatch(changePlayState(false));
    };
  }

  const handleVideoError = dispatchAll(dispatch, nextVideo, changePlayState(false));

  const changePlay = (bool) => dispatchAll(dispatch, changePlayState(bool));

  return {
    handleVideoEnd,
    handleVideoError,
    changePlay
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
