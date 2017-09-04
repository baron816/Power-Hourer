import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';

import {
  changeVideoStart,
  changeVideoLength,
  changeServerVideoStart,
  changeServerVideoLength
} from '../actions';

function ServerVideo({
  changeVideoStart,
  changeServerVideoStart,
  changeVideoLength,
  changeServerVideoLength
}) {
  function changeStartToNow(time) {
    changeVideoStart(time);
    changeServerVideoStart(time);
  }

  function changeVidStart(event) {
    const time = Number(event.target.value);
    changeStartToNow(time);
  }

  function changeVidLen(event) {
    const time = Number(event.target.value);
    changeVideoLength(time);
    changeServerVideoLength(time);
  }

  return (
    <Video
      changeVidStart={changeVidStart}
      changeVidLen={changeVidLen}
      changeStartToNow={changeStartToNow}
    />
  );
}


export default connect(function(){return{};}, {
  changeVideoStart,
  changeServerVideoStart,
  changeVideoLength,
  changeServerVideoLength
})(ServerVideo);
