import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import { dispatchAll, makeProps } from '../utils';

import {
  hideError
} from '../actions';

import {
  open,
  message
} from '../selectors';

function ErrorBar({open, message, hide}) {
  return (
    <Snackbar
      open={open}
      message={message}
      onRequestClose={hide}
      autoHideDuration={4000}
    />
  );
}

const mapStateToProps = makeProps({ open, message });

function mapDispatchToProps(dispatch) {
  return {
    hide: dispatchAll(dispatch, hideError)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBar);
