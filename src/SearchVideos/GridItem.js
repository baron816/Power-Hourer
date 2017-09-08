import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Star from 'material-ui/svg-icons/toggle/star';

import {
    addVideoToServerPlaylist
} from '../actions';

function GridItem(props) {
    const c = new React.Component(props);

    c.state = {
        added: false
    };

    c.render = function () {
        const { item, index } = c.props;
        return (
            <GridTile
                title={item.get('title')}
                actionIcon={
                    <IconButton
                        disabled={c.state.added}
                        onClick={handleAdd(index)}>
                        <Star color='white' />
                    </IconButton>
                }
            >
                <img src={`https://i.ytimg.com/vi/${item.get('videoId')}/mqdefault.jpg`} alt='#' />
            </GridTile>
        );
    };

    function handleAdd(index) {
        return function () {
            c.setState({ added: true });
            c.props.addVideoToServerPlaylist(index);
        };
    }

    return c;
}

GridItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    addVideoToServerPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {addVideoToServerPlaylist})(GridItem);