import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './PlaylistItems.css';
import Reorder from 'material-ui/svg-icons/action/reorder';
import { makeProps } from '../utils';

import {
  playlistItems,
  playlistItemsIndex
} from '../selectors';

import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';

import {
  goToVideo,
  resetClock,
  changePlayState,
} from '../actions';

const DragHandle = SortableHandle(() => <Reorder className='reorder'/>);

let SortableItem = SortableElement((props) => {
  const c = new React.Component(props);

  c.shouldComponentUpdate = function (newProps) {
    const { currentVideo, index } = c.props.value;
    const { currentVideo: newCurrent, index: newIndex } = newProps.value;
    return currentVideo !== newCurrent || index !== newIndex;
  };

  c.render = function () {
    const {item, currentVideo} = c.props.value;
    return (
      <ListItem
        key={item.get('videoId')}
        style={currentVideo ? { backgroundColor: 'rgba(0,0,0, 0.2)' } : {}}
        onClick={setVideoIndex}
        leftAvatar={<Avatar src={item.get('thumbnail')} />}
        rightIcon={<DragHandle />}
      >
        {item.get('title')}
      </ListItem>
    );
  };

  function setVideoIndex() {
    const { value: {index}, changePlayState, resetClock, goToVideo } = c.props;

    if (index === 0) {
      changePlayState(false);
      resetClock();
    }

    goToVideo(index);
  }

  return c;
});

SortableItem = connect(function(){ return {}; }, {changePlayState, resetClock, goToVideo})(SortableItem);

const SortableList = SortableContainer(({
  playlistItems,
  playlistItemsIndex
}) => {
  return (
    <List id='playlistItems'>
      {playlistItems.map(function (item, index) {
        const currentVideo = playlistItemsIndex === index;
        return(
          <SortableItem
            value={{item, index, currentVideo}}
            index={index}
            key={`item-${item.get('videoId')}`}
          />
        );
      })}
    </List>
  );
});

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
        />
      </Paper>
    );
  };

  return c;
}

PlaylistItems.propTypes = {
  playlistItems: PropTypes.object.isRequired,
  playlistItemsIndex: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired
};

const mapStateToProps = makeProps({playlistItems, playlistItemsIndex});

export default connect(mapStateToProps)(PlaylistItems);
