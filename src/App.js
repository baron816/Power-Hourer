import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MusicNote from 'material-ui/svg-icons/image/music-note';

import { persistor } from './store';
import Login from './Login/Login';
import Playlists from './Playlists/Playlists';
import VideoModal from './VideoModal';
import CreateUser from './CreateUser/CreateUser';

import {
  resetState,
  showCreateDialog,
} from './actions';

function App({accessToken, logout, showCreateUser}) {

  return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="Power Hourer"
          iconElementRight={accessToken.length ? <Logged /> : <Login />}
          iconElementLeft={<IconButton><MusicNote /></IconButton>}
          />

        <Playlists />

        <VideoModal />
        <CreateUser />

      </div>
    </MuiThemeProvider>
  );

  function Logged() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem onClick={showCreateUser} primaryText="Create Account" />
        <MenuItem onClick={logout} primaryText="Logout" />
      </IconMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.getIn(['root', 'accessToken'])
  };
}

function mapDispatchToProps(dispatch) {
  function logout() {
    persistor.purge();
    dispatch(resetState());
  }

  function showCreateUser() {
    dispatch(showCreateDialog());
  }

  return {
    logout,
    showCreateUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
