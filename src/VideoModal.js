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
    <div>
      {playlist.size &&
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
      }
    </div>
  );

  function playlistName() {
    return playlist.get(playlistIndex).get('title');
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.getIn(['root', 'showModal']),
    playlistIndex: state.getIn(['playlists', 'playlistIndex']),
    playlist: state.getIn(['playlists', 'playlists'])
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
