import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';

import {
  changeVideoStart,
  changeVideoLength,
  setPlaylistDefaultStartTime
 } from '../actions';

function YouTubeVideo({
  changeVideoStart,
  setPlaylistDefaultStartTime,
  changeVideoLength
}) {
  function changeVidStart(event) {
    const time = Number(event.target.value);
    changeVideoStart(time);
  }

  function changeStartToNow(time) {
    changeVideoStart(time);
  }

  function changeSettings(fn) {
    return function (event) {
      const time = Number(event.target.value);
      fn(time);
    };
  }

  const setDefaultStart = changeSettings(setPlaylistDefaultStartTime);
  const changeVidLen = changeSettings(changeVideoLength);

  return (
    <Video
      changeVidStart={changeVidStart}
      changeStartToNow={changeStartToNow}
      setDefaultStart={setDefaultStart}
      changeVidLen={changeVidLen}
    />
  );
}

export default connect(function(){return{};}, {
  changeVideoStart,
  setPlaylistDefaultStartTime,
  changeVideoLength
})(YouTubeVideo);
