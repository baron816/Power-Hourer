import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PlaylistItems from './PlaylistItems/PlaylistItems';
import Video from './Video';
import { invertModalState } from './actions';

import './VideoModal.css';

function VideoModal({showModal, invertModal, playlistIndex, playlist}) {
  const actions = [
    <FlatButton
      label='Close'
      primary={true}
      onTouchTap={invertModal} />
  ];

  return (
      <Dialog
        title={playlistName()}
        modal={true}
        open={showModal}
        actions={actions}
        contentStyle={{width: '90%', maxWidth: '90%'}}>

        <div id="modalContent">
          <PlaylistItems />
          <Video />
        </div>
      </Dialog>
  );

  function playlistName() {
    return playlist.get([playlistIndex], 'title');
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.get('root').get('showModal'),
    playlistIndex: state.get('playlists').get('playlistIndex'),
    playlist: state.get('playlists').get('playlists')
  };
}

function mapDispatchToProps(dispatch) {
  function invertModal() {
    dispatch(invertModalState());
  }

  return {
    invertModal
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal);
