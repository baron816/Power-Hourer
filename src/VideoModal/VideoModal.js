import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import PlaylistItems from '../PlaylistItems/PlaylistItems';
import { invertModalState, savePlaylist } from '../actions';

import './VideoModal.css';

function VideoModal({
  showModal,
  invertModal,
  selectedPlaylist,
  savePl,
  settingsItems,
  Video,
  movePlItem
}) {
  const actions = [
    <FlatButton
      label='Close'
      primary={true}
      onTouchTap={invertModal}
    />
  ];

  return (
      <Dialog
        modal={true}
        open={showModal}
        actions={actions}
        contentStyle={{width: '98%', maxWidth: 'none'}}>
        <AppBar
          title={selectedPlaylist.get('title')}
          iconElementLeft={<CloseButton />}
          iconElementRight={<Settings />}
        />
        <div id='modalContent'>
          <PlaylistItems moveItem={movePlItem}/>
          <Video />
        </div>
      </Dialog>
  );

  function CloseButton() {
    return (
      <IconButton
        onTouchTap={invertModal}
      >
        <NavigationClose />
      </IconButton>
    );
  }

  function Settings() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {settingsItems}
        <MenuItem primaryText="Save Playlist Copy" onClick={savePl} />
      </IconMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.getIn(['root', 'showModal']),
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
    savePl,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal);
