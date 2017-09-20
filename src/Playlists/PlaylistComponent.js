import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

import './Playlists.css';

export default function PlaylistComponent(props) {
  if (props.playlists.size) {
    return (
      <Paper zDepth={3} className="playlists" style={props.style}>
      <List>
      <Subheader inset={true}>{props.name} Playlists</Subheader>
      {props.playlists.map(function (list, index) {
        const id = list.get('_id');
        const title = list.get('title');
        return(
          <ListItem
          key={`${name}-${id}`}
          onClick={props.getPlaylist(id, index)}
          leftAvatar={ <Avatar src={list.get('thumbnail')} /> }>
          {title}
          </ListItem>
        );
      })}
      <LastItem fetchNext={props.fetchNext} />
      </List>
      </Paper>
    );
  } else {
    return <span />;
  }
}

function LastItem(props) {
  return props.fetchNext ?
      <ListItem
        key={'fetchNext'}
        onClick={props.fetchNext}
      >
        Next
      </ListItem>
  : <span/>;
}

PlaylistComponent.propTypes = {
  playlists: PropTypes.object.isRequired,
  style: PropTypes.object,
  name: PropTypes.string.isRequired,
  fetchNext: PropTypes.func
};
