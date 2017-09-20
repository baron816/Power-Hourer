import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makePropsFromActions, makePropsFromSelectors } from '../../utils';

import VideoModalComponent from './VideoModalComponent';

function VideoModal(props) {
  const c = new React.Component(props);

  c.state = {
    open: false,
  };

  c.render = function () {
    return (
      <VideoModalComponent
        invertModal={invertModal}
        handleDefaultsOpen={handleDefaultsOpen}
        open={c.state.open}
        {...c.props}
      />
    );
  };

  function invertModal() {
    c.props.invertModalState();
    c.props.setLoaded();
  }

  function handleDefaultsOpen() {
    c.setState(prevState => ({open: !prevState.open}));
  }

  return c;
}

VideoModal.propTypes = {
  invertModalState: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired
};

const mapStateToProps = makePropsFromSelectors([
  'showModal',
  'searching',
  'loaded',
  'serverId',
  'defaultStart',
  'defaultLength'
]);
const mapDispatchToProps = makePropsFromActions([
  'invertModalState',
  'setLoaded',
  'savePlaylist'
]);

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal);
