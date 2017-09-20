import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { makePropsFromSelectors, makePropsFromActions } from '../../utils';

import '../PlaylistItems.css';

import SortableList from './SortableList';

function PlaylistItems(props) {
  const c = new React.Component(props);

  c.render = function () {
    const {
      moveItem,
      playlistItems,
      playlistItemsIndex
    } = c.props;
    return (
      <Paper zDepth={3} id='playlistPaper'>
        <SortableList
          useDragHandle={true}
          onSortEnd={moveItem}
          helperClass='sortableHelper'
          playlistItems={playlistItems}
          playlistItemsIndex={playlistItemsIndex}
          setVideoIndex={setVideoIndex}
        />
      </Paper>
    );
  };

  function setVideoIndex(index) {
    return function() {
      if (index === 0) {
        c.props.changePlayState(false);
        c.props.resetClock();
      }

      c.props.goToVideo(index);
    };
  }

  return c;
}

PlaylistItems.propTypes = {
  moveItem: PropTypes.func.isRequired
};

const mapStateToProps = makePropsFromSelectors(['playlistItems', 'playlistItemsIndex']);
const mapDispatchToProps = makePropsFromActions([
  'changePlayState',
  'resetClock',
  'goToVideo'
]);

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems);
