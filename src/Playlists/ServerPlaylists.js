import React from 'react';
import { connect } from 'react-redux';
import { makePropsFromActions, makePropsFromSelectors } from '../utils';

import Playlists from './Playlists';

function ServerPlaylists(props) {
  return (
    <Playlists
      playlists={props.serverPlaylists}
      name='Saved'
      playlistName='serverPlaylists'
      style={{marginRight: '5px', marginLeft: '5px'}}
      fetchPlaylistItems={props.fetchServerPlaylistItems}
    />
  );
}

const mapStateToProps = makePropsFromSelectors(['serverPlaylists']);
const mapDispatchToProps = makePropsFromActions(['fetchServerPlaylistItems']);

export default connect(mapStateToProps, mapDispatchToProps)(ServerPlaylists);
