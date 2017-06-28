import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import './PlaylistItems.css';
import Reorder from 'material-ui/svg-icons/action/reorder';
import { makeProps, dispatchAll } from '../utils';

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

const SortableItem = SortableElement((props) => {
  const c = new React.Component(props);

  c.shouldComponentUpdate = function (newProps) {
    const { currentVideo, index } = c.props.value;
    const { currentVideo: newCurrent, index: newIndex } = newProps.value;
    return currentVideo !== newCurrent || index !== newIndex;
  };

  c.render = function () {
    const {item, index, setVideoIndex, currentVideo} = c.props.value;
    return (
      <ListItem
      key={item.get('videoId')}
      style={currentVideo ? { backgroundColor: 'rgba(0,0,0, 0.2)' } : {}}
      onClick={setVideoIndex(index)}
      leftAvatar={<Avatar src={item.get('thumbnail')} />}
      rightIcon={<DragHandle />}
      >
      {item.get('title')}
      </ListItem>
    );
  };

  return c;
});

const SortableList = SortableContainer(({
  playlistItems,
  setVideoIndex,
  playlistItemsIndex
}) => {
  return (
    <List id='playlistItems'>
    {playlistItems.map(function (item, index) {
      const currentVideo = playlistItemsIndex === index;
      return(
        <SortableItem
        value={{item, index, setVideoIndex, currentVideo}}
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
      setVideoIndex,
      playlistItemsIndex
    } = c.props;
    return (
      <Paper zDepth={3} id='playlistPaper'>
        <SortableList
          useDragHandle={true}
          onSortEnd={moveItem}
          helperClass='sortableHelper'
          playlistItems={playlistItems}
          setVideoIndex={setVideoIndex}
          playlistItemsIndex={playlistItemsIndex}
        />
      </Paper>
    );
  };

  return c;
}

const mapStateToProps = makeProps({playlistItems, playlistItemsIndex});

function mapDispatchToProps(dispatch) {
  return {
    setVideoIndex: (index) => dispatchAll(dispatch, index === 0 && [changePlayState(false), resetClock], goToVideo(index))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems);
