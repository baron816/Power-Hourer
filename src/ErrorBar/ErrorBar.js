import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import { makePropsFromActions, makePropsFromSelectors } from '../utils';

function ErrorBar({open, message, hideError}) {
  return (
    <Snackbar
      open={open}
      message={message}
      onRequestClose={hideError}
      autoHideDuration={4000}
    />
  );
}

ErrorBar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  hideError: PropTypes.func.isRequired
};

const mapStateToProps = makePropsFromSelectors(['open', 'message' ]);
const mapDispatchToProps = makePropsFromActions(['hideError']);

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBar);
