import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {GridList} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import GridItem from './GridItem';
import './SearchVideos.css';

import { makePropsFromActions, makePropsFromSelectors } from '../utils';

function SearchVideos(props) {
  const c = new React.Component(props);

  c.state = {
    searchTerm: ''
  };

  c.render = function () {
    const { searchResults, nextPageToken } = c.props;
    return (
      <div id='searchVideos'>
        <TextField
          floatingLabelText='Search YouTube Videos'
          onChange={handleSearch}
        />

        <GridList
          cellHeight={180}
        >
        {searchResults.map((item, index) => (
          <GridItem
            item={item}
            index={index}
            key={item.get('videoId')}
          />
        ))}
        </GridList>
        <br/>
        {nextPageToken &&
          <RaisedButton
            primary={true}
            label='Next'
            onClick={handleNext}
          />
        }
      </div>
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
  searchResults: PropTypes.array.isRequired,
  nextPageToken: PropTypes.string,
  searchVideos: PropTypes.func.isRequired
};

const mapStateToProps = makePropsFromSelectors(['searchResults', 'nextPageToken']);
const mapDispatchToProps = makePropsFromActions(['searchVideos']);

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideos);
