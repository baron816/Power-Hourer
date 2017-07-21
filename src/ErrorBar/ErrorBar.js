import React from 'react';
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

const mapStateToProps = makeProps({ open, message });

export default connect(mapStateToProps, {hideError})(ErrorBar);
