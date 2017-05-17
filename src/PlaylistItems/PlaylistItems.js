import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './PlaylistItems.css';
import Reorder from 'material-ui/svg-icons/action/reorder';

import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';

import {
  goToVideo,
  resetClock,
  changePlayState,
  moveItem
} from '../actions';

function PlaylistItems({setVideoIndex, playlistIndex, playlistItems, movePlItem}) {

  const DragHandle = SortableHandle(() => <Reorder className='reorder'/>);

  const SortableItem = SortableElement(({value}) => {
    const {item, index} = value;
    return (
      <ListItem key={item.get('videoId')}
        style={playlistIndex === index ? { backgroundColor: 'rgba(0,0,0, 0.2)' } : {}}
        data-index={index}
        onClick={setVideoIndex(index)}
        leftAvatar={<Avatar src={item.get('thumbnail')} />}
        rightIcon={<DragHandle />}
      >
        {item.get('title')}
      </ListItem>
    );
  });

  const SortableList = SortableContainer(() => {
    return (
      <List id='playlistItems'>
      {playlistItems.map(function (item, index) {
        return(
          <SortableItem value={{item, index}} index={index} key={`item-${item.get('videoId')}`} />
        );
      })}
      </List>
    );
  });

  return (
    <Paper zDepth={3} id='playlistPaper'>
      <SortableList useDragHandle={true} onSortEnd={movePlItem} />
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    playlistItems: state.getIn(['playlistItems', 'playlistItems']),
    playlistIndex: state.getIn(['playlistItems', 'playlistItemsIndex'])
  };
}

function mapDispatchToProps(dispatch) {
  function setVideoIndex(index) {
    return function () {
      if (index === 0) {
        dispatch(changePlayState(false));
        dispatch(resetClock());
      }
      dispatch(goToVideo(index));
    };
  }

  function movePlItem(oldIndex, newIndex) {
    dispatch(moveItem(oldIndex, newIndex));
  }

  return {
    setVideoIndex,
    movePlItem
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems);
