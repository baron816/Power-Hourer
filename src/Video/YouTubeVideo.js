import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';

import {
  changeVideoStart,
  changeVideoLength,
  setPlaylistDefaultStartTime
 } from '../actions';

function YouTubeVideo(props) {
  return (
    <Video {...props} />
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  function changeVidStart(event) {
    const time = event.target.value;
    dispatch(changeVideoStart(time));
  }

  function changeStartToNow(time) {
    dispatch(changeVideoStart(time));
  }

  function setDefaultStart(event) {
    const time = event.target.value;
    dispatch(setPlaylistDefaultStartTime(time));
  }

  function changeVidLen(event) {
    const time = event.target.value;
    dispatch(changeVideoLength(time));
  }

  return {
    changeVidStart,
    changeVidLen,
    changeStartToNow,
    setDefaultStart
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeVideo);
