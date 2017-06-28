import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import { dispatchAll } from '../utils';

import {
  changeVideoStart,
  changeVideoLength,
  changeServerVideoStart,
  changeServerVideoLength
} from '../actions';

function ServerVideo(props) {
  return (
    <Video {...props} />
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  const changeStartToNow = dispatchAll(dispatch, changeVideoStart, changeServerVideoStart);

  function changeVidStart(event) {
    const time = Number(event.target.value);
    changeStartToNow(time);
  }

  function changeVidLen(event) {
    const time = Number(event.target.value);
    dispatch(changeVideoLength(time));
    dispatch(changeServerVideoLength(time));
  }

  return {
    changeVidStart,
    changeVidLen,
    changeStartToNow
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerVideo);
