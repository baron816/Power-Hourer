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
import TextField from 'material-ui/TextField';

import PlaylistItems from '../PlaylistItems/PlaylistItems';
import {
  invertModalState,
  savePlaylist,
  setLoaded
} from '../actions';

import './VideoModal.css';

function VideoModal(props) {
  const c = new React.Component(props);

  c.state = {
    open: false
  };

  const actions = [
    <FlatButton
      label='Close'
      primary={true}
      onTouchTap={c.props.invertModal}
    />
  ];

  c.render = function () {
    return (
      <Dialog
      modal={true}
      open={c.props.showModal}
      actions={actions}
      bodyStyle={{minHeight: '800px', overflowY: 'scroll'}}
      contentStyle={{width: '98%', maxWidth: 'none'}}>
      <AppBar
      title={c.props.selectedPlaylist.get('title')}
      iconElementLeft={<CloseButton />}
      iconElementRight={<Settings />}
      />
        <Content/>
      </Dialog>
    );
  };

  function Content() {
    return c.props.loaded ? (
      <div id='modalContent'>
        <PlaylistItems moveItem={c.props.movePlItem}/>
        <c.props.Video
          defaultStart={c.props.defaultStart}
          defaultLength={c.props.defaultLength}
        />

        <DefaultsDialog />
      </div>
    ) : <div id='spinner'><CircularProgress size={100} thickness={8} /></div>;
  }

  function DefaultsDialog() {
    return (
      <Dialog
        open={c.state.open}
        title='Playlist Defaults'
        onRequestClose={handleDefaultsOpen}
        actions={<FlatButton label='Close' primary={true} onTouchTap={handleDefaultsOpen} />}
      >
       <TextField
         floatingLabelText='Default Length'
         value={c.props.defaultLength}
         onChange={c.props.setDefaultLength}
         type='number'
         step={5}
         min={1}
       />
       <TextField
         floatingLabelText='Default Start'
         value={c.props.defaultStart}
         onChange={c.props.setDefaultStart}
         type='number'
         step={5}
         min={0}
       />
      </Dialog>
    );
  }

  function CloseButton() {
    return (
      <IconButton
        iconStyle={{color: 'white'}}
        onTouchTap={c.props.invertModal}
      >
        <NavigationClose />
      </IconButton>
    );
  }

  function Settings() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={{color: 'white'}}><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {c.props.settingsItems}
        {c.props.serverId.length && <MenuItem primaryText="Save Playlist Copy" onClick={c.props.savePl} />}
        <MenuItem primaryText='Set Defaults'  onClick={handleDefaultsOpen}/>
      </IconMenu>
    );

  }

  function handleDefaultsOpen() {
    c.setState({open: !c.state.open});
  }

  return c;
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
