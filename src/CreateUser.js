import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

function CreateUser() {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
    />
  ];

  return (
    <Dialog
      title="Create Account"
      open={true}
      modal={false}
      actions={actions}
    >
      <TextField
        hintText="Select a username"
      />
    </Dialog>
  );
}

export default CreateUser;
