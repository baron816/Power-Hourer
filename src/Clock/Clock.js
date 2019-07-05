import React from 'react';
import PropTypes from 'prop-types';
import enhancedConnect from '../enhancedConnect';

function Clock(props) {
  const c = new React.Component(props);

  c.state = {
    intervalId: 0
  };

  c.componentDidMount = function () {
    c.props.startTime();
  };

  c.componentWillUnmount = function () {
    c.props.endTime();
  };

  c.componentDidUpdate = function () {
    const { time, currentPlaylist } = c.props;
    if (time === 1600 && currentPlaylist) {
      c.props.incrementPlayCount(currentPlaylist);
    }
  };

  c.render = function () {
    return (
      <div className="Clock">
        {parseTime(c.props.time)}
      </div>
    );
  };

  function parseTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (minutes > 0 ? minutes + ':' : '') + (seconds < 10 ? '0' + seconds : seconds);
  }

  return c;
}

Clock.propTypes = {
  time: PropTypes.number.isRequired,
  currentPlaylist: PropTypes.string.isRequired,
  startTime: PropTypes.func.isRequired,
  endTime: PropTypes.func.isRequired,
  incrementPlayCount: PropTypes.func.isRequired
};

const mapStateToProps = ['time', 'currentPlaylist'];
const mapDispatchToProps = ['startTime', 'endTime', 'incrementPlayCount'];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(Clock);
