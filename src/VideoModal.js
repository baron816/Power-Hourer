import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PlaylistItems from './PlaylistItems';
import Video from './Video';
import { invertModalState } from './actions';

import './VideoModal.css';

function VideoModal({showModal, invertModal}) {
  const actions = [
    <FlatButton
      label='Close'
      primary={true}
      onTouchTap={invertModal} />
  ];

  return (
      <Dialog
        title="A Video"
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
}

function mapStateToProps(state) {
  return {
    showModal: state.get('showModal')
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
