import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import { makeProps } from '../utils';

import {
  hideError
} from '../actions';

import {
  open,
  message
} from '../selectors';

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

const mapStateToProps = makeProps({ open, message });

export default connect(mapStateToProps, {hideError})(ErrorBar);
