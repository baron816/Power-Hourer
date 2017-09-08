import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeProps } from '../utils';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {
    defaultLength,
    defaultStart
} from '../selectors';

function DefaultsDialog({
    defaultLength,
    defaultStart,
    setDefaultStart,
    setDefaultLength,
    handleDefaultsOpen,
    open
}) {

    return (
        <Dialog
            open={open}
            title='Playlist Defaults'
            onRequestClose={handleDefaultsOpen}
            actions={
                <FlatButton 
                    label='Close' 
                    primary={true} 
                    onTouchTap={handleDefaultsOpen} 
                />
            }
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

DefaultsDialog.propTypes = {
    defaultLength: PropTypes.number.isRequired,
    defaultStart: PropTypes.number.isRequired,
    setDefaultLength: PropTypes.func.isRequired,
    setDefaultStart: PropTypes.func.isRequired,
    handleDefaultsOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

const mapStateToProps = makeProps({ defaultStart, defaultLength});

export default connect(mapStateToProps)(DefaultsDialog);