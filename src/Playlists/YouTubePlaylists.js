import React from 'react';
import PropTypes from 'prop-types';
import { makeProps } from '../utils';

import { connect } from 'react-redux';
import {
  youtubePlaylists
} from '../selectors';
import Playlists from './Playlists';
import { fetchYoutubePlaylistItems } from '../actions';

function YouTubePlaylists({youtubePlaylists, fetchYoutubePlaylistItems}) {
  return (
    <Playlists
      playlists={youtubePlaylists}
      fetchPlaylistItems={fetchYoutubePlaylistItems}
      name='YouTube'
      playlistName='youtubePlaylists'
    />
  );
}

YouTubePlaylists.propTypes = {
  youtubePlaylists: PropTypes.object.isRequired,
  fetchYoutubePlaylistItems: PropTypes.func.isRequired
};

const mapStateToProps = makeProps({youtubePlaylists});

export default connect(mapStateToProps, {fetchYoutubePlaylistItems})(YouTubePlaylists);
