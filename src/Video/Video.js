import React from 'react';
import PropTypes from 'prop-types';
import enhancedConnect from '../enhancedConnect';
import VideoComponent from './VideoComponent';

import './Video.css';

function Video(props) {
  let videoElement;
  return (
    <VideoComponent
      {...props}
      startNow={startNow}
      changePlay={changePlay}
      handleVideoError={handleVideoError}
      handleVideoEnd={handleVideoEnd}
      setVideoElement={setVideoElement}
    />
  );

  function setVideoElement(el) {
    videoElement = el;
  }

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
  changePlayState: PropTypes.func.isRequired,
  callNext: PropTypes.bool.isRequired,
  changeVidLen: PropTypes.func.isRequired,
  changeVidStart: PropTypes.func.isRequired,
  videoEnd: PropTypes.number.isRequired,
  changeStartToNow: PropTypes.func.isRequired,
  nextVideo: PropTypes.func.isRequired,
  flipNext: PropTypes.func.isRequired
};

const mapStateToProps = [
  'video',
  'videoStart',
  'videoEnd',
  'videoLength',
  'autoplay',
  'callNext',
  'showModal'
];

const mapDispatchToProps = [
  'nextVideo',
  'changePlayState',
  'flipNext'
];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(Video);
