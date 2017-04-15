import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { persistor } from './store';

import Login from './Login/Login';
import Clock from './Clock';
import Playlists from './Playlists';
import PlaylistItems from './PlaylistItems';
import Video from './Video';

import {
  fetchPlaylists,
  resetState,
  changeVideoLength,
} from './actions';

function App({accessToken, videoLength, getPlaylists, logout, changeVidLen}) {
  return (
    <div className="App">

    <button onClick={getPlaylists}>Click Me</button>

    {!accessToken.length ?
      <Login /> : <button onClick={logout}>Logout</button>
    }

    <Playlists />

    <PlaylistItems />


    <Clock />

    <input type="number" min={10} max={120} step={10} onChange={changeVidLen} value={videoLength}/>

    <Video />
    </div>
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

  return {
    changeVidLen,
    getPlaylists,
    logout
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
