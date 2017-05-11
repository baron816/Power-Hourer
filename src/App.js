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
import ServerPlaylists from './Playlists/ServerPlaylists';
import YouTubePlaylists from './Playlists/YouTubePlaylists';
import VideoModal from './VideoModal/VideoModal';
import CreateUser from './CreateUser/CreateUser';

import {
  resetState,
  showCreateDialog,
  getServerPlaylists
} from './actions';

function App({accessToken, logout, showCreateUser, fetchServerUser}) {

  return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="Power Hourer"
          iconElementRight={accessToken.length ? <Logged /> : <Login />}
          iconElementLeft={<IconButton><MusicNote /></IconButton>}
        />

        <div id="playlistLists">
          <ServerPlaylists />
          <YouTubePlaylists />
        </div>

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
        <MenuItem onClick={fetchServerUser} primaryText="get user" />
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

  function fetchServerUser() {
    dispatch(getServerPlaylists());
  }

  return {
    logout,
    showCreateUser,
    fetchServerUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
