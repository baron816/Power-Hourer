import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';

import { changeVideoStart } from '../actions';

function YouTubeVideo(props) {
  return (
    <Video {...props} />
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  function changeVidStart(index) {
    return function (event) {
      const time = event.target.value;
      dispatch(changeVideoStart(index, time));
    };
  }

  function changeStartToNow(index, time) {
    dispatch(changeVideoStart(index, time));
  }

  return {
    changeVidStart,
    changeStartToNow
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeVideo);
