import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { makePropsFromSelectors, makePropsFromActions } from '../utils';

import Clock from '../Clock/Clock';
import './Video.css';

function Video(props) {
  let videoElement;
  return (
    <Card id='video'>
      <CardHeader
        title={props.video.get('title')}
        subtitle={<Clock />}
        actAsExpander={true}
        showExpandableButton={true}/>
      <CardMedia style={{justifyContent: 'center', display: 'flex'}}>
        <YouTube
          videoId={props.video.get('videoId')}
          opts={{
            height: '420',
            width: '670',
            playerVars: {
              start: props.videoStart,
              end: props.videoEnd,
              autoplay: props.autoplay,
              rel: 0
            }
          }}
          onEnd={handleVideoEnd}
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
          value={String(props.videoLength)}
          onChange={props.changeVidLen}
          type='number'
          step={5}
          min={5}
        /> <br/>
        <TextField
          floatingLabelText='Video start time'
          value={String(props.videoStart)}
          onChange={props.changeVidStart}
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
      props.changeStartToNow(Math.floor(time));
    });
  }

  function changePlay(bool) {
    return function () {
      props.changePlayState(bool);
    };
  }

  function handleVideoError() {
    props.nextVideo();
    props.changePlayState(false);
  }

  function handleVideoEnd(event) {
    if (props.callNext) {
      props.nextVideo();
    }

    const duration = event.target.getDuration();

    if (duration >= props.videoEnd || duration === 0) {
      props.flipNext();
    }

    props.changePlayState(false);
  }
}

Video.propTypes = {
  video: PropTypes.object.isRequired,
  changePlayState: PropTypes.func.isRequired,
  callNext: PropTypes.bool.isRequired,
  videoLength: PropTypes.number.isRequired,
  changeVidLen: PropTypes.func.isRequired,
  changeVidStart: PropTypes.func.isRequired,
  videoStart: PropTypes.number.isRequired,
  videoEnd: PropTypes.number.isRequired,
  autoplay: PropTypes.number.isRequired,
  changeStartToNow: PropTypes.func.isRequired,
  nextVideo: PropTypes.func.isRequired,
  flipNext: PropTypes.func.isRequired
};

const mapStateToProps = makePropsFromSelectors([
  'video',
  'videoStart',
  'videoEnd',
  'videoLength',
  'autoplay',
  'callNext',
  'showModal'
]);

const mapDispatchToProps = makePropsFromActions([
  'nextVideo',
  'changePlayState',
  'flipNext'
]);

export default connect(mapStateToProps, mapDispatchToProps)(Video);
