import React from 'react';
import enhancedConnect from '../enhancedConnect';

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

const mapStateToProps = ['serverPlaylists'];
const mapDispatchToProps = ['fetchServerPlaylistItems'];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(ServerPlaylists);
