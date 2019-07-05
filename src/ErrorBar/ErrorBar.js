import React from 'react';
import PropTypes from 'prop-types';
import enhancedConnect from '../enhancedConnect';
import Snackbar from 'material-ui/Snackbar';

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

const mapStateToProps = ['open', 'message' ];
const mapDispatchToProps = ['hideError'];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(ErrorBar);
