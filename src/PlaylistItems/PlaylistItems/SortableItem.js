import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Reorder from 'material-ui/svg-icons/action/reorder';

import {
  SortableHandle,
  SortableElement
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <Reorder className='reorder'/>);

let SortableItem = SortableElement((props) => {
  const c = new React.Component(props);

  c.shouldComponentUpdate = function (newProps) {
    const { currentVideo, index } = c.props.value;
    const { currentVideo: newCurrent, index: newIndex } = newProps.value;
    return currentVideo !== newCurrent || index !== newIndex;
  };

  c.render = function () {
    const { setVideoIndex, value: {item, currentVideo, index}} = c.props;
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

SortableItem.propTypes= {
  value: PropTypes.object.isRequired,
  setVideoIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default SortableItem;
