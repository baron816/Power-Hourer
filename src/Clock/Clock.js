import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  startTime,
  endTime,
  incrementPlayCount
} from '../actions';

function Clock(props) {
  const c = new React.Component(props);

  c.state = {
    intervalId: 0
  };

  c.componentDidMount = function () {
    c.props.moveClock();
  };

  c.componentWillUnmount = function () {
    c.props.stopClock();
  };

  c.componentDidUpdate = function () {
    const { time, currentPlaylist } = c.props;
    if (time === 1600 && currentPlaylist) {
      c.props.updatePlayCount(currentPlaylist);
    }
  };

  c.render = function () {
    return (
      <div className="Clock">
      {parseTime()}
      </div>
    );
  };

  function parseTime() {
    const { time } = c.props;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (minutes > 0 ? minutes + ':' : '') + (seconds < 10 ? '0' + seconds : seconds);
  }

  return c;
}

function mapStateToProps(state) {
  return {
    time: state.getIn(['clock', 'time']),
    currentPlaylist: state.getIn(['playlists', 'currentPlaylist'])
  };
}

function mapDispatchToProps(dispatch) {
  const moveClock = compose(dispatch, startTime);
  const stopClock = compose(dispatch, endTime);
  const updatePlayCount = compose(dispatch, incrementPlayCount);

  return {
    moveClock,
    stopClock,
    updatePlayCount
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
