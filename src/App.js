import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import MusicNote from 'material-ui/svg-icons/image/music-note';

import { persistor } from './store';
import Login from './Login/Login';
import Playlists from './Playlists';
import VideoModal from './VideoModal';

import {

  resetState,
  changeVideoLength
} from './actions';

function App({accessToken, videoLength, logout, changeVidLen}) {
  return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar
          title="Power Hourer"
          iconElementRight={accessToken.length ? <FlatButton onClick={logout} label="Logout" /> : <Login />}
          iconElementLeft={<IconButton><MusicNote /></IconButton>}
          />

        <Playlists />

        <input type="number" min={10} max={120} step={10} onChange={changeVidLen} value={videoLength}/>
        <VideoModal />
      </div>
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    accessToken: state.get('accessToken'),
    videoLength: state.get('videoLength'),
  };
}

function mapDispatchToProps(dispatch) {
  function changeVidLen(event) {
    dispatch(changeVideoLength(event.target.value));
  }



  function logout() {
    persistor.purge();
    dispatch(resetState());
  }

  return {
    changeVidLen,
    logout
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
