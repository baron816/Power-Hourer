import React from 'react';
import { connect } from 'react-redux';
import { makeProps, dispatchAll } from '../utils';

import {
  time,
  currentPlaylist
} from '../selectors';

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

const mapStateToProps = makeProps({time, currentPlaylist});

function mapDispatchToProps(dispatch) {
  return {
    moveClock: dispatchAll(dispatch, startTime),
    stopClock: dispatchAll(dispatch, endTime),
    updatePlayCount: dispatchAll(dispatch, incrementPlayCount)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
