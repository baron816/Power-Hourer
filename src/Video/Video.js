import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Map } from 'immutable';

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
          onEnd={handleVideoEnd(callNext)}
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

function mapStateToProps(state, ownProps) {
  const playlistItemsIndex = state.getIn(['playlistItems', 'playlistItemsIndex']);
  const playlistItems = state.getIn(['playlistItems', 'playlistItems']);
  const video = playlistItems.get(playlistItemsIndex, Map());
  const videoLength = video.get('videoLength') || ownProps.defaultLength || 60;
  const videoStart = video.get('startTime') || ownProps.defaultStart || 30;
  const videoEnd = videoLength + videoStart;
  const autoplay = playlistItemsIndex === 0 ? 0 : 1;
  return {
    video,
    videoStart,
    videoEnd,
    videoLength,
    autoplay,
    callNext: state.getIn(['root', 'callNext']),
    showModal: state.getIn(['root', 'showModal'])
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

  function handleVideoError() {
    dispatch(nextVideo());
    dispatch(changePlayState(false));
  }

  function changePlay(bool) {
    return function () {
      dispatch(changePlayState(bool));
    };
  }

  return {
    handleVideoEnd,
    handleVideoError,
    changePlay
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
