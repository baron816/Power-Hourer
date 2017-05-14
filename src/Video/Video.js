import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { List } from 'immutable';

import Clock from '../Clock/Clock';
import { changePlayState, nextVideo, flipNext, changeVideoLength, changeVideoStart } from '../actions';
import './Video.css';

function Video(props) {

  const c = new React.Component(props);

  c.state = {
    video: {}
  };


  c.render = function () {
    const {
      playlistItemsIndex,
      video,
      handleVideoEnd,
      changePlay,
      callNext,
      videoLength,
      changeVidLen,
      changeVidStart,
      handleVideoError
    } = c.props;

    return (
      <Card id="video">
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
                start: videoStart(),
                end: videoEnd(),
                autoplay: autoplay(),
                rel: 0
              }
            }}
            onEnd={handleVideoEnd(callNext)}
            onPlay={changePlay(true)}
            onPause={changePlay(false)}
            onError={handleVideoError}
            id="main-video"
            onReady={(vid) => c.setState({video: vid})}
          />
        </CardMedia>
        <CardText expandable={true}>
          <TextField
            floatingLabelText="Videos length"
            value={String(videoLength)}
            onChange={changeVidLen}
            type="number"
            step={10}
          /> <br/>
          <TextField
            floatingLabelText="Video start time"
            value={String(videoStart)}
            onChange={changeVidStart(playlistItemsIndex)}
            type="number"
            step={10}
          /><br/>
          <RaisedButton onClick={startNow} label="Set video start to now" primary={true}/>
        </CardText>
      </Card>
    );
  };

  function startNow() {
    const { changeStartToNow, playlistItemsIndex } = c.props;
    const time = c.state.video.target.getCurrentTime();
    changeStartToNow(playlistItemsIndex, Math.floor(time));
  }

  function videoStart() {
    return c.props.video.get('startTime', 30);
  }

  function autoplay() {
    return c.props.playlistItemsIndex === 0 ? 0 : 1;
  }

  function videoEnd() {
    return c.props.videoLength + videoStart();
  }

  return c;
}

function mapStateToProps(state) {
  const playlistItemsIndex = state.getIn(['playlistItems', 'playlistItemsIndex']);
  const playlistItems = state.getIn(['playlistItems', 'playlistItems']);
  const video = playlistItems.get(playlistItemsIndex, List());
  return {
    playlistItemsIndex,
    video,
    callNext: state.getIn(['root', 'callNext']),
    videoLength: state.getIn(['root', 'videoLength']),
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

  function changeVidLen(event) {
    dispatch(changeVideoLength(event.target.value));
  }

  function changeVidStart(index) {
    return function (event) {
      const time = event.target.value;
      dispatch(changeVideoStart(index, time));
    };
  }

  function changeStartToNow(index, time) {
    dispatch(changeVideoStart(index, time));
  }

  return {
    handleVideoEnd,
    handleVideoError,
    changeVidLen,
    changeVidStart,
    changeStartToNow,
    changePlay
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video);
