import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

export default function Settings(props) {
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
            {props.settingsItems}
            {props.serverId.length &&
                <MenuItem
                    primaryText="Save Playlist Copy"
                    onClick={props.savePlaylist}
                />
            }
            <MenuItem
                primaryText='Set Defaults'
                onClick={props.handleDefaultsOpen}
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
