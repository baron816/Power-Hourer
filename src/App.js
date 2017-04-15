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
  incrementTime,
} from './actions';

function App(props) {
  const c = new React.Component(props);

  c.state = {
    intervalId: 0
  };

  c.componentDidMount = function () {
    const intervalId = setInterval(() => c.props.moveClock(), 1000);
    c.setState({intervalId});
  };

  c.componentWillUnmount = function () {
    clearInterval(c.state.intervalId);
  };

  c.render = function () {
    return (
      <div className="App">

      <button onClick={c.props.getPlaylists}>Click Me</button>

      {!c.props.accessToken.length ?
        <Login /> : <button onClick={c.props.logout}>Logout</button>
      }

      <Playlists />

      <PlaylistItems />


      <Clock />

      <input type="number" min={10} max={120} step={10} onChange={c.props.changeVidLen} value={c.props.videoLength}/>

      <Video />
      </div>
    );
  };

  return c;
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


  function moveClock() {
    dispatch(incrementTime());
  }

  return {
    changeVidLen,
    getPlaylists,
    logout,
    moveClock
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
