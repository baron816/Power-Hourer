import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Video from './Video';
import { makePropsFromActions } from '../utils';


function YouTubeVideo(props) {
  function changeVidStart(event) {
    const time = Number(event.target.value);
    props.changeVideoStart(time);
  }

  function changeStartToNow(time) {
    props.changeVideoStart(time);
  }

  function changeSettings(fn) {
    return function (event) {
      const time = Number(event.target.value);
      fn(time);
    };
  }

  const setDefaultStart = changeSettings(props.setPlaylistDefaultStartTime);
  const changeVidLen = changeSettings(props.changeVideoLength);

  return (
    <Video
      changeVidStart={changeVidStart}
      changeStartToNow={changeStartToNow}
      setDefaultStart={setDefaultStart}
      changeVidLen={changeVidLen}
    />
  );
}

YouTubeVideo.propTypes = {
  changeVideoStart: PropTypes.func.isRequired,
  changeVideoLength: PropTypes.func.isRequired,
  setPlaylistDefaultStartTime: PropTypes.func.isRequired
};

const mapDispatchToProps = makePropsFromActions([
  'changeVideoStart',
  'setPlaylistDefaultStartTime',
  'changeVideoLength'
]);

export default connect(() => ({}), mapDispatchToProps)(YouTubeVideo);
