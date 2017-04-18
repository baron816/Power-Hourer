import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import { persistor } from './store';
import Login from './Login/Login';
import Playlists from './Playlists';
import VideoModal from './VideoModal';

import {
  fetchPlaylists,
  resetState,
  changeVideoLength,
  invertModalState
} from './actions';

function App({accessToken, videoLength, getPlaylists, logout, changeVidLen, invertModal}) {
  return (
    <MuiThemeProvider>
      <div className="App">
        <AppBar title="Power Hourer" />
        <button onClick={getPlaylists}>Click Me</button>

        {!accessToken.length ?
          <Login /> : <button onClick={logout}>Logout</button>
        }
        <button onClick={invertModal}>Go To Video</button>
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

  function getPlaylists() {
    dispatch(fetchPlaylists());
  }

  function logout() {
    persistor.purge();
    dispatch(resetState());
  }

  function invertModal() {
    dispatch(invertModalState());
  }

  return {
    changeVidLen,
    getPlaylists,
    logout,
    invertModal
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
