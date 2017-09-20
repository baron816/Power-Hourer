import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Content from './Content';
import Settings from './Settings';
import SearchVideos from '../../SearchVideos/SearchVideos';

import './VideoModal.css';

export default function VideoModalComponent(props) {
  const actions = [
    <FlatButton
      label='Close'
      primary={true}
      onTouchTap={props.invertModal}
    />
  ];

  return (
    <Dialog
      modal={true}
      open={props.showModal}
      actions={actions}
      bodyStyle={{minHeight: '600px', overflowY: 'scroll'}}
      contentStyle={{width: '98%', maxWidth: 'none'}}
    >
      <AppBar
        title={props.selectedPlaylist.get('title')}
        iconElementLeft={
          <CloseButton invertModal={props.invertModal} />
        }
        iconElementRight={
          <Settings {...props} />
        }
      />
      {props.searching ?
        <SearchVideos /> :
        <Content {...props} />
      }
    </Dialog>
  );

}

function CloseButton(props) {
  return (
    <IconButton
      iconStyle={{color: 'white'}}
      onTouchTap={props.invertModal}
    >
    <NavigationClose />
    </IconButton>
  );
}

VideoModalComponent.propTypes = {
  showModal: PropTypes.bool.isRequired,
  selectedPlaylist: PropTypes.object.isRequired,
  Video: PropTypes.func.isRequired,
  invertModal: PropTypes.func.isRequired
};
