import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';

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
  function changeVidStart(event) {
    const time = event.target.value;
    changeStartToNow(time);
  }

  function changeStartToNow(time) {
    dispatch(changeVideoStart(time));
    dispatch(changeServerVideoStart(time));
  }

  function changeVidLen(event) {
    const time = event.target.value;
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
