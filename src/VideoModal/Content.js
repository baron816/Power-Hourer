import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeProps } from '../utils';

import CircularProgress from 'material-ui/CircularProgress';
import DefaultsDialog from './DefaultsDialog';
import PlaylistItems from '../PlaylistItems/PlaylistItems';

import {
    loaded
} from '../selectors';

function Content({
    loaded,
    moveItem,
    Video,
    handleDefaultsOpen,
    open,
    setDefaultLength,
    setDefaultStart
}) {

    return loaded ? (
        <div id='modalContent'>
            <PlaylistItems moveItem={moveItem} />
            <Video />

            <DefaultsDialog 
                handleDefaultsOpen={handleDefaultsOpen} 
                open={open}
                setDefaultLength={setDefaultLength}
                setDefaultStart={setDefaultStart}
            />
        </div>
    ) : <div id='spinner'><CircularProgress size={100} thickness={8} /></div>;
}

Content.propTypes = {
    loaded: PropTypes.bool,
    moveItem: PropTypes.func.isRequired,
    Video: PropTypes.func.isRequired,
    handleDefaultsOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setDefaultLength: PropTypes.func.isRequired,
    setDefaultStart: PropTypes.func.isRequired 
};

const mapStateToProps = makeProps({loaded});

export default connect(mapStateToProps)(Content);