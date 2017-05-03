import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MusicNote from 'material-ui/svg-icons/image/music-note';

import { persistor } from './store';
import Login from './Login/Login';
import Playlists from './Playlists/Playlists';
import VideoModal from './VideoModal';

import {
  resetState,
} from './actions';

function App({accessToken, logout}) {
  return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="Power Hourer"
          iconElementRight={accessToken.length ? <FlatButton onClick={logout} label="Logout" /> : <Login />}
          iconElementLeft={<IconButton><MusicNote /></IconButton>}
          />

        <Playlists />


        <VideoModal />

      </div>
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    accessToken: state.get('root').get('accessToken')
  };
}

function mapDispatchToProps(dispatch) {
  function logout() {
    persistor.purge();
    dispatch(resetState());
  }

  return {
    logout
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
