import React from 'react';
import { connect } from 'react-redux';
import { makeProps } from '../utils';

import {
  youtubePlaylists
} from '../selectors';
import Playlists from './Playlists';
import { fetchYoutubePlaylistItems } from '../actions';

function YouTubePlaylists({youtubePlaylists}) {
  return (
    <Playlists
      playlists={youtubePlaylists}
      fetchPlaylistItems={fetchYoutubePlaylistItems}
      name='YouTube'
      playlistName='youtubePlaylists'
    />
  );
}

const mapStateToProps = makeProps({youtubePlaylists});

export default connect(mapStateToProps)(YouTubePlaylists);
