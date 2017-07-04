import React from 'react';
import { connect } from 'react-redux';
// import { compose } from 'redux';
import { makeProps, dispatchAll } from '../utils';

import {
  showModal,
  loaded,
  serverId
} from '../selectors';
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
    const { showModal, selectedPlaylist } = c.props;
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
  };

  function Content() {
    const { loaded, movePlItem, defaultStart, defaultLength, Video } = c.props;
    return loaded ? (
      <div id='modalContent'>
        <PlaylistItems moveItem={movePlItem}/>
        <Video
          defaultStart={defaultStart}
          defaultLength={defaultLength}
        />

        <DefaultsDialog />
      </div>
    ) : <div id='spinner'><CircularProgress size={100} thickness={8} /></div>;
  }

  function DefaultsDialog() {
    const { defaultLength, setDefaultLength, defaultStart, setDefaultStart } = c.props;
    return (
      <Dialog
        open={c.state.open}
        title='Playlist Defaults'
        onRequestClose={handleDefaultsOpen}
        actions={<FlatButton label='Close' primary={true} onTouchTap={handleDefaultsOpen} />}
      >
       <TextField
         floatingLabelText='Default Length'
         value={defaultLength}
         onChange={setDefaultLength}
         type='number'
         step={5}
         min={1}
       />
       <TextField
         floatingLabelText='Default Start'
         value={defaultStart}
         onChange={setDefaultStart}
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
    const { settingsItems, serverId: {length}, savePl } = c.props;
    return (
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={{color: 'white'}}><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {settingsItems}
        {length && <MenuItem primaryText="Save Playlist Copy" onClick={savePl} />}
        <MenuItem primaryText='Set Defaults'  onClick={handleDefaultsOpen}/>
      </IconMenu>
    );

  }

  function handleDefaultsOpen() {
    c.setState({open: !c.state.open});
  }

  return c;
}

const mapStateToProps = makeProps({showModal, loaded, serverId});

function mapDispatchToProps(dispatch) {
  return {
    invertModal: dispatchAll(dispatch, invertModalState(), setLoaded()),
    savePl: dispatchAll(dispatch, savePlaylist())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal);
