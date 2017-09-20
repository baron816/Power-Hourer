import React from 'react';
import { makePropsFromActions, makePropsFromSelectors } from '../utils';

import { connect } from 'react-redux';

import Playlists from './Playlists';

function YouTubePlaylists(props) {
  return (
    <Playlists
      playlists={props.youtubePlaylists}
      fetchPlaylistItems={props.fetchYoutubePlaylistItems}
      name='YouTube'
      playlistName='youtubePlaylists'
    />
  );
}

const mapStateToProps = makePropsFromSelectors(['youtubePlaylists']);
const mapDispatchToProps = makePropsFromActions(['fetchYoutubePlaylistItems']);

export default connect(mapStateToProps, mapDispatchToProps)(YouTubePlaylists);
