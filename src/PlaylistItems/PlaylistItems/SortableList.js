import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'material-ui/List';
import {
  SortableContainer,
} from 'react-sortable-hoc';

import SortableItem from './SortableItem';

const SortableList = SortableContainer(function(props) {
  return (
    <List id='playlistItems'>
      {props.playlistItems.map(function (item, index) {
        const currentVideo = props.playlistItemsIndex === index;
        return(
          <SortableItem
            value={{item, index, currentVideo}}
            key={`item-${item.get('videoId')}`}
            index={index}
            setVideoIndex={props.setVideoIndex}
          />
        );
      })}
    </List>
  );
});

SortableList.propTypes = {
  playlistItems: PropTypes.object.isRequired,
  playlistItemsIndex: PropTypes.number.isRequired
};

export default SortableList;
