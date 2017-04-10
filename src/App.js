import React from 'react';
import './App.css';
import Login from './Login/Login';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { persistor } from './store';

import { fetchPlaylists, resetState, fetchPlaylistItems, nextVideo, goToVideo } from './actions';

function App(params) {
  const c = new React.Component(params);

  c.state = {
    callNext: true
  };

  c.render = function() {

    return (
      <div className="App">

        <button onClick={getPlaylists}>Click Me</button>

        {!c.props.accessToken.length ?
          <Login /> : <button onClick={logout}>Logout</button>
        }

        <div className="Playlists">
          <ul>
            {c.props.playlists.map(function (list) {
              return(
                <li key={list.id} onClick={getPlaylist(list.id)}>{list.snippet.title}</li>
              );
            })}
          </ul>
        </div>

        <div className="PlaylistItems">
          <ul>
            {c.props.playlistItems.map(function (item, index) {
              return(
                <li key={item.id} data-index={index} onClick={setVideoIndex}>{item.snippet.title}</li>
              );
            })}
          </ul>
        </div>

        <div className="currentVideo">
          {c.props.playlistItems.size &&
            <YouTube
              videoId={videoId()}
              opts={{playerVars: {start: 30, end: 40, autoplay: 1, rel: 0}}}
              onEnd={handleVideoEnd}
            />
          }
        </div>
      </div>
    );
  };

  function getPlaylist(playlistId) {
    return function () {
      c.props.dispatch(fetchPlaylistItems(playlistId));
    };
  }

  function setVideoIndex(event) {
    c.props.dispatch(goToVideo(event.target.dataset.index));
  }

  function videoId() {
    const { playlistItems, playlistIndex } = c.props;
    return playlistItems.get(playlistIndex).snippet.resourceId.videoId;
  }

  function handleVideoEnd() {
    // if statement is workaround for bug that causes onEnd to be called twice
    if (c.state.callNext) {
      c.props.dispatch(nextVideo());
    }
    c.setState({callNext: !c.state.callNext});
  }

  function logout() {
    persistor.purge();
    c.props.dispatch(resetState());
  }

  function getPlaylists() {
    c.props.dispatch(fetchPlaylists());
  }

  return c;
}

function mapStateToProps(state) {
  return {
    accessToken: state.get('accessToken'),
    playlists: state.get('playlists'),
    playlistItems: state.get('playlistItems'),
    playlistIndex: state.get('playlistIndex')
  };
}

export default connect(mapStateToProps)(App);
