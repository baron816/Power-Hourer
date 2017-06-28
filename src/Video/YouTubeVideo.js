import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import { dispatchAll } from '../utils';

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
    const time = Number(event.target.value);
    dispatch(changeVideoStart(time));
  }

  const changeStartToNow = dispatchAll(dispatch, changeVideoStart);

  function setDefaultStart(event) {
    const time = Number(event.target.value);
    dispatch(setPlaylistDefaultStartTime(time));
  }

  function changeVidLen(event) {
    const time = Number(event.target.value);
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
