import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';

import { setUsername, showCreateDialog, createUser } from '../actions';

function CreateUser({
  username,
  changeUsername,
  showCreateDialog,
  toggle,
  handleCreateUser
}) {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={toggle}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={handleCreateUser}
    />
  ];

  return (
    <Dialog
      title="Create Account"
      open={showCreateDialog}
      modal={false}
      actions={actions}
      onRequestClose={toggle}
    >
      <TextField
        hintText="Select a username"
        value={username}
        onChange={changeUsername}
      />
    </Dialog>
  );
}

function mapStateToProps(state) {
  return {
    username: state.getIn(['createUser', 'username']),
    showCreateDialog: state.getIn(['createUser', 'showCreateDialog'])
  };
}

function mapDispatchToProps(dispatch) {
  function changeUsername(event) {
    dispatch(setUsername(event.target.value));
  }

  function toggle() {
    dispatch(showCreateDialog());
  }

  function handleCreateUser() {
    dispatch(createUser());
    dispatch(showCreateDialog());
  }

  return {
    changeUsername,
    toggle,
    handleCreateUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
