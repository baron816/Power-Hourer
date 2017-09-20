import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchVideosComponent from './SearchVideosComponent';

import { makePropsFromActions, makePropsFromSelectors } from '../../utils';

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

const mapStateToProps = makePropsFromSelectors(['searchResults', 'nextPageToken']);
const mapDispatchToProps = makePropsFromActions(['searchVideos', 'addVideoToServerPlaylist']);

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideos);
