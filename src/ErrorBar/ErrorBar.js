import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import {
  hideError
} from '../actions';

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

function mapStateToProps(state) {
  return {
    open: state.getIn(['error', 'open']),
    message: state.getIn(['error', 'message'])
  };
}

function mapDispatchToProps(dispatch) {
  function hide() {
    dispatch(hideError());
  }

  return {
    hide
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBar);
