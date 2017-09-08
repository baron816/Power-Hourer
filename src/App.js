import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import { makeProps } from './utils';

import {
  accessToken,
  serverId,
  currentPlaylist
} from './selectors';

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
  resetState,
  fetchYoutubePlaylists,
  fetchServerPlaylists,
  fetchPublicPlaylists,
  currentPlaylist
}) {

  const MODALS = {
    youtubePlaylists: YouTubeModal,
    serverPlaylists: ServerModal,
    publicPlaylists: PublicModal
  };

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
          <IconButton iconStyle={{color: 'white'}}><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem onClick={getPlaylists} primaryText="Reload Playlists" />
        <MenuItem onClick={resetState} primaryText="Logout" />
      </IconMenu>
    );
  }


  function VideoModal() {
    const Handler = MODALS[currentPlaylist] || PublicModal;

    return <Handler />;
  }

  function getPlaylists() {
    fetchYoutubePlaylists();
    fetchServerPlaylists();
    fetchPublicPlaylists();
  }
}

App.propTypes = {
  accessToken: PropTypes.string,
  serverId: PropTypes.string,
  currentPlaylist: PropTypes.string.isRequired,
  resetState: PropTypes.func.isRequired,
  fetchYoutubePlaylists: PropTypes.func.isRequired,
  fetchServerPlaylists: PropTypes.func.isRequired,
  fetchPublicPlaylists: PropTypes.func.isRequired
};

const mapStateToProps = makeProps({accessToken, serverId, currentPlaylist});

export default connect(mapStateToProps, {
  resetState,
  fetchYoutubePlaylists,
  fetchServerPlaylists,
  fetchPublicPlaylists
})(App);
