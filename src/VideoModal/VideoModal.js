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
import CircularProgress from 'material-ui/CircularProgress';

import PlaylistItems from '../PlaylistItems/PlaylistItems';
import {
  invertModalState,
  savePlaylist,
  setLoaded
} from '../actions';

import './VideoModal.css';

function VideoModal({
  showModal,
  invertModal,
  selectedPlaylist,
  savePl,
  settingsItems,
  Video,
  movePlItem,
  loaded,
  serverId
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
        bodyStyle={{minHeight: '800px', overflowY: 'scroll'}}
        contentStyle={{width: '98%', maxWidth: 'none'}}>
        <AppBar
          title={selectedPlaylist.get('title')}
          iconElementLeft={<CloseButton />}
          iconElementRight={<Settings />}
        />
        <Content/>
      </Dialog>
  );

  function Content() {
    return loaded ? (
      <div id='modalContent'>
        <PlaylistItems moveItem={movePlItem}/>
        <Video />
      </div>
    ) : <div id='spinner'><CircularProgress size={100} thickness={8} /></div>;
  }

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
        {serverId.size && <MenuItem primaryText="Save Playlist Copy" onClick={savePl} />}
      </IconMenu>
    );
  }
}

function mapStateToProps(state) {
  return {
    showModal: state.getIn(['root', 'showModal']),
    loaded: state.getIn(['playlistItems', 'loaded']),
    serverId: state.getIn(['root', 'serverId'])
  };
}

function mapDispatchToProps(dispatch) {
  function invertModal() {
    dispatch(invertModalState());
    dispatch(setLoaded(false));
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
