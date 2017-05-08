import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PlaylistItems from '../PlaylistItems/PlaylistItems';
import Video from '../Video/Video';
import { invertModalState, savePlaylist } from '../actions';

import './VideoModal.css';

function VideoModal({showModal, invertModal, playlistIndex, playlist, savePl}) {
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
          title={<PlaylistHead />}
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

  function PlaylistHead() {
    return (
      <div>
        {playlist.get(playlistIndex).get('title')}
        <FlatButton
          label='Save Playlist'
          primary={true}
          onTouchTap={savePl}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.getIn(['root', 'showModal']),
    playlistIndex: state.getIn(['playlists', 'playlistIndex']),
    playlist: state.getIn(['playlists', 'youtubePlaylists'])
  };
}

function mapDispatchToProps(dispatch) {
  function invertModal() {
    dispatch(invertModalState());
  }

  function savePl() {
    dispatch(savePlaylist());
  }

  return {
    invertModal,
    savePl
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal);
