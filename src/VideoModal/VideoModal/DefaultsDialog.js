import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default function DefaultsDialog(props) {
  return (
    <Dialog
      open={props.open}
      title='Playlist Defaults'
      onRequestClose={props.handleDefaultsOpen}
      actions={
        <FlatButton
          label='Close'
          primary={true}
          onTouchTap={props.handleDefaultsOpen}
        />
      }
    >
      <TextField
        floatingLabelText='Default Length'
        value={props.defaultLength}
        onChange={props.setDefaultLength}
        type='number'
        step={5}
        min={1}
      />
      <TextField
        floatingLabelText='Default Start'
        value={props.defaultStart}
        onChange={props.setDefaultStart}
        type='number'
        step={5}
        min={0}
      />
    </Dialog>
  );
}

DefaultsDialog.propTypes = {
    defaultLength: PropTypes.number.isRequired,
    defaultStart: PropTypes.number.isRequired,
    setDefaultLength: PropTypes.func.isRequired,
    setDefaultStart: PropTypes.func.isRequired,
    handleDefaultsOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};
