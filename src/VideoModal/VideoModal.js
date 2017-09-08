import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeProps } from '../utils';

import {
  showModal,
  searching
} from '../selectors';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Content from './Content';
import Settings from './Settings';
import SearchVideos from '../SearchVideos/SearchVideos';

import {
  invertModalState,
  setLoaded
} from '../actions';

import './VideoModal.css';

function VideoModal(props) {
  const c = new React.Component(props);

  c.state = {
    open: false,
  };

  const actions = [
    <FlatButton
      label='Close'
      primary={true}
      onTouchTap={invertModal}
    />
  ];
  c.render = function () {
    const { 
      showModal, 
      selectedPlaylist, 
      settingsItems, 
      Video,
      moveItem,
      setDefaultLength,
      setDefaultStart
    } = c.props;
    return (
      <Dialog
        modal={true}
        open={showModal}
        actions={actions}
        bodyStyle={{minHeight: '600px', overflowY: 'scroll'}}
        contentStyle={{width: '98%', maxWidth: 'none'}}
      >
        <AppBar
          title={selectedPlaylist.get('title')}
          iconElementLeft={<CloseButton />}
          iconElementRight={
            <Settings 
              settingsItems={settingsItems}
              handleDefaultsOpen={handleDefaultsOpen}
            />
          }
        />
        {c.props.searching ? 
          <SearchVideos /> : 
          <Content
            handleDefaultsOpen={handleDefaultsOpen}
            open={c.state.open}
            Video={Video}
            moveItem={moveItem}
            setDefaultLength={setDefaultLength}
            setDefaultStart={setDefaultStart}
          />
        }
      </Dialog>
    );
  };

  function CloseButton() {
    return (
      <IconButton
        iconStyle={{color: 'white'}}
        onTouchTap={invertModal}
      >
        <NavigationClose />
      </IconButton>
    );
  }

  function invertModal() {
    const { invertModalState, setLoaded } = c.props;
    invertModalState();
    setLoaded();
  }

  function handleDefaultsOpen() {
    c.setState(prevState => ({open: !prevState.open}));
  }

  return c;
}

VideoModal.propTypes = {
  invertModalState: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  selectedPlaylist: PropTypes.object.isRequired,
  settingsItems: PropTypes.array.isRequired,
  Video: PropTypes.func.isRequired,
  setDefaultLength: PropTypes.func.isRequired,
  setDefaultStart: PropTypes.func.isRequired
};

const mapStateToProps = makeProps({ showModal, searching });

export default connect(mapStateToProps, { invertModalState, setLoaded })(VideoModal);
