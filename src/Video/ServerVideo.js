import React from 'react';
import PropTypes from 'prop-types';
import enhancedConnect from '../enhancedConnect';
import Video from './Video';

function ServerVideo(props) {
  function changeStartToNow(time) {
    props.changeVideoStart(time);
    props.changeServerVideoStart(time);
  }

  function changeVidStart(event) {
    const time = Number(event.target.value);
    props.changeStartToNow(time);
  }

  function changeVidLen(event) {
    const time = Number(event.target.value);
    props.changeVideoLength(time);
    props.changeServerVideoLength(time);
  }

  return (
    <Video
      changeVidStart={changeVidStart}
      changeVidLen={changeVidLen}
      changeStartToNow={changeStartToNow}
    />
  );
}

ServerVideo.propTypes = {
  changeVideoStart: PropTypes.func.isRequired,
  changeVideoLength: PropTypes.func.isRequired,
  changeServerVideoStart: PropTypes.func.isRequired,
  changeServerVideoLength: PropTypes.func.isRequired
};

const mapDispatchToProps = [
  'changeVideoStart',
  'changeServerVideoStart',
  'changeVideoLength',
  'changeServerVideoLength'
];

export default enhancedConnect([], mapDispatchToProps)(ServerVideo);
