import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MusicNote from 'material-ui/svg-icons/image/music-note';

import Login from './Login/Login';
import ServerPlaylists from './Playlists/ServerPlaylists';
import YouTubePlaylists from './Playlists/YouTubePlaylists';
import PublicPlaylists from './Playlists/PublicPlaylists';
import ServerModal from './VideoModal/ServerModal';
import YouTubeModal from './VideoModal/YouTubeModal';
import PublicModal from './VideoModal/PublicModal';
import ErrorBar from './ErrorBar/ErrorBar';

import {
  resetState,
  fetchYoutubePlaylists,
  fetchServerPlaylists,
  fetchPublicPlaylists
} from './actions';

function App({
  accessToken,
  logout,
  getPlaylists,
  currentPlaylistName
}) {

  return (
      <div className="App">
        <AppBar
          title="Power Hourer"
          iconElementRight={accessToken.length ? <Logged /> : <Login />}
          iconElementLeft={<IconButton><MusicNote /></IconButton>}
        />

        <div id="playlistLists">
          <PublicPlaylists />
          <ServerPlaylists />
          <YouTubePlaylists />
        </div>

        <VideoModal />
        <ErrorBar />
      </div>
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
        <MenuItem onClick={getPlaylists} primaryText="Reload Playlists" />
        <MenuItem onClick={logout} primaryText="Logout" />
      </IconMenu>
    );
  }

  function VideoModal() {
    switch (currentPlaylistName) {
      case 'youtubePlaylists':
        return <YouTubeModal />;
      case 'serverPlaylists':
        return <ServerModal />;
      case 'publicPlaylists':
        return <PublicModal />;
      default:
        return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.getIn(['root', 'accessToken']),
    serverId: state.getIn(['root', 'serverId']),
    currentPlaylistName: state.getIn(['playlists', 'currentPlaylist'])
  };
}

function mapDispatchToProps(dispatch) {
  function logout() {
    dispatch(resetState());
  }

  function getPlaylists() {
    dispatch(fetchYoutubePlaylists());
    dispatch(fetchServerPlaylists());
    dispatch(fetchPublicPlaylists());
  }

  return {
    logout,
    getPlaylists
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
