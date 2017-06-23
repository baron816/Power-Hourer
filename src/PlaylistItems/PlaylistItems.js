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

function PlaylistItems(props) {
  const c = new React.Component(props);

  const DragHandle = SortableHandle(() => <Reorder className='reorder'/>);

  const SortableItem = SortableElement(({value}) => {
    const {setVideoIndex, playlistItemsIndex} = c.props;
    const {item, index} = value;
    return (
      <ListItem key={item.get('videoId')}
        style={playlistItemsIndex === index ? { backgroundColor: 'rgba(0,0,0, 0.2)' } : {}}
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
    const {playlistItems} = c.props;
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


  c.render = function () {
    const {moveItem} = c.props;
    return (
      <Paper zDepth={3} id='playlistPaper'>
        <SortableList useDragHandle={true} onSortEnd={moveItem} />
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
