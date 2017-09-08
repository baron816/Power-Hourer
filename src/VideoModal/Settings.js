import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeProps } from '../utils';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

import {
    serverId
} from '../selectors';

import {
    savePlaylist
} from '../actions';

function Settings({ 
    settingsItems,
    serverId: { length },
    savePlaylist,
    handleDefaultsOpen
}) {
    return (
        <IconMenu
            iconButtonElement={
                <IconButton iconStyle={{ color: 'white' }}>
                    <MoreVertIcon />
                </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            {settingsItems}
            {length && 
                <MenuItem 
                    primaryText="Save Playlist Copy" 
                    onClick={savePlaylist} 
                />
            }
            <MenuItem 
                primaryText='Set Defaults' 
                onClick={handleDefaultsOpen} 
            />
        </IconMenu>
    );
}

Settings.propTypes = {
    settingsItems: PropTypes.array.isRequired,
    serverId: PropTypes.string.isRequired,
    savePlaylist: PropTypes.func.isRequired,
    handleDefaultsOpen: PropTypes.func.isRequired
};

const mapStateToProps = makeProps({serverId});

export default connect(mapStateToProps, { savePlaylist })(Settings);