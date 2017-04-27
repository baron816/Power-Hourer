import React from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import NumberInput from 'material-ui-number-input';

import Clock from './Clock';
import { changePlayState, nextVideo, flipNext, changeVideoLength, changeVideoStart } from './actions';
import './Video.css';

function Video(props) {

  const c = new React.Component(props);

  c.state = {
    video: {}
  };


  c.render = function () {
    const opts = {
      playerVars: {
        start: videoStart(),
        end: videoEnd(),
        autoplay: autoplay(),
        rel: 0
      }
    };

    const {
      playlistIndex,
      playlistItems,
      handleVideoEnd,
      changePlay,
      callNext,
      videoLength,
      changeVidLen,
      changeVidStart,
      handleVideoError
    } = c.props;

    return (
        <div>
          {playlistItems.size &&
            <Card id="video">
              <CardHeader
                title={getVideo().getIn(['snippet', 'title'])}
                subtitle={<Clock />}
                actAsExpander={true}
                showExpandableButton={true}/>
              <CardMedia>
                <YouTube
                  videoId={videoId()}
                  opts={opts}
                  onEnd={handleVideoEnd(callNext)}
                  onPlay={changePlay(true)}
                  onPause={changePlay(false)}
                  onError={handleVideoError}
                  id="main-video"
                  onReady={(vid) => c.setState({video: vid})}
                />
              </CardMedia>
              <CardText expandable={true}>
                <NumberInput
                  inputMode='numeric'
                  floatingLabelText="Videos length"
                  value={String(videoLength)}
                  onChange={changeVidLen}
                  strategy="allow"
                  min={10}
                  max={300}
                /> <br/>
                <NumberInput
                  inputMode='numeric'
                  floatingLabelText="Video start time"
                  value={String(getVideo().get('startTime') || 30)}
                  onChange={changeVidStart(playlistIndex)}
                  strategy="allow"
                  min={10}
                /><br/>
                <RaisedButton onClick={startNow} label="Set video start to now" primary={true}/>
              </CardText>
            </Card>
          }
        </div>
    );
  };

  function startNow() {
    const { changeStartToNow, playlistIndex } = c.props;
    const time = c.state.video.target.getCurrentTime();
    changeStartToNow(playlistIndex, Math.floor(time));
  }

  function videoId() {
    return getVideo().getIn(['snippet','resourceId','videoId']);
  }

  function getVideo() {
    const { playlistItems, playlistIndex } = c.props;
    return playlistItems.get(playlistIndex);
  }

  function videoStart() {
    return getVideo().get('startTime') || 30;
  }

  function autoplay() {
    return c.props.playlistIndex === 0 ? 0 : 1;
  }

  function videoEnd() {
    return c.props.videoLength + videoStart();
  }

  return c;
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
