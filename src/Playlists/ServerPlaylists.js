import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeProps } from '../utils';

import {
  serverPlaylists
} from '../selectors';
import Playlists from './Playlists';

import { fetchServerPlaylistItems } from '../actions';

function ServerPlaylists({serverPlaylists, fetchServerPlaylistItems}) {
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

ServerPlaylists.propTypes = {
  serverPlaylists: PropTypes.object.isRequired,
  fetchServerPlaylistItems: PropTypes.func.isRequired
};

const mapStateToProps = makeProps({serverPlaylists});

export default connect(mapStateToProps, {fetchServerPlaylistItems})(ServerPlaylists);
