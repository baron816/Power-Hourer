import React from 'react';
import { connect } from 'react-redux';

import { incrementTime } from './actions';

function Clock(props) {
  const c = new React.Component(props);

  c.state = {
    intervalId: 0
  };

  c.componentDidMount = function () {
    const intervalId = setInterval(() => c.props.moveClock(), 1000);
    c.setState({intervalId});
  };

  c.componentWillUnmount = function () {
    clearInterval(c.state.intervalId);
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
    time: state.get('time')
  };
}

function mapDispatchToProps(dispatch) {
  function moveClock() {
    dispatch(incrementTime());
  }

  return {
    moveClock
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
