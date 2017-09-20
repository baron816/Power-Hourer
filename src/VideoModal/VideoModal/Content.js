import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import DefaultsDialog from './DefaultsDialog';
import PlaylistItems from '../../PlaylistItems/PlaylistItems';

export default function Content(props) {
    return props.loaded ? (
        <div id='modalContent'>
            <PlaylistItems moveItem={props.moveItem} />
            <props.Video />

            <DefaultsDialog {...props} />
        </div>
    ) : <div id='spinner'><CircularProgress size={100} thickness={8} /></div>;
}

Content.propTypes = {
    loaded: PropTypes.bool,
    moveItem: PropTypes.func.isRequired,
    Video: PropTypes.func.isRequired,
};
