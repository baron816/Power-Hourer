import React from 'react';
import { connect } from 'react-redux';

import { fetchPlaylistItems, goToVideo, changePlayState, resetClock } from './actions';

function Playlists({playlists, getPlaylists}) {
  return (
    <div className="Playlists">
      <ul>
        {playlists.map(function (list) {
          return(
            <li key={list.id} onClick={getPlaylists(list.id)}>{list.snippet.title}</li>
          );
        })}
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    playlists: state.get('playlists')
  };
}

function mapDispatchToProps(dispatch) {
  function getPlaylists(listId) {
    return function () {
      dispatch(fetchPlaylistItems(listId));
      dispatch(goToVideo(0));
      dispatch(changePlayState(false));
      dispatch(resetClock());
    };
  }

  return {
    getPlaylists
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
