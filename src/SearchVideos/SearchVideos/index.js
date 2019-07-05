import React from 'react';
import PropTypes from 'prop-types';
import enhancedConnect from '../../enhancedConnect';
import SearchVideosComponent from './SearchVideosComponent';

function SearchVideos(props) {
  const c = new React.Component(props);

  c.state = {
    searchTerm: ''
  };

  c.render = function () {
    return (
        <SearchVideosComponent
          {...c.props}
          handleSearch={handleSearch}
          handleNext={handleNext}
        />
    );
  };

  function handleSearch(event) {
    const term = event.target.value;
    c.setState({searchTerm: term});
    c.props.searchVideos(term);
  }

  function handleNext() {
    const term = c.state.searchTerm;
    c.props.searchVideos(term);
  }

  return c;
}

SearchVideos.propTypes = {
  searchVideos: PropTypes.func.isRequired
};

const mapStateToProps = ['searchResults', 'nextPageToken'];
const mapDispatchToProps = ['searchVideos', 'addVideoToServerPlaylist'];

export default enhancedConnect(mapStateToProps, mapDispatchToProps)(SearchVideos);
