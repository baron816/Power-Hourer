import React from 'react';
import { connect } from 'react-redux';

function Clock({time}) {
  return (
    <div className="Clock">
      {parseTime()}
    </div>
  );

  function parseTime() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (minutes > 0 ? minutes + ':' : '') + (seconds < 10 ? '0' + seconds : seconds);
  }
}

function mapStateToProps(state) {
  return {
    time: state.get('time')
  };
}

export default connect(mapStateToProps)(Clock);
