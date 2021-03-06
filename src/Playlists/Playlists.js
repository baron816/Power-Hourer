import React from 'react';
import enhancedConnect from '../enhancedConnect';
import PropTypes from 'prop-types';


import PlaylistComponent from './PlaylistComponent';

function Playlists(props) {
  return (
    <PlaylistComponent
      {...props}
      getPlaylist={getPlaylist}
    />
  );

  function getPlaylist(listId, index) {
    return function () {
      if (index !== props.playlistIndex || props.playlistName !== props.currentPlaylist) {
        props.setPlaylistIndex(index);
        props.fetchPlaylistItems(listId);
        props.goToVideo(0);
        props.changePlayState(false);
        props.resetClock();
        props.setCurrentPlaylist(props.playlistName);
      } else {
        props.setLoaded(true);
      }

      props.resetCallNext();
      props.invertModalState();
      props.setSearchingToFalse();
    };
  }
}

Playlists.propTypes = {
  playlistIndex: PropTypes.number.isRequired,
  currentPlaylist: PropTypes.string.isRequired,
  goToVideo: PropTypes.func.isRequired,
  changePlayState: PropTypes.func.isRequired,
  resetClock: PropTypes.func.isRequired,
  invertModalState: PropTypes.func.isRequired,
  setPlaylistIndex: PropTypes.func.isRequired,
  setCurrentPlaylist: PropTypes.func.isRequired,
  resetCallNext: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,
  setSearchingToFalse: PropTypes.func.isRequired,
  fetchPlaylistItems: PropTypes.func.isRequired,
  playlistName: PropTypes.string.isRequired
};

const mapStateToProps = ['playlistIndex', 'currentPlaylist'];
const mapDispatchToProps = [
  'goToVideo',
  'changePlayState',
  'resetClock',
  'invertModalState',
  'setPlaylistIndex',
  'setCurrentPlaylist',
  'resetCallNext',
  'setLoaded',
  'setSearchingToFalse'
];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(Playlists);
