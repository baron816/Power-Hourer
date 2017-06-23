import React from 'react';
import { connect } from 'react-redux';
import { makeProps } from '../utils';

import {
  serverPlaylists
} from '../selectors';
import Playlists from './Playlists';

import { fetchServerPlaylistItems } from '../actions';

function ServerPlaylists({serverPlaylists}) {
  return (
    <Playlists
      playlists={serverPlaylists}
      name='Saved'
      playlistName='serverPlaylists'
      style={{marginRight: '5px', marginLeft: '5px'}}
      fetchPlaylistItems={fetchServerPlaylistItems}
    />
  );
}

const mapStateToProps = makeProps({serverPlaylists});

export default connect(mapStateToProps)(ServerPlaylists);
