import React from 'react';
import './App.css';
import Login from './Login/Login';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { persistor } from './store';

import { fetchPlaylists, resetState, fetchPlaylistItems, nextVideo } from './actions';

function App(params) {
  const c = new React.Component(params);

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
            {c.props.playlistItems.map(function (item) {
              return(
                <li key={item.id}>{item.snippet.title}</li>
              );
            })}
          </ul>
        </div>

        <div className="currentVideo">
          {c.props.playlistItems.size &&
            <ReactPlayer
              url={`http://youtube.com/embed/${videoId()}`}
              controls={true}
              onEnded={handleVideoEnd}
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

  function videoId() {
    const { playlistItems, playlistIndex } = c.props;
    return playlistItems.get(playlistIndex).snippet.resourceId.videoId;
  }

  function handleVideoEnd() {
    c.props.dispatch(nextVideo());
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
